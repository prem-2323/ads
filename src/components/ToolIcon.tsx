import React from 'react';
import {
  GraduationCap,
  Percent,
  CalendarCheck2,
  Calendar,
  Code,
  FileText,
  Layers,
  Calculator,
  CheckSquare,
  ArrowLeftRight,
  LucideProps
} from 'lucide-react';
import { ToolItem, CategoryIconName } from '../data/tools';

export type IconName = ToolItem['iconName'] | CategoryIconName;

interface ToolIconProps extends LucideProps {
  name: IconName;
}

export const ToolIcon: React.FC<ToolIconProps> = ({ name, ...props }) => {
  switch (name) {
    case 'GraduationCap':
      return <GraduationCap {...props} />;
    case 'Percent':
      return <Percent {...props} />;
    case 'CalendarCheck2':
      return <CalendarCheck2 {...props} />;
    case 'Calendar':
      return <Calendar {...props} />;
    case 'Code':
      return <Code {...props} />;
    case 'FileText':
      return <FileText {...props} />;
    case 'Layers':
      return <Layers {...props} />;
    case 'Calculator':
      return <Calculator {...props} />;
    case 'CheckSquare':
      return <CheckSquare {...props} />;
    case 'ArrowLeftRight':
      return <ArrowLeftRight {...props} />;
    default:
      return <FileText {...props} />;
  }
};
