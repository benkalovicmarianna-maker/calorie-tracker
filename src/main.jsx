import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import * as Sentry from "@sentry/react";
import posthog from 'posthog-js';
import App from './App';

Sentry.init({
  dsn: "https://e2fb4bc5ee018ab1784e809c8ce7e6ca@o4511359267962880.ingest.de.sentry.io/4511359280152656",
  sendDefaultPii: true,
  environment: import.meta.env.MODE,

  integrations: [
    Sentry.browserTracingIntegration(), // ← головне що було відсутнє
    Sentry.replayIntegration({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],

  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

// PostHog ініціалізація
posthog.init('phc_BVaCHYDUovzvQQyiszkJMmTYoCw8U8EfqkEbowZkJTfh', {
  api_host: 'https://eu.i.posthog.com',
  autocapture: true,
  capture_pageview: true,
  session_recording: {
    maskAllInputs: false,
  },
  persistence: 'localStorage',
});

setTimeout(() => {
  if (posthog) {
    posthog.startSessionRecording();
    console.log('✅ PostHog Session Recording started');
  }
}, 2000);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);