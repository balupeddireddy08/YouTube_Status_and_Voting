import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';

try {
  console.log("Starting React application");
  const rootElement = document.getElementById('root');

  if (!rootElement) {
    throw new Error("Root element not found");
  }

  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log("React application started");
} catch (error) {
  console.error("Failed to start React application:", error);
  const rootElement = document.getElementById('root');
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="padding: 20px; text-align: center;">
        <h1 style="color: #ef4444;">Error Starting Application</h1>
        <p>${error.message}</p>
        <button onclick="window.location.reload()" style="background: #3b82f6; color: white; padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer; margin-top: 16px;">
          Reload Page
        </button>
      </div>
    `;
  }
}
