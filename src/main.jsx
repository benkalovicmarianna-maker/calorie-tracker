import './index.css'
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import posthog from 'posthog-js';

// Ініціалізація PostHog з ПРАВИЛЬНИМИ налаштуваннями для Session Recording
posthog.init('phc_BVaCHYDUovzvQQyiszkJMmTYoCw8U8EfqkEbowZkJTfh', {
  api_host: 'https://eu.i.posthog.com',
  autocapture: true,
  capture_pageview: true,
  // Ось що додати для запису сесій:
  session_recording: {
    maskAllInputs: false,
    maskInputFn: () => '',
  },
  persistence: 'localStorage',
});

// ПРИМУСОВИЙ ЗАПУСК запису сесії (обхід бага)
setTimeout(() => {
  if (posthog) {
    posthog.startSessionRecording();
    console.log('✅ PostHog Session Recording started');
  }
}, 2000);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)