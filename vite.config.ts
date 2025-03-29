import path from "node:path";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "FrappeGanttReactWrapper",
      fileName: (format) => `frappe-gantt-react-wrapper.${format}.js`,
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "frappe-gantt",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "frappe-gantt": "Gantt",
        },
        name: "FrappeGanttReactWrapper",
      },
    },
  },
});
