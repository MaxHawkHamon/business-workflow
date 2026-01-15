import {
  User,
  Cog,
  Clock,
  FileText,
  CheckSquare,
  GitBranch,
  Play,
} from 'lucide-react';

const typeConfig = {
  manual: { label: 'Manual Task', color: 'blue', icon: User },
  automated: { label: 'Automated Task', color: 'emerald', icon: Cog },
  gateway: { label: 'Decision Gateway', color: 'amber', icon: GitBranch },
  event: { label: 'Event', color: 'purple', icon: Play },
};

export default function DetailCard({ node }) {
  if (!node) {
    return (
      <div className="h-full bg-gray-50 rounded-lg border border-gray-200 p-6 flex items-center justify-center">
        <div className="text-center text-gray-400">
          <FileText size={48} className="mx-auto mb-3 opacity-50" />
          <p className="text-sm">Select a process step to view details</p>
        </div>
      </div>
    );
  }

  const config = typeConfig[node.type] || typeConfig.event;
  const Icon = config.icon;
  const details = node.details || {};

  return (
    <div className="h-full bg-white rounded-lg border border-gray-200 overflow-hidden flex flex-col">
      {/* Header */}
      <div className={`bg-${config.color}-50 border-b border-${config.color}-100 p-4`}>
        <div className="flex items-center gap-3">
          <div className={`p-2 bg-${config.color}-100 rounded-lg`}>
            <Icon size={24} className={`text-${config.color}-600`} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">{node.label}</h3>
            <span className={`text-xs text-${config.color}-600 font-medium`}>
              {config.label}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {/* Description */}
        {details.description && (
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Description
            </h4>
            <p className="text-sm text-gray-700 leading-relaxed">
              {details.description}
            </p>
          </div>
        )}

        {/* Requirements */}
        {details.requirements && details.requirements.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-1">
              <CheckSquare size={14} />
              Requirements
            </h4>
            <ul className="space-y-1">
              {details.requirements.map((req, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-emerald-500 mt-0.5">•</span>
                  {req}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Effort */}
        {details.effort && (
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-1">
              <Clock size={14} />
              Effort Estimate
            </h4>
            <div className="inline-flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full">
              <Clock size={14} className="text-gray-500" />
              <span className="text-sm font-medium text-gray-700">{details.effort}</span>
            </div>
          </div>
        )}

        {/* Owner */}
        {details.owner && (
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-1">
              <User size={14} />
              Owner
            </h4>
            <div className="inline-flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-full">
              <User size={14} className="text-blue-500" />
              <span className="text-sm font-medium text-blue-700">{details.owner}</span>
            </div>
          </div>
        )}

        {/* Sub-workflow indicator */}
        {node.subWorkflow && (
          <div className="mt-4 p-3 bg-indigo-50 rounded-lg border border-indigo-100">
            <div className="flex items-center gap-2 text-indigo-700">
              <GitBranch size={16} />
              <span className="text-sm font-medium">Has Sub-workflow</span>
            </div>
            <p className="text-xs text-indigo-600 mt-1">
              Click to view detailed subprocess in the panel below
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-100 px-4 py-3 bg-gray-50">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Node ID: {node.id}</span>
          <span>Type: {node.type}</span>
        </div>
      </div>
    </div>
  );
}
