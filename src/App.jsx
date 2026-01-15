import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { ReactFlowProvider } from 'reactflow';
import MainFlow from './components/MainFlow';
import SubWorkflow from './components/SubWorkflow';
import DetailCard from './components/DetailCard';
import lifecycleData from './data/staticDataLifecycle.json';
import { Database, User, Cog, GitBranch, GripHorizontal } from 'lucide-react';

function App() {
  // Track main flow selection (determines which sub-workflow to show)
  const [mainSelectedNode, setMainSelectedNode] = useState(null);
  // Track which node's details to show (can be from main or sub-workflow)
  const [detailNode, setDetailNode] = useState(null);
  // Track sub-workflow selected node for highlighting
  const [subSelectedNodeId, setSubSelectedNodeId] = useState(null);
  // Track bottom panel height (in pixels)
  const [bottomHeight, setBottomHeight] = useState(320);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const subWorkflowData = useMemo(() => {
    if (!mainSelectedNode?.subWorkflow) return null;
    return lifecycleData.subWorkflows[mainSelectedNode.subWorkflow];
  }, [mainSelectedNode]);

  const subWorkflowName = useMemo(() => {
    if (!mainSelectedNode?.subWorkflow) return null;
    return mainSelectedNode.subWorkflow
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  }, [mainSelectedNode]);

  // Handle main flow node selection
  const handleMainNodeSelect = useCallback((node) => {
    setMainSelectedNode(node);
    setDetailNode(node);
    setSubSelectedNodeId(null); // Clear sub-workflow selection
  }, []);

  // Handle sub-workflow node selection
  const handleSubNodeSelect = useCallback((node) => {
    if (node) {
      setDetailNode(node);
      setSubSelectedNodeId(node.id);
    } else {
      // Clicked on empty space in sub-workflow, revert to main node details
      setDetailNode(mainSelectedNode);
      setSubSelectedNodeId(null);
    }
  }, [mainSelectedNode]);

  // Handle drag start
  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  // Handle drag
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const headerHeight = 73; // Approximate header height
      const minBottom = 150;
      const maxBottom = containerRect.height - headerHeight - 150;

      // Calculate new bottom height based on mouse position
      const newBottomHeight = containerRect.bottom - e.clientY - 16; // 16 for padding
      setBottomHeight(Math.min(Math.max(newBottomHeight, minBottom), maxBottom));
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      className={`h-screen w-screen flex flex-col bg-gray-100 ${isDragging ? 'select-none' : ''}`}
    >
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Database size={24} className="text-indigo-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                Client Static Data Lifecycle
              </h1>
              <p className="text-sm text-gray-500">
                Corporate client onboarding and data management workflow
              </p>
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-200 rounded border border-blue-300"></div>
              <User size={14} className="text-blue-600" />
              <span className="text-gray-600">Manual</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-emerald-200 rounded border border-emerald-300"></div>
              <Cog size={14} className="text-emerald-600" />
              <span className="text-gray-600">Automated</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-amber-200 rounded border border-amber-300 rotate-45 scale-75"></div>
              <GitBranch size={14} className="text-amber-600" />
              <span className="text-gray-600">Decision</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-200 rounded-full border border-purple-300"></div>
              <span className="text-gray-600">Event</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Flow (Top Section) */}
      <div className="flex-1 min-h-0 p-4 pb-0">
        <div className="h-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <ReactFlowProvider>
            <MainFlow
              data={lifecycleData}
              onNodeSelect={handleMainNodeSelect}
              selectedNodeId={mainSelectedNode?.id}
            />
          </ReactFlowProvider>
        </div>
      </div>

      {/* Draggable Divider */}
      <div
        className={`flex-shrink-0 h-4 flex items-center justify-center cursor-row-resize group ${
          isDragging ? 'bg-blue-100' : 'hover:bg-gray-200'
        } transition-colors mx-4 rounded`}
        onMouseDown={handleMouseDown}
      >
        <GripHorizontal
          size={20}
          className={`${isDragging ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-600'} transition-colors`}
        />
      </div>

      {/* Bottom Panels */}
      <div
        className="flex-shrink-0 p-4 pt-0"
        style={{ height: bottomHeight }}
      >
        <div className="h-full flex gap-4">
          {/* Sub-workflow Panel */}
          <div className="flex-1">
            <ReactFlowProvider key={mainSelectedNode?.subWorkflow || 'empty'}>
              <SubWorkflow
                workflowData={subWorkflowData}
                workflowName={subWorkflowName}
                onNodeSelect={handleSubNodeSelect}
                selectedNodeId={subSelectedNodeId}
              />
            </ReactFlowProvider>
          </div>

          {/* Detail Card Panel */}
          <div className="flex-1">
            <DetailCard node={detailNode} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
