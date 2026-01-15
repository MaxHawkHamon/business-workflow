import { useCallback, useMemo } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { nodeTypes } from './nodes/BpmnNodes';
import { transformNodesWithLayout, transformEdges } from '../utils/layoutGraph';

export default function MainFlow({ data, onNodeSelect, selectedNodeId }) {
  const initialNodes = useMemo(
    () => transformNodesWithLayout(data.nodes, data.edges, {
      direction: 'LR',
      nodeSep: 60,
      rankSep: 120,
    }),
    [data.nodes, data.edges]
  );
  const initialEdges = useMemo(() => transformEdges(data.edges), [data.edges]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onNodeClick = useCallback(
    (event, node) => {
      // Find the original node data with full details
      const originalNode = data.nodes.find((n) => n.id === node.id);
      onNodeSelect(originalNode);
    },
    [data.nodes, onNodeSelect]
  );

  const onPaneClick = useCallback(() => {
    onNodeSelect(null);
  }, [onNodeSelect]);

  // Update node selection state
  const nodesWithSelection = useMemo(
    () =>
      nodes.map((node) => ({
        ...node,
        selected: node.id === selectedNodeId,
      })),
    [nodes, selectedNodeId]
  );

  return (
    <div className="w-full h-full bg-slate-50">
      <ReactFlow
        nodes={nodesWithSelection}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2, minZoom: 0.3, maxZoom: 1 }}
        minZoom={0.1}
        maxZoom={2}
        panOnScroll
        zoomOnScroll
        nodesDraggable={false}
        nodesConnectable={false}
      >
        <Background color="#cbd5e1" gap={20} size={1} />
        <Controls />
        <MiniMap
          nodeColor={(node) => {
            switch (node.type) {
              case 'manual':
                return '#93c5fd';
              case 'automated':
                return '#6ee7b7';
              case 'gateway':
                return '#fcd34d';
              case 'event':
                return '#c4b5fd';
              default:
                return '#e2e8f0';
            }
          }}
          maskColor="rgba(241, 245, 249, 0.8)"
          style={{ backgroundColor: '#f8fafc' }}
        />
      </ReactFlow>
    </div>
  );
}
