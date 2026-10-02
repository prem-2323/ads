/**
 * MasterTools Safe Client-Side Storage Utility
 * 
 * Provides safe, privacy-first localStorage helpers for Favorites and Recently Used Tools.
 * - Handles corrupted storage data, unavailable storage, private browsing restrictions, and quota limits gracefully.
 * - NEVER stores user inputs, calculation results, dates of birth, or personal information.
 */

const FAVORITES_KEY = 'mt_favorites';
const RECENT_TOOLS_KEY = 'mt_recent_tools';
const MAX_RECENT_TOOLS = 6;

/**
 * Safe getItem wrapper that handles storage errors and JSON parsing.
 */
export function safeStorageGet<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

/**
 * Safe setItem wrapper that handles quota and storage errors.
 */
export function safeStorageSet<T>(key: string, value: T): boolean {
  if (typeof window === 'undefined') return false;
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (err) {
    console.warn(`localStorage save error for key "${key}":`, err);
    return false;
  }
}

// ================= FAVORITES API =================

export function getFavorites(): string[] {
  return safeStorageGet<string[]>(FAVORITES_KEY, []);
}

export function isFavorite(toolSlug: string): boolean {
  const favorites = getFavorites();
  return favorites.includes(toolSlug);
}

export function toggleFavorite(toolSlug: string): boolean {
  const favorites = getFavorites();
  const exists = favorites.includes(toolSlug);
  let updated: string[];

  if (exists) {
    updated = favorites.filter(s => s !== toolSlug);
  } else {
    updated = [toolSlug, ...favorites];
  }

  safeStorageSet(FAVORITES_KEY, updated);
  return !exists;
}

// ================= RECENTLY USED TOOLS API =================

export function getRecentTools(): string[] {
  return safeStorageGet<string[]>(RECENT_TOOLS_KEY, []);
}

export function addRecentTool(toolSlug: string): void {
  if (!toolSlug) return;
  const recent = getRecentTools().filter(s => s !== toolSlug);
  const updated = [toolSlug, ...recent].slice(0, MAX_RECENT_TOOLS);
  safeStorageSet(RECENT_TOOLS_KEY, updated);
}
