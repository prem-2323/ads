import React, { useState, useMemo } from 'react';
import { Ruler, ArrowLeftRight, RotateCcw, Copy, Check } from 'lucide-react';
import { ToolLayout } from '../components/ToolLayout';
import { getToolBySlug } from '../data/tools';

type UnitCategory = 'Length' | 'Weight' | 'Temperature' | 'Area' | 'Volume' | 'Time' | 'Data';

interface UnitDef {
  id: string;
  name: string;
  symbol: string;
  toBase?: (val: number) => number;
  fromBase?: (baseVal: number) => number;
  rate?: number; // Relative to base unit: 1 unit = rate * baseUnit
}

interface CategoryConfig {
  name: UnitCategory;
  baseUnit: string;
  units: UnitDef[];
}

const CONVERTER_DATA: Record<UnitCategory, CategoryConfig> = {
  Length: {
    name: 'Length',
    baseUnit: 'm',
    units: [
      { id: 'm', name: 'Meter', symbol: 'm', rate: 1 },
      { id: 'km', name: 'Kilometer', symbol: 'km', rate: 1000 },
      { id: 'cm', name: 'Centimeter', symbol: 'cm', rate: 0.01 },
      { id: 'mm', name: 'Millimeter', symbol: 'mm', rate: 0.001 },
      { id: 'mi', name: 'Mile', symbol: 'mi', rate: 1609.344 },
      { id: 'yd', name: 'Yard', symbol: 'yd', rate: 0.9144 },
      { id: 'ft', name: 'Foot', symbol: 'ft', rate: 0.3048 },
      { id: 'in', name: 'Inch', symbol: 'in', rate: 0.0254 },
      { id: 'nm', name: 'Nautical Mile', symbol: 'NM', rate: 1852 },
    ],
  },
  Weight: {
    name: 'Weight',
    baseUnit: 'kg',
    units: [
      { id: 'kg', name: 'Kilogram', symbol: 'kg', rate: 1 },
      { id: 'g', name: 'Gram', symbol: 'g', rate: 0.001 },
      { id: 'mg', name: 'Milligram', symbol: 'mg', rate: 0.000001 },
      { id: 't', name: 'Metric Ton', symbol: 't', rate: 1000 },
      { id: 'lb', name: 'Pound', symbol: 'lb', rate: 0.45359237 },
      { id: 'oz', name: 'Ounce', symbol: 'oz', rate: 0.028349523125 },
    ],
  },
  Temperature: {
    name: 'Temperature',
    baseUnit: 'c',
    units: [
      {
        id: 'c',
        name: 'Celsius',
        symbol: '°C',
        toBase: (c: number) => c,
        fromBase: (c: number) => c,
      },
      {
        id: 'f',
        name: 'Fahrenheit',
        symbol: '°F',
        toBase: (f: number) => ((f - 32) * 5) / 9,
        fromBase: (c: number) => (c * 9) / 5 + 32,
      },
      {
        id: 'k',
        name: 'Kelvin',
        symbol: 'K',
        toBase: (k: number) => k - 273.15,
        fromBase: (c: number) => c + 273.15,
      },
    ],
  },
  Area: {
    name: 'Area',
    baseUnit: 'm2',
    units: [
      { id: 'm2', name: 'Square Meter', symbol: 'm²', rate: 1 },
      { id: 'km2', name: 'Square Kilometer', symbol: 'km²', rate: 1000000 },
      { id: 'ha', name: 'Hectare', symbol: 'ha', rate: 10000 },
      { id: 'ac', name: 'Acre', symbol: 'ac', rate: 4046.8564224 },
      { id: 'sqft', name: 'Square Foot', symbol: 'sq ft', rate: 0.09290304 },
      { id: 'sqyd', name: 'Square Yard', symbol: 'sq yd', rate: 0.83612736 },
      { id: 'sqmi', name: 'Square Mile', symbol: 'sq mi', rate: 2589988.110336 },
    ],
  },
  Volume: {
    name: 'Volume',
    baseUnit: 'l',
    units: [
      { id: 'l', name: 'Liter', symbol: 'L', rate: 1 },
      { id: 'ml', name: 'Milliliter', symbol: 'mL', rate: 0.001 },
      { id: 'm3', name: 'Cubic Meter', symbol: 'm³', rate: 1000 },
      { id: 'gal', name: 'US Gallon', symbol: 'gal', rate: 3.785411784 },
      { id: 'qt', name: 'US Quart', symbol: 'qt', rate: 0.946352946 },
      { id: 'pt', name: 'US Pint', symbol: 'pt', rate: 0.473176473 },
      { id: 'floz', name: 'US Fluid Ounce', symbol: 'fl oz', rate: 0.0295735295625 },
      { id: 'cup', name: 'US Cup', symbol: 'cup', rate: 0.2365882365 },
    ],
  },
  Time: {
    name: 'Time',
    baseUnit: 's',
    units: [
      { id: 's', name: 'Second', symbol: 's', rate: 1 },
      { id: 'ms', name: 'Millisecond', symbol: 'ms', rate: 0.001 },
      { id: 'min', name: 'Minute', symbol: 'min', rate: 60 },
      { id: 'h', name: 'Hour', symbol: 'h', rate: 3600 },
      { id: 'd', name: 'Day', symbol: 'd', rate: 86400 },
      { id: 'wk', name: 'Week', symbol: 'wk', rate: 604800 },
      { id: 'yr', name: 'Year (365d)', symbol: 'yr', rate: 31536000 },
    ],
  },
  Data: {
    name: 'Data',
    baseUnit: 'b',
    units: [
      { id: 'b', name: 'Byte', symbol: 'B', rate: 1 },
      { id: 'kb', name: 'Kilobyte (decimal)', symbol: 'KB', rate: 1000 },
      { id: 'mb', name: 'Megabyte (decimal)', symbol: 'MB', rate: 1000000 },
      { id: 'gb', name: 'Gigabyte (decimal)', symbol: 'GB', rate: 1000000000 },
      { id: 'tb', name: 'Terabyte (decimal)', symbol: 'TB', rate: 1000000000000 },
      { id: 'kib', name: 'Kibibyte (binary)', symbol: 'KiB', rate: 1024 },
      { id: 'mib', name: 'Mebibyte (binary)', symbol: 'MiB', rate: 1048576 },
      { id: 'gib', name: 'Gibibyte (binary)', symbol: 'GiB', rate: 1073741824 },
      { id: 'tib', name: 'Tebibyte (binary)', symbol: 'TiB', rate: 1099511627776 },
    ],
  },
};

