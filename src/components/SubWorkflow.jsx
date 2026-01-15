import { useMemo, useCallback, useEffect } from 'react';
import ReactFlow, {
  Background,
  Controls,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { nodeTypes } from './nodes/BpmnNodes';
import { transformNodesWithLayout, transformEdges } from '../utils/layoutGraph';
import { GitBranch } from 'lucide-react';

export default function SubWorkflow({ workflowData, workflowName, onNodeSelect, selectedNodeId }) {
  const initialNodes = useMemo(
    () =>
      workflowData?.nodes
        ? transformNodesWithLayout(workflowData.nodes, workflowData.edges, {
            direction: 'LR',
            nodeSep: 40,
            rankSep: 80,
          })
        : [],
    [workflowData]
  );

  const initialEdges = useMemo(
    () => (workflowData?.edges ? transformEdges(workflowData.edges) : []),
    [workflowData]
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Update selection state when selectedNodeId changes
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        selected: node.id === selectedNodeId,
      }))
    );
  }, [selectedNodeId, setNodes]);

  const onNodeClick = useCallback(
    (event, node) => {
      if (onNodeSelect && workflowData?.nodes) {
        const originalNode = workflowData.nodes.find((n) => n.id === node.id);
        onNodeSelect(originalNode);
      }
    },
    [workflowData, onNodeSelect]
  );

  const onPaneClick = useCallback(() => {
    if (onNodeSelect) {
      onNodeSelect(null);
    }
  }, [onNodeSelect]);

  if (!workflowData) {
    return (
      <div className="h-full bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center">
        <div className="text-center text-gray-400">
          <GitBranch size={48} className="mx-auto mb-3 opacity-50" />
          <p className="text-sm">Select a step with a sub-workflow</p>
          <p className="text-xs mt-1">to view detailed process here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-white rounded-lg border border-gray-200 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-indigo-50 border-b border-indigo-100 px-4 py-3">
        <div className="flex items-center gap-2">
          <GitBranch size={18} className="text-indigo-600" />
          <h3 className="font-semibold text-gray-800">Sub-workflow: {workflowName}</h3>
        </div>
      </div>

      {/* Flow */}
      <div className="flex-1">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          fitView
          fitViewOptions={{ padding: 0.3 }}
          minZoom={0.5}
          maxZoom={1.5}
          nodesConnectable={false}
          panOnScroll
          zoomOnScroll
        >
          <Background color="#e2e8f0" gap={16} size={1} />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}
