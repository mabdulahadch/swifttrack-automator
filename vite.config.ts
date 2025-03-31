
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    // Define process.env for client-side code
    "process.env": {
      NODE_ENV: JSON.stringify(mode),
      // Add any other environment variables you need
      JWT_SECRET: JSON.stringify(process.env.JWT_SECRET || 'your-secret-key-for-jwt-tokens-here'),
      MONGODB_URI: JSON.stringify(process.env.MONGODB_URI || 'mongodb+srv://username:password@cluster0.mongodb.net/swifttrack?retryWrites=true&w=majority'),
    },
  },
}));