const CATEGORY_TABS: UnitCategory[] = ['Length', 'Weight', 'Temperature', 'Area', 'Volume', 'Time', 'Data'];

export const UnitConverter: React.FC = () => {
  const tool = getToolBySlug('unit-converter')!;
  const [category, setCategory] = useState<UnitCategory>('Length');
  const [inputValue, setInputValue] = useState<string>('10');
  const [fromUnitId, setFromUnitId] = useState<string>('km');
  const [toUnitId, setToUnitId] = useState<string>('mi');
  const [copied, setCopied] = useState<boolean>(false);

  const activeCategory = CONVERTER_DATA[category];

  const handleCategoryChange = (newCat: UnitCategory) => {
    setCategory(newCat);
    const catData = CONVERTER_DATA[newCat];
    setFromUnitId(catData.units[0].id);
    setToUnitId(catData.units[1] ? catData.units[1].id : catData.units[0].id);
  };

  const handleSwap = () => {
    setFromUnitId(toUnitId);
    setToUnitId(fromUnitId);
  };

  const fromUnit = activeCategory.units.find(u => u.id === fromUnitId) || activeCategory.units[0];
  const toUnit = activeCategory.units.find(u => u.id === toUnitId) || activeCategory.units[1] || activeCategory.units[0];

  // Perform calculation
  const result = useMemo(() => {
    const val = parseFloat(inputValue);
    if (isNaN(val)) return null;

    if (category === 'Temperature') {
      if (!fromUnit.toBase || !toUnit.fromBase) return null;
      const baseCelsius = fromUnit.toBase(val);
      const converted = toUnit.fromBase(baseCelsius);
      return converted;
    }

    if (fromUnit.rate && toUnit.rate) {
      const baseVal = val * fromUnit.rate;
      const converted = baseVal / toUnit.rate;
      return converted;
    }

    return null;
  }, [category, inputValue, fromUnit, toUnit]);

  const formattedResult = useMemo(() => {
    if (result === null) return '—';
    if (Math.abs(result) >= 1e9 || (Math.abs(result) > 0 && Math.abs(result) < 1e-4)) {
      return result.toExponential(6);
    }
    // Up to 6 decimals, trim trailing zeros
    return parseFloat(result.toFixed(6)).toString();
  }, [result]);

  const handleCopy = async () => {
    if (formattedResult === '—') return;
    try {
      await navigator.clipboard.writeText(`${formattedResult} ${toUnit.symbol}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const handleReset = () => {
    setInputValue('1');
    const catData = CONVERTER_DATA[category];
    setFromUnitId(catData.units[0].id);
    setToUnitId(catData.units[1] ? catData.units[1].id : catData.units[0].id);
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-6">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-100 dark:border-slate-800 scrollbar-none">
          {CATEGORY_TABS.map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => handleCategoryChange(cat)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg shrink-0 transition-all ${
                category === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Main Converter Card */}
        <div className="p-6 rounded-2xl bg-slate-50/70 dark:bg-slate-950/40 border border-slate-200/80 dark:border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {category} Conversion
            </span>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-7 gap-4 items-center">
            {/* From Value & Unit */}
            <div className="md:col-span-3 space-y-2">
              <label htmlFor="unit-input-val" className="block text-xs font-medium text-slate-600 dark:text-slate-400">
                From
              </label>
              <input
                id="unit-input-val"
                type="number"
                step="any"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                placeholder="Enter value"
                className="w-full px-3.5 py-2.5 text-base font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <select
                value={fromUnitId}
                onChange={e => setFromUnitId(e.target.value)}
                className="w-full px-3 py-2 text-xs font-medium bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                {activeCategory.units.map(u => (
                  <option key={u.id} value={u.id}>
                    {u.name} ({u.symbol})
                  </option>
                ))}
              </select>
            </div>

            {/* Swap Button */}
            <div className="md:col-span-1 flex justify-center py-2 md:py-0">
              <button
                type="button"
                onClick={handleSwap}
                className="p-2.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-blue-600 hover:border-blue-300 dark:hover:border-blue-800 transition-colors shadow-xs"
                title="Swap units"
                aria-label="Swap units"
              >
                <ArrowLeftRight className="h-4 w-4" />
              </button>
            </div>

            {/* To Value & Unit */}
            <div className="md:col-span-3 space-y-2">
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400">
                To
              </label>
              <div className="w-full px-3.5 py-2.5 text-base font-semibold bg-white/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl text-blue-600 dark:text-blue-400 truncate flex items-center justify-between">
                <span>{formattedResult}</span>
                <span className="text-xs font-normal text-slate-400">{toUnit.symbol}</span>
              </div>
              <select
                value={toUnitId}
                onChange={e => setToUnitId(e.target.value)}
                className="w-full px-3 py-2 text-xs font-medium bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                {activeCategory.units.map(u => (
                  <option key={u.id} value={u.id}>
                    {u.name} ({u.symbol})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Result Highlight Card */}
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Conversion Equation:
              </div>
              <div className="text-sm font-semibold text-slate-900 dark:text-white mt-0.5">
                {inputValue || '0'} {fromUnit.symbol} = {formattedResult} {toUnit.symbol}
              </div>
            </div>
            <button
              type="button"
              onClick={handleCopy}
              disabled={formattedResult === '—'}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900 text-xs font-semibold transition-colors disabled:opacity-40 self-start sm:self-auto"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? 'Copied Result!' : 'Copy Result'}</span>
            </button>
          </div>
        </div>

        {/* Quick Reference Table for Active Category */}
        <div className="rounded-xl border border-slate-200/80 dark:border-slate-800 overflow-hidden">
          <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300">
            Quick Reference Values (1 {fromUnit.name})
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-slate-200 dark:bg-slate-800 text-xs">
            {activeCategory.units
              .filter(u => u.id !== fromUnit.id)
              .map(u => {
                let sampleConverted = 0;
                if (category === 'Temperature') {
                  const base = fromUnit.toBase ? fromUnit.toBase(1) : 1;
                  sampleConverted = u.fromBase ? u.fromBase(base) : base;
                } else if (fromUnit.rate && u.rate) {
                  sampleConverted = (1 * fromUnit.rate) / u.rate;
                }
                const sampleText =
                  Math.abs(sampleConverted) >= 1e6 || Math.abs(sampleConverted) < 1e-4
                    ? sampleConverted.toExponential(4)
                    : parseFloat(sampleConverted.toFixed(4)).toString();

                return (
                  <div key={u.id} className="p-3 bg-white dark:bg-slate-900">
                    <div className="text-slate-500 dark:text-slate-400 text-[11px] truncate">
                      {u.name}
                    </div>
                    <div className="font-semibold text-slate-900 dark:text-white mt-0.5 truncate">
                      {sampleText} {u.symbol}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};
