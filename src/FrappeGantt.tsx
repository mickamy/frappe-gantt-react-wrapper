import Gantt from "frappe-gantt";
import type React from "react";
import { useEffect, useRef } from "react";

export interface Task {
  id?: string;
  name: string;
  start: string; // date string (YYYY-MM-DD)
  end?: string; // date string (YYYY-MM-DD)
  duration?: string;
  progress: number;
  dependencies?: string | string[];
  color?: string | undefined;
  custom_class?: string;
}

export type ViewMode =
  | "Day"
  | "Week"
  | "Month"
  | "Year"
  | "Quarter Day"
  | "Half Day";

// Props for the FrappeGantt component
export interface FrappeGanttProps {
  tasks: Task[]; // tasks to display
  viewMode?: ViewMode; // initial view mode (default is 'Day')
  onClickTask?: (task: Task) => void;
}

const FrappeGantt: React.FC<FrappeGanttProps> = ({
  tasks,
  viewMode = "Day",
  onClickTask,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const ganttRef = useRef<Gantt | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    if (!ganttRef.current) {
      ganttRef.current = new Gantt(containerRef.current, tasks, {
        view_mode: viewMode,
        on_click: (task: Task) => {
          if (onClickTask) {
            onClickTask(task);
          }
        },
      });
    } else {
      ganttRef.current.refresh(tasks);
      ganttRef.current.change_view_mode(viewMode);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
      ganttRef.current = null;
    };
  }, [tasks, viewMode, onClickTask]);

  return <div ref={containerRef} className="frappe-gantt-container" />;
};

export default FrappeGantt;
