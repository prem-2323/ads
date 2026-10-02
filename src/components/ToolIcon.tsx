import React from 'react';
import {
  GraduationCap,
  Percent,
  CalendarCheck2,
  Calendar,
  CalendarDays,
  Code,
  FileText,
  FileCheck,
  Layers,
  Calculator,
  CheckSquare,
  ArrowLeftRight,
  Award,
  ClipboardList,
  Timer,
  Clock,
  Binary,
  Link2,
  Fingerprint,
  Hash,
  QrCode,
  Ruler,
  KeyRound,
  Zap,
  Wrench,
  LucideProps
} from 'lucide-react';
import { ToolIconName, CategoryIconName } from '../data/tools';

export type IconName = ToolIconName | CategoryIconName;

interface ToolIconProps extends LucideProps {
  name: IconName;
}

export const ToolIcon: React.FC<ToolIconProps> = ({ name, ...props }) => {
  switch (name) {
    // Category icons
    case 'Layers':
      return <Layers {...props} />;
    case 'GraduationCap':
      return <GraduationCap {...props} />;
    case 'Code':
      return <Code {...props} />;
    case 'Clock':
      return <Clock {...props} />;
    case 'Calculator':
      return <Calculator {...props} />;
    case 'CheckSquare':
      return <CheckSquare {...props} />;
    case 'ArrowLeftRight':
      return <ArrowLeftRight {...props} />;
    case 'Zap':
      return <Zap {...props} />;
    case 'Wrench':
      return <Wrench {...props} />;

    // Tool icons
    case 'Percent':
      return <Percent {...props} />;
    case 'CalendarCheck2':
      return <CalendarCheck2 {...props} />;
    case 'Calendar':
      return <Calendar {...props} />;
    case 'CalendarDays':
      return <CalendarDays {...props} />;
    case 'FileText':
      return <FileText {...props} />;
    case 'FileCheck':
      return <FileCheck {...props} />;
    case 'Award':
      return <Award {...props} />;
    case 'ClipboardList':
      return <ClipboardList {...props} />;
    case 'Timer':
      return <Timer {...props} />;
    case 'Binary':
      return <Binary {...props} />;
    case 'Link2':
      return <Link2 {...props} />;
    case 'Fingerprint':
      return <Fingerprint {...props} />;
    case 'Hash':
      return <Hash {...props} />;
    case 'QrCode':
      return <QrCode {...props} />;
    case 'Ruler':
      return <Ruler {...props} />;
    case 'KeyRound':
      return <KeyRound {...props} />;

    default:
      return <FileText {...props} />;
  }
};
