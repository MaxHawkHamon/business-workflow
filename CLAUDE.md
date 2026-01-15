# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (http://localhost:5173)
npm run build    # Production build to dist/
npm run preview  # Preview production build
```

## Architecture

This is a React + Vite application for visualizing business process workflows using BPMN-style notation with React Flow.

### Core Components

- **App.jsx** - Main container managing state for node selection across main flow and sub-workflows. Tracks `mainSelectedNode` (determines sub-workflow display), `detailNode` (shown in detail card), and `subSelectedNodeId` (sub-workflow highlighting).

- **MainFlow.jsx** - Top panel displaying the primary workflow. Uses `transformNodesWithLayout()` for auto-positioning via dagre.

- **SubWorkflow.jsx** - Bottom-left panel showing detailed sub-processes. Displays when a main node has a `subWorkflow` property. Re-mounts via React key when sub-workflow changes.

- **DetailCard.jsx** - Bottom-right panel showing node metadata (description, requirements, effort, owner).

### Custom BPMN Nodes (components/nodes/BpmnNodes.jsx)

Four node types with distinct styling:
- `manual` (blue) - Human-driven tasks
- `automated` (green) - System-driven tasks
- `gateway` (amber diamond) - Decision points
- `event` (circle) - Start/end events

### Auto-Layout (utils/layoutGraph.js)

Uses dagre to automatically calculate node positions from graph structure. No manual positioning needed in JSON data - just define nodes and edges.

### Data Structure (src/data/staticDataLifecycle.json)

All workflow data stored in JSON:
- `nodes[]` - id, type, label, icon, details, optional subWorkflow reference
- `edges[]` - source, target, optional label
- `subWorkflows{}` - named sub-workflow definitions with their own nodes/edges

To add a node: add to nodes array and connect via edges - positions auto-calculate.
