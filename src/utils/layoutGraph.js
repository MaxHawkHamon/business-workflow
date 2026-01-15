import dagre from 'dagre';

const NODE_WIDTH = 160;
const NODE_HEIGHT = 80;
const GATEWAY_SIZE = 80;
const EVENT_SIZE = 70;

function getNodeDimensions(type) {
  switch (type) {
    case 'gateway':
      return { width: GATEWAY_SIZE, height: GATEWAY_SIZE };
    case 'event':
      return { width: EVENT_SIZE, height: EVENT_SIZE };
    default:
      return { width: NODE_WIDTH, height: NODE_HEIGHT };
  }
}

export function layoutGraph(nodes, edges, options = {}) {
  const {
    direction = 'LR', // LR = left-to-right, TB = top-to-bottom
    nodeSep = 80,     // Horizontal spacing between nodes
    rankSep = 100,    // Vertical spacing between ranks
    edgeSep = 30,     // Spacing between edges
  } = options;

  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  dagreGraph.setGraph({
    rankdir: direction,
    nodesep: nodeSep,
    ranksep: rankSep,
    edgesep: edgeSep,
    marginx: 50,
    marginy: 50,
  });

  // Add nodes to dagre
  nodes.forEach((node) => {
    const { width, height } = getNodeDimensions(node.type);
    dagreGraph.setNode(node.id, { width, height });
  });

  // Add edges to dagre
  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  // Calculate layout
  dagre.layout(dagreGraph);

  // Apply calculated positions to nodes
  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    const { width, height } = getNodeDimensions(node.type);

    return {
      ...node,
      position: {
        // Dagre returns center position, React Flow needs top-left
        x: nodeWithPosition.x - width / 2,
        y: nodeWithPosition.y - height / 2,
      },
    };
  });

  return layoutedNodes;
}

export function transformNodesWithLayout(rawNodes, edges, options = {}) {
  const layoutedNodes = layoutGraph(rawNodes, edges, options);

  return layoutedNodes.map((node) => ({
    id: node.id,
    type: node.type,
    position: node.position,
    data: {
      label: node.label,
      icon: node.icon,
      subWorkflow: node.subWorkflow,
      ...node.details,
    },
  }));
}

export function transformEdges(edges) {
  return edges.map((edge) => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    sourceHandle: edge.sourceHandle,
    targetHandle: edge.targetHandle,
    label: edge.label,
    animated: edge.animated || false,
    type: 'smoothstep',
    style: { stroke: '#64748b', strokeWidth: 2 },
    labelStyle: { fontSize: 12, fontWeight: 600, fill: '#475569' },
    labelBgStyle: { fill: '#f8fafc', fillOpacity: 0.9 },
    labelBgPadding: [4, 8],
    labelBgBorderRadius: 4,
  }));
}
