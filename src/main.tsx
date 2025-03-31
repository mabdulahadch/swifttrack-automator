
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Ensure the environment is properly set up
window.process = window.process || { env: {} };

createRoot(document.getElementById("root")!).render(<App />);
