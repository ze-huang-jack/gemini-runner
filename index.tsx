/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { register } from './serviceWorkerRegistration';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Register service worker for PWA
register({
  onSuccess: (registration) => {
    console.log('ServiceWorker registration successful with scope: ', registration.scope);
  },
  onUpdate: (registration) => {
    console.log('New content is available; please refresh.');
    if (registration.waiting) {
      if (window.confirm('A new version is available! Would you like to update now?')) {
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        window.location.reload();
      }
    }
  },
});

// Listen for the service worker's "controllerchange" event to reload the page when a new service worker takes control
navigator.serviceWorker.addEventListener('controllerchange', () => {
  window.location.reload();
});