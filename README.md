# Business Workflow Visualizer

An interactive web application for visualizing business process flows using BPMN-style notation. Built with React Flow for flowchart rendering and dagre for automatic graph layout.

![React](https://img.shields.io/badge/React-18.2-blue)
![Vite](https://img.shields.io/badge/Vite-5.0-purple)
![React Flow](https://img.shields.io/badge/React%20Flow-11.10-green)

## Features

- **Interactive Flowcharts** - Zoom, pan, and click to explore workflows
- **BPMN-Style Nodes** - Visual distinction between manual tasks, automated processes, decision gateways, and events
- **Sub-workflow Drill-down** - Click nodes with sub-processes to view detailed workflows
- **Detail Panel** - View node metadata including description, requirements, effort estimates, and owner
- **Auto-Layout** - No manual positioning required; dagre calculates optimal node placement
- **Resizable Panels** - Drag the divider to adjust panel sizes
- **JSON Data Source** - Easily update workflows by editing a single JSON file

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

### Production Build

```bash
npm run build
npm run preview
```

## Usage

### Navigating the Interface

1. **Main Flow (top panel)** - Overview of the entire business process
2. **Sub-workflow (bottom-left)** - Detailed view of selected sub-processes
3. **Detail Card (bottom-right)** - Metadata for the selected node
4. **Resize** - Drag the horizontal grip bar to adjust panel heights

### Node Types

| Type | Color | Icon | Description |
|------|-------|------|-------------|
| Manual | Blue | Person | Human-driven tasks |
| Automated | Green | Cog | System-driven processes |
| Gateway | Amber | Diamond | Decision points |
| Event | Purple/Green | Circle | Start/end events |

## Customizing Workflow Data

All workflow data is stored in `src/data/staticDataLifecycle.json`. The structure is:

```json
{
  "nodes": [
    {
      "id": "unique-id",
      "type": "manual|automated|gateway|event",
      "label": "Display Name",
      "icon": "iconName",
      "details": {
        "description": "What this step does",
        "requirements": ["Requirement 1", "Requirement 2"],
        "effort": "Time estimate",
        "owner": "Responsible party"
      },
      "subWorkflow": "subWorkflowKey"
    }
  ],
  "edges": [
    { "id": "e1", "source": "node1", "target": "node2", "label": "Optional label" }
  ],
  "subWorkflows": {
    "subWorkflowKey": {
      "nodes": [...],
      "edges": [...]
    }
  }
}
```

### Available Icons

Icons are from [Lucide React](https://lucide.dev/icons/). Common options:
- `user`, `users`, `userCheck` - People
- `cog`, `database`, `share2` - Systems
- `shield`, `alertTriangle` - Compliance
- `mail`, `fileText`, `clipboardCheck` - Documents
- `play`, `checkCircle`, `xCircle` - Events
- `gitBranch` - Decisions

### Adding a New Node

1. Add the node object to the `nodes` array
2. Add edges connecting it to other nodes
3. Positions are calculated automatically - no coordinates needed

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool
- **React Flow** - Flowchart library
- **dagre** - Graph layout algorithm
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## License

MIT
