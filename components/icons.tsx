import type { XIcon as LucideIcon } from 'lucide-react';
import {
  AlertTriangle,
  ArrowRight,
  ChevronLeft,
  Command,
  File,
  FileText,
  Image,
  Loader2,
  MoreVertical,
  Plus,
  Settings,
  Trash,
  User,
} from 'lucide-react';

export type Icon = typeof LucideIcon;

export const Icons = {
  logo: Command,
  spinner: Loader2,
  chevronLeft: ChevronLeft,
  trash: Trash,
  post: FileText,
  page: File,
  media: Image,
  settings: Settings,
  ellipsis: MoreVertical,
  add: Plus,
  warning: AlertTriangle,
  user: User,
  arrowRight: ArrowRight,
};
