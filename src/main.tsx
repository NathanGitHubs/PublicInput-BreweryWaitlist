// ---------------------------------------------------------------------------
// main.tsx — Entry point. Mounts the React app into the #root div in index.html.
// ---------------------------------------------------------------------------

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './styles.css';

// StrictMode double-invokes effects in dev to surface bugs early.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
