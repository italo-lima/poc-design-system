import {
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  Check,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  X,
  Plus,
  Minus,
  Pencil,
  Trash2,
  Search,
  Download,
  Upload,
  RefreshCw,
  Settings,
  Star,
  Heart,
  Bell,
  Mail,
  Phone,
  User,
  Lock,
  Eye,
  EyeOff,
  Copy,
  Share2,
  ExternalLink,
  Filter,
  SlidersHorizontal,
  MoreHorizontal,
  MoreVertical,
  LogOut,
  LogIn,
  Home,
  Folder,
  File,
  Image,
  Link,
  Calendar,
  Clock,
  MapPin,
  Zap,
  ShieldCheck,
  Info,
  AlertTriangle,
  CircleAlert,
  CircleCheck,
  UserRound,
} from 'lucide-static'

/**
 * Tamanho-alvo dos ícones (px). O lucide-static entrega SVGs 24x24; aqui
 * normalizamos para 20x20 mantendo o viewBox 0 0 24 24 original.
 */
const ICON_SIZE = 20

/**
 * Normaliza um SVG string do lucide-static:
 * - ajusta width/height para `ICON_SIZE` (o source vem como 24);
 * - garante stroke em `currentColor` (o source já usa currentColor, mas
 *   reforçamos caso alguma versão futura mude o default).
 */
function normalize(svg: string): string {
  return svg
    .replace(/width="\d+(?:\.\d+)?"/, `width="${ICON_SIZE}"`)
    .replace(/height="\d+(?:\.\d+)?"/, `height="${ICON_SIZE}"`)
    .replace(/stroke="(?!currentColor)[^"]*"/, 'stroke="currentColor"')
}

/**
 * Mapa nome-kebab → SVG string (20x20, currentColor) pronto para `innerHTML`.
 * Uso em componentes Stencil:
 *   <span class="inline-flex shrink-0" innerHTML={getIcon('check')}></span>
 */
export const iconMap = {
  'arrow-right': normalize(ArrowRight),
  'arrow-left': normalize(ArrowLeft),
  'arrow-up': normalize(ArrowUp),
  'arrow-down': normalize(ArrowDown),
  check: normalize(Check),
  'chevron-right': normalize(ChevronRight),
  'chevron-left': normalize(ChevronLeft),
  'chevron-down': normalize(ChevronDown),
  'chevron-up': normalize(ChevronUp),
  x: normalize(X),
  plus: normalize(Plus),
  minus: normalize(Minus),
  pencil: normalize(Pencil),
  'trash-2': normalize(Trash2),
  search: normalize(Search),
  download: normalize(Download),
  upload: normalize(Upload),
  'refresh-cw': normalize(RefreshCw),
  settings: normalize(Settings),
  star: normalize(Star),
  heart: normalize(Heart),
  bell: normalize(Bell),
  mail: normalize(Mail),
  phone: normalize(Phone),
  user: normalize(User),
  lock: normalize(Lock),
  eye: normalize(Eye),
  'eye-off': normalize(EyeOff),
  copy: normalize(Copy),
  'share-2': normalize(Share2),
  'external-link': normalize(ExternalLink),
  filter: normalize(Filter),
  'sliders-horizontal': normalize(SlidersHorizontal),
  'more-horizontal': normalize(MoreHorizontal),
  'more-vertical': normalize(MoreVertical),
  'log-out': normalize(LogOut),
  'log-in': normalize(LogIn),
  home: normalize(Home),
  folder: normalize(Folder),
  file: normalize(File),
  image: normalize(Image),
  link: normalize(Link),
  calendar: normalize(Calendar),
  clock: normalize(Clock),
  'map-pin': normalize(MapPin),
  zap: normalize(Zap),
  'shield-check': normalize(ShieldCheck),
  info: normalize(Info),
  'alert-triangle': normalize(AlertTriangle),
  'circle-alert': normalize(CircleAlert),
  'circle-check': normalize(CircleCheck),
  'user-round': normalize(UserRound),
} as const

/** Nomes válidos de ícone (kebab-case), espelhando o old-reference (sem 'none'). */
export type IconName = keyof typeof iconMap

/** Lista de todos os nomes de ícone disponíveis. */
export const iconOptions: IconName[] = Object.keys(iconMap) as IconName[]

/**
 * Retorna o SVG string do ícone (20x20, currentColor) para uso via `innerHTML`.
 * Retorna string vazia se o nome não existir.
 */
export function getIcon(name: IconName): string {
  return iconMap[name] ?? ''
}
