# test

Date: March 25, 2025 → March 29, 2025
Status: Not started

# frappe-gantt-react-wrapper

A minimal React wrapper component for [frappe-gantt](https://github.com/frappe/gantt), built with TypeScript.

## Features

- 🧩 Simple React wrapper for `frappe-gantt`
- 🔧 Written in TypeScript
- 📦 Compatible with React 18+
- 🎯 Minimal, easily extensible

## Installation

```
npm install frappe-gantt-react-wrapper frappe-gantt
```

> react and react-dom are required as peer dependencies.
>

## Usage

```
import React from 'react';
import FrappeGantt, { Task } from 'frappe-gantt-react-wrapper';
import 'frappe-gantt/dist/frappe-gantt.css';

const tasks: Task[] = [
  {
    id: 'Task-1',
    name: 'Design',
    start: '2025-04-01',
    end: '2025-04-05',
    progress: 80
  },
  {
    id: 'Task-2',
    name: 'Development',
    start: '2025-04-06',
    end: '2025-04-15',
    progress: 20,
    dependencies: 'Task-1'
  }
];

export default function App() {
  return <FrappeGantt tasks={tasks} viewMode="Month" />;
}
```

## Props

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| `tasks` | `Task[]` | ✅ | List of Gantt tasks |
| `viewMode` | `'Day' | 'Week' | ...` | ❌ | Initial view mode (default: Day) |
| `onClickTask` | `(task: Task) => void` | ❌ | Callback for task click events |

## Task Shape

```
export interface Task {
  id?: string;
  name: string;
  start: string;
  end?: string;
  duration?: string;
  progress: number;
  dependencies?: string | string[];
  color?: string;
  custom_class?: string;
}
```

## Internal Logic

The component uses `useEffect` and `ref` to manage the chart lifecycle.

```
useEffect(() => {
  if (!containerRef.current) return;

  if (!ganttRef.current) {
    ganttRef.current = new Gantt(containerRef.current, tasks, {
      view_mode: viewMode,
      on_click: onClickTask,
    });
  } else {
    ganttRef.current.refresh(tasks);
    ganttRef.current.change_view_mode(viewMode);
  }

  return () => {
    containerRef.current.innerHTML = '';
    ganttRef.current = null;
  };
}, [tasks, viewMode, onClickTask]);
```

## Build and Publish

```
npm run build
npm publish --access public
```

Make sure your `package.json` includes the appropriate fields:

```
{
  "main": "dist/frappe-gantt-react-wrapper.umd.js",
  "module": "dist/frappe-gantt-react-wrapper.es.js",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/frappe-gantt-react-wrapper.es.js",
      "require": "./dist/frappe-gantt-react-wrapper.umd.js",
      "types": "./dist/index.d.ts"
    }
  },
  "files": ["dist", "src"]
}
```

## License

[MIT](./LICENSE)
