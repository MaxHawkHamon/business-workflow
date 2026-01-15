import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import {
  Play,
  User,
  Cog,
  GitBranch,
  Shield,
  Database,
  Share2,
  Mail,
  CheckCircle,
  XCircle,
  RefreshCw,
  Calendar,
  Archive,
  Pencil,
  FileText,
  ClipboardCheck,
  UserCheck,
  AlertTriangle,
  Users,
  TrendingUp,
  DollarSign,
  CheckSquare,
  Tag,
  Save,
  Edit,
} from 'lucide-react';

const iconMap = {
  play: Play,
  user: User,
  cog: Cog,
  gitBranch: GitBranch,
  shield: Shield,
  database: Database,
  share2: Share2,
  mail: Mail,
  checkCircle: CheckCircle,
  xCircle: XCircle,
  refreshCw: RefreshCw,
  calendar: Calendar,
  archive: Archive,
  pencil: Pencil,
  fileText: FileText,
  clipboardCheck: ClipboardCheck,
  userCheck: UserCheck,
  alertTriangle: AlertTriangle,
  users: Users,
  trendingUp: TrendingUp,
  dollarSign: DollarSign,
  checkSquare: CheckSquare,
  tag: Tag,
  save: Save,
  edit: Edit,
};

// Manual Task Node (Person icon - human-driven process)
export const ManualTaskNode = memo(({ data, selected }) => {
  const Icon = iconMap[data.icon] || User;

  return (
    <div
      className={`
        px-4 py-3 rounded-lg border-2 bg-white min-w-[140px]
        ${selected ? 'border-blue-500 shadow-lg' : 'border-blue-300'}
        hover:border-blue-400 transition-all cursor-pointer
      `}
    >
      <Handle type="target" position={Position.Left} className="w-3 h-3 !bg-blue-400" />
      <div className="flex items-center gap-2">
        <div className="p-1.5 bg-blue-100 rounded">
          <Icon size={18} className="text-blue-600" />
        </div>
        <div className="text-sm font-medium text-gray-700 leading-tight">{data.label}</div>
      </div>
      <div className="mt-1 flex items-center gap-1">
        <User size={12} className="text-blue-400" />
        <span className="text-xs text-blue-400">Manual</span>
      </div>
      <Handle type="source" position={Position.Right} className="w-3 h-3 !bg-blue-400" />
    </div>
  );
});

// Automated Task Node (Cog icon - system-driven process)
export const AutomatedTaskNode = memo(({ data, selected }) => {
  const Icon = iconMap[data.icon] || Cog;

  return (
    <div
      className={`
        px-4 py-3 rounded-lg border-2 bg-white min-w-[140px]
        ${selected ? 'border-emerald-500 shadow-lg' : 'border-emerald-300'}
        hover:border-emerald-400 transition-all cursor-pointer
      `}
    >
      <Handle type="target" position={Position.Left} className="w-3 h-3 !bg-emerald-400" />
      <div className="flex items-center gap-2">
        <div className="p-1.5 bg-emerald-100 rounded">
          <Icon size={18} className="text-emerald-600" />
        </div>
        <div className="text-sm font-medium text-gray-700 leading-tight">{data.label}</div>
      </div>
      <div className="mt-1 flex items-center gap-1">
        <Cog size={12} className="text-emerald-400" />
        <span className="text-xs text-emerald-400">Automated</span>
      </div>
      <Handle type="source" position={Position.Right} className="w-3 h-3 !bg-emerald-400" />
    </div>
  );
});

// Gateway Node (Diamond shape - decision point)
export const GatewayNode = memo(({ data, selected }) => {
  const Icon = iconMap[data.icon] || GitBranch;

  return (
    <div className="relative">
      <Handle type="target" position={Position.Left} className="w-3 h-3 !bg-amber-400 !left-[-6px]" />
      <div
        className={`
          w-16 h-16 rotate-45 border-2 bg-white flex items-center justify-center
          ${selected ? 'border-amber-500 shadow-lg' : 'border-amber-300'}
          hover:border-amber-400 transition-all cursor-pointer
        `}
      >
        <div className="-rotate-45 flex flex-col items-center">
          <Icon size={20} className="text-amber-600" />
        </div>
      </div>
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
        <span className="text-xs font-medium text-gray-600">{data.label}</span>
      </div>
      <Handle type="source" position={Position.Right} className="w-3 h-3 !bg-amber-400 !right-[-6px]" />
      <Handle type="source" position={Position.Top} id="top" className="w-3 h-3 !bg-amber-400 !top-[-6px]" />
      <Handle type="source" position={Position.Bottom} id="bottom" className="w-3 h-3 !bg-amber-400 !bottom-[-6px]" />
    </div>
  );
});

// Event Node (Circle - start/end/intermediate events)
export const EventNode = memo(({ data, selected }) => {
  const Icon = iconMap[data.icon] || Play;
  const isStart = data.icon === 'play';
  const isEnd = data.icon === 'checkCircle' || data.icon === 'xCircle';

  let borderColor = 'border-gray-300';
  let bgColor = 'bg-gray-100';
  let iconColor = 'text-gray-600';

  if (isStart) {
    borderColor = selected ? 'border-green-500' : 'border-green-300';
    bgColor = 'bg-green-50';
    iconColor = 'text-green-600';
  } else if (data.icon === 'xCircle') {
    borderColor = selected ? 'border-red-500' : 'border-red-300';
    bgColor = 'bg-red-50';
    iconColor = 'text-red-600';
  } else if (isEnd) {
    borderColor = selected ? 'border-purple-500' : 'border-purple-300';
    bgColor = 'bg-purple-50';
    iconColor = 'text-purple-600';
  }

  return (
    <div className="relative">
      {!isStart && (
        <Handle type="target" position={Position.Left} className="w-3 h-3 !bg-gray-400" />
      )}
      <div
        className={`
          w-14 h-14 rounded-full border-2 ${borderColor} ${bgColor}
          flex items-center justify-center
          ${selected ? 'shadow-lg' : ''}
          hover:shadow-md transition-all cursor-pointer
        `}
      >
        <Icon size={24} className={iconColor} />
      </div>
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
        <span className="text-xs font-medium text-gray-600">{data.label}</span>
      </div>
      {!isEnd && (
        <Handle type="source" position={Position.Right} className="w-3 h-3 !bg-gray-400" />
      )}
      {/* Extra handles for maintenance loop-back */}
      <Handle type="target" position={Position.Top} id="top" className="w-3 h-3 !bg-gray-400 !top-[-6px]" />
      <Handle type="source" position={Position.Bottom} id="bottom" className="w-3 h-3 !bg-gray-400 !bottom-[-6px]" />
    </div>
  );
});

export const nodeTypes = {
  manual: ManualTaskNode,
  automated: AutomatedTaskNode,
  gateway: GatewayNode,
  event: EventNode,
};

ManualTaskNode.displayName = 'ManualTaskNode';
AutomatedTaskNode.displayName = 'AutomatedTaskNode';
GatewayNode.displayName = 'GatewayNode';
EventNode.displayName = 'EventNode';
