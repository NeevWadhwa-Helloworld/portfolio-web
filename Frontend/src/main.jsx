import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Global fetch interceptor to prepend backend URL for production deployment
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
if (API_BASE_URL) {
  const originalFetch = window.fetch;
  window.fetch = (input, init) => {
    let targetInput = input;
    if (typeof input === 'string' && (input.startsWith('/api') || input.startsWith('/admin'))) {
      targetInput = `${API_BASE_URL}${input}`;
    }
    return originalFetch(targetInput, init);
  };
}


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
