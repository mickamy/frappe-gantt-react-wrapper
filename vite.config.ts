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
      // Don't bundle peer deps or external libs
      external: ["react", "react-dom", "frappe-gantt"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
