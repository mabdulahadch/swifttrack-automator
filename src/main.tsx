
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Ensure the environment is properly set up
if (typeof window !== 'undefined') {
  window.process = { env: {} } as any;
}

createRoot(document.getElementById("root")!).render(<App />);
