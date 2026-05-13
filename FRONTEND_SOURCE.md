# B2 Web RViz — Frontend Source Code (All Files)

> Stack: React 18 · React Three Fiber 8 · Zustand · Three.js · Vite
> Architecture: 3 layers — UI (Layer 1) / Store (Layer 2) / R3F Canvas (Layer 3)

---

## `frontend/package.json`

```json
{
  "name": "b2-web-rviz-r3f",
  "version": "0.2.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite --host 0.0.0.0 --port 5173",
    "build": "vite build",
    "preview": "vite preview --host 0.0.0.0"
  },
  "dependencies": {
    "@react-three/drei": "^9.115.0",
    "@react-three/fiber": "^8.17.10",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "three": "^0.167.0",
    "urdf-loader": "^0.12.1",
    "zustand": "^4.5.4"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.4",
    "vite": "^5.4.21"
  }
}
```

---

## `frontend/vite.config.js`

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Production bundle served under /app/ by FastAPI StaticFiles
// Dev: Vite :5173 proxies API/WS to gateway :8080
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/app/' : '/',
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    proxy: {
      '/api': { target: 'http://localhost:8080', changeOrigin: true },
      '/ws': { target: 'ws://localhost:8080', ws: true, changeOrigin: true },
    },
  },
}));
```

---

## `frontend/src/main.jsx`

```jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './style.css';

createRoot(document.getElementById('root')).render(<App />);
```

---

## `frontend/src/App.jsx`

```jsx
import React, { useEffect, useState } from 'react';
import Toolbar from './components/Toolbar';
import ControlPanel from './components/ControlPanel';
import SceneCanvas from './canvas/SceneCanvas';
import { useRobotStore } from './store/useRobotStore';

export default function App() {
  const connectWS = useRobotStore((s) => s.connectWS);
  const [panelOpen, setPanelOpen] = useState(false);

  useEffect(() => {
    connectWS();
    return () => useRobotStore.getState().disconnectWS();
  }, [connectWS]);

  return (
    <div className="app">
      <Toolbar />

      <div className="layout" style={{ position: 'relative' }}>
        {/* Layer 3: 3D Canvas fills remaining space */}
        <SceneCanvas />

        {/* Layer 1: Control panel — drawer on mobile */}
        <div className={`panel-outer ${panelOpen ? 'open' : ''}`}
             style={{ display: 'contents' }}>
          <ControlPanel panelOpen={panelOpen} />
        </div>

        {/* Mobile toggle button — floats on the right edge of the canvas */}
        <button
          className="panel-toggle-btn"
          onClick={() => setPanelOpen((o) => !o)}
          type="button"
          aria-label="Toggle panel"
        >
          {panelOpen ? '›' : '‹'}
        </button>
      </div>
    </div>
  );
}
```

---

## `frontend/src/style.css`

```css
/* ═══════════════════════════════════════════════════════
   B2 Web RViz — Industrial HMI Design System
   Dark mode · Teal accent · Precision typography
   ═══════════════════════════════════════════════════════ */

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

:root {
  /* ── Colour tokens ───────────────────────────────── */
  --bg:          #101418;
  --bg-deep:     #0b0e11;
  --surface:     #161b22;
  --surface-2:   #1d2330;
  --surface-3:   #252d3d;
  --border:      #252d3d;
  --border-mid:  #2e3a4e;
  --border-hi:   #3d4f68;

  --text:        #e2e8f4;
  --text-dim:    #7a8fa8;
  --text-muted:  #4a5a72;

  --accent:      #2d8f9e;
  --accent-hi:   #3db8cb;
  --accent-glow: rgba(45, 143, 158, 0.18);
  --accent-bg:   rgba(45, 143, 158, 0.08);

  --ok:          #22c55e;
  --ok-glow:     rgba(34, 197, 94, 0.2);
  --ok-bg:       rgba(34, 197, 94, 0.08);

  --warn:        #f59e0b;
  --warn-bg:     rgba(245, 158, 11, 0.08);

  --alarm:       #c94a4a;
  --alarm-glow:  rgba(201, 74, 74, 0.2);
  --alarm-bg:    rgba(201, 74, 74, 0.08);

  /* ── Typography ──────────────────────────────────── */
  --font-ui:   'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;

  /* ── Geometry ────────────────────────────────────── */
  --radius-sm: 4px;
  --radius:    6px;
  --radius-lg: 10px;
  --panel-w:   300px;

  /* ── Motion ──────────────────────────────────────── */
  --ease: cubic-bezier(0.4, 0, 0.2, 1);
  --fast: 120ms var(--ease);
  --mid:  220ms var(--ease);
}

/* ── Reset ────────────────────────────────────────────── */
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
html, body, #root { width: 100%; height: 100%; overflow: hidden; }
body {
  font-family: var(--font-ui);
  background: var(--bg);
  color: var(--text);
  font-size: 13px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

/* ══════════════════════════════════════════════════════
   APP SHELL
══════════════════════════════════════════════════════ */
.app { display: flex; flex-direction: column; height: 100vh; overflow: hidden; }

/* ══════════════════════════════════════════════════════
   TOOLBAR
══════════════════════════════════════════════════════ */
.toolbar {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 16px;
  height: 48px;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
  position: relative;
  z-index: 10;
}

.toolbar::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(180deg, var(--accent-hi), var(--accent));
}

.toolbar-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-left: 6px;
}

.toolbar-logo-mark {
  width: 28px;
  height: 28px;
  background: var(--accent-bg);
  border: 1px solid var(--accent);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 700;
  color: var(--accent-hi);
  letter-spacing: 0.05em;
}

.toolbar-logo-name {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text);
}

.toolbar-logo-sub {
  font-size: 9px;
  font-family: var(--font-mono);
  color: var(--text-muted);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.toolbar-sep { width: 1px; height: 24px; background: var(--border-mid); flex-shrink: 0; }

.toolbar-field {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: var(--text-dim);
}

.toolbar-field input {
  background: var(--bg-deep);
  border: 1px solid var(--border-mid);
  border-radius: var(--radius-sm);
  color: var(--text);
  padding: 4px 8px;
  width: 190px;
  font-size: 11px;
  font-family: var(--font-mono);
  transition: border-color var(--fast);
}

.toolbar-field input:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 2px var(--accent-glow);
}

.toolbar-actions { margin-left: auto; display: flex; align-items: center; gap: 8px; }

.toolbar-link {
  font-size: 11px;
  color: var(--text-muted);
  text-decoration: none;
  padding: 4px 10px;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  transition: color var(--fast), border-color var(--fast);
  font-family: var(--font-mono);
  letter-spacing: 0.04em;
}
.toolbar-link:hover { color: var(--accent-hi); border-color: var(--accent); }

/* ── Connection pill ─────────────────────────────── */
.conn-pill {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 3px 10px;
  border-radius: 99px;
  font-size: 10px;
  font-family: var(--font-mono);
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  border: 1px solid;
  transition: all var(--fast);
}
.conn-pill.connected {
  color: var(--ok);
  border-color: var(--ok);
  background: var(--ok-bg);
}
.conn-pill.disconnected {
  color: var(--alarm);
  border-color: var(--alarm);
  background: var(--alarm-bg);
}
.conn-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}
.connected .conn-dot {
  background: var(--ok);
  box-shadow: 0 0 6px var(--ok-glow);
  animation: pulse-dot 2s infinite;
}
.disconnected .conn-dot { background: var(--alarm); }

@keyframes pulse-dot {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

/* ══════════════════════════════════════════════════════
   LAYOUT
══════════════════════════════════════════════════════ */
.layout { display: flex; flex: 1; overflow: hidden; }

.viewer { flex: 1; position: relative; min-width: 0; }
.viewer canvas { display: block !important; width: 100% !important; height: 100% !important; }
.viewer.add-mode canvas { cursor: crosshair; }

/* ══════════════════════════════════════════════════════
   CONTROL PANEL (right sidebar)
══════════════════════════════════════════════════════ */
.panel {
  width: var(--panel-w);
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  background: var(--surface);
  border-left: 1px solid var(--border);
  overflow: hidden;
}

.panel-scroll {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.panel-scroll::-webkit-scrollbar { width: 4px; }
.panel-scroll::-webkit-scrollbar-track { background: transparent; }
.panel-scroll::-webkit-scrollbar-thumb { background: var(--border-mid); border-radius: 2px; }

/* ── Section card ─────────────────────────────────── */
.card {
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 8px 12px;
  border-bottom: 1px solid var(--border);
  cursor: pointer;
  user-select: none;
}

.card-header-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
  flex-shrink: 0;
}

.card-title {
  flex: 1;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-dim);
  font-family: var(--font-mono);
}

.card-chevron {
  font-size: 9px;
  color: var(--text-muted);
  transition: transform var(--fast);
}
.card-chevron.open { transform: rotate(180deg); }

.card-body { padding: 10px 12px; display: flex; flex-direction: column; gap: 8px; }
.card-body.hidden { display: none; }

/* ── Data rows ────────────────────────────────────── */
.data-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
}

.data-label {
  font-size: 10px;
  color: var(--text-muted);
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  flex-shrink: 0;
}

.data-value {
  font-size: 11px;
  color: var(--text);
  font-family: var(--font-mono);
  text-align: right;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.data-value.ok    { color: var(--ok); }
.data-value.warn  { color: var(--warn); }
.data-value.alarm { color: var(--alarm); }
.data-value.accent { color: var(--accent-hi); }

/* ── Status badge ─────────────────────────────────── */
.badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  border-radius: 99px;
  font-size: 9px;
  font-family: var(--font-mono);
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  border: 1px solid;
}
.badge-ok    { color: var(--ok);    border-color: var(--ok);    background: var(--ok-bg); }
.badge-alarm { color: var(--alarm); border-color: var(--alarm); background: var(--alarm-bg); }
.badge-warn  { color: var(--warn);  border-color: var(--warn);  background: var(--warn-bg); }
.badge-dim   { color: var(--text-muted); border-color: var(--border); background: transparent; }
.badge-accent { color: var(--accent-hi); border-color: var(--accent); background: var(--accent-bg); }

/* ── View toggle ──────────────────────────────────── */
.view-toggle {
  display: flex;
  background: var(--bg-deep);
  border: 1px solid var(--border-mid);
  border-radius: var(--radius);
  overflow: hidden;
}

.view-toggle-btn {
  flex: 1;
  padding: 6px 0;
  border: none;
  background: transparent;
  color: var(--text-muted);
  font-size: 11px;
  font-family: var(--font-mono);
  font-weight: 600;
  cursor: pointer;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  transition: all var(--fast);
}

.view-toggle-btn.active {
  background: var(--accent-bg);
  color: var(--accent-hi);
  box-shadow: inset 0 0 0 1px var(--accent);
}

.view-toggle-btn:hover:not(.active) { color: var(--text-dim); background: var(--surface-3); }

/* ── Checkbox ─────────────────────────────────────── */
.check-row {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 11px;
  color: var(--text-dim);
}

.check-row input[type="checkbox"] {
  appearance: none;
  width: 14px;
  height: 14px;
  border: 1px solid var(--border-mid);
  border-radius: 3px;
  background: var(--bg-deep);
  cursor: pointer;
  position: relative;
  flex-shrink: 0;
  transition: all var(--fast);
}

.check-row input[type="checkbox"]:checked {
  background: var(--accent);
  border-color: var(--accent);
}

.check-row input[type="checkbox"]:checked::after {
  content: '✓';
  position: absolute;
  top: -1px;
  left: 2px;
  font-size: 10px;
  color: #fff;
  font-weight: 700;
}

/* ── Buttons ──────────────────────────────────────── */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 6px 12px;
  border: 1px solid var(--border-mid);
  border-radius: var(--radius-sm);
  background: var(--surface-3);
  color: var(--text-dim);
  font-size: 11px;
  font-family: var(--font-mono);
  font-weight: 600;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all var(--fast);
  text-transform: uppercase;
  white-space: nowrap;
}
.btn:hover:not(:disabled) { color: var(--text); border-color: var(--border-hi); background: var(--surface-3); }
.btn:disabled { opacity: 0.35; cursor: not-allowed; }

.btn-primary {
  background: var(--accent-bg);
  border-color: var(--accent);
  color: var(--accent-hi);
}
.btn-primary:hover:not(:disabled) {
  background: rgba(45, 143, 158, 0.22);
  border-color: var(--accent-hi);
  box-shadow: 0 0 12px var(--accent-glow);
}

.btn-danger {
  border-color: var(--alarm);
  color: var(--alarm);
  background: var(--alarm-bg);
}
.btn-danger:hover:not(:disabled) {
  background: rgba(201, 74, 74, 0.18);
  box-shadow: 0 0 8px var(--alarm-glow);
}

.btn-sm { padding: 4px 8px; font-size: 10px; }

.btn-icon {
  width: 28px;
  height: 28px;
  padding: 0;
  flex-shrink: 0;
}

.action-row { display: flex; gap: 6px; flex-wrap: wrap; }

/* ── Nav progress ─────────────────────────────────── */
.nav-progress {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.nav-progress-bar-wrap {
  background: var(--bg-deep);
  border: 1px solid var(--border);
  border-radius: 99px;
  height: 6px;
  overflow: hidden;
}

.nav-progress-bar {
  height: 100%;
  border-radius: 99px;
  background: linear-gradient(90deg, var(--accent), var(--accent-hi));
  transition: width 0.4s var(--ease);
}

/* ── Waypoint cards ───────────────────────────────── */
.wp-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-height: 200px;
  overflow-y: auto;
  padding-right: 2px;
}

.wp-list::-webkit-scrollbar { width: 3px; }
.wp-list::-webkit-scrollbar-thumb { background: var(--border-mid); border-radius: 2px; }

.wp-card {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  background: var(--bg-deep);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  transition: border-color var(--fast);
}
.wp-card:hover { border-color: var(--border-mid); }

.wp-index {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--accent-bg);
  border: 1px solid var(--accent);
  color: var(--accent-hi);
  font-size: 10px;
  font-family: var(--font-mono);
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.wp-data {
  flex: 1;
  display: flex;
  gap: 10px;
  min-width: 0;
}

.wp-field {
  display: flex;
  flex-direction: column;
  gap: 1px;
  min-width: 0;
}

.wp-field-label { font-size: 8px; color: var(--text-muted); font-family: var(--font-mono); text-transform: uppercase; }
.wp-field-value { font-size: 10px; color: var(--text); font-family: var(--font-mono); }

.wp-delete {
  width: 22px;
  height: 22px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text-muted);
  cursor: pointer;
  font-size: 12px;
  transition: all var(--fast);
  padding: 0;
}
.wp-delete:hover { border-color: var(--alarm); color: var(--alarm); background: var(--alarm-bg); }

.wp-empty {
  font-size: 11px;
  color: var(--text-muted);
  font-style: italic;
  text-align: center;
  padding: 12px 0;
}

/* ── Inputs ───────────────────────────────────────── */
input[type="number"],
input[type="text"],
select {
  background: var(--bg-deep);
  border: 1px solid var(--border-mid);
  border-radius: var(--radius-sm);
  color: var(--text);
  padding: 5px 8px;
  font-size: 11px;
  font-family: var(--font-mono);
  transition: border-color var(--fast);
  width: 100%;
}
input[type="number"]:focus,
input[type="text"]:focus,
select:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 2px var(--accent-glow);
}
select { appearance: none; cursor: pointer; }

.input-row {
  display: flex;
  gap: 6px;
  align-items: flex-end;
}
.input-row > * { flex: 1; }

.label-field {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 11px;
  color: var(--text-dim);
}
.label-field-label { font-size: 9px; text-transform: uppercase; letter-spacing: 0.08em; font-family: var(--font-mono); color: var(--text-muted); }

/* ── Range sliders ────────────────────────────────── */
.slider-row { display: flex; flex-direction: column; gap: 4px; }
.slider-header { display: flex; justify-content: space-between; align-items: center; }
.slider-label { font-size: 10px; color: var(--text-dim); }
.slider-value {
  font-size: 10px;
  font-family: var(--font-mono);
  color: var(--accent-hi);
  background: var(--accent-bg);
  border: 1px solid var(--accent);
  border-radius: var(--radius-sm);
  padding: 1px 6px;
}

input[type="range"] {
  appearance: none;
  width: 100%;
  height: 4px;
  border-radius: 2px;
  background: var(--border-mid);
  outline: none;
  cursor: pointer;
}
input[type="range"]::-webkit-slider-thumb {
  appearance: none;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--accent-hi);
  border: 2px solid var(--surface);
  box-shadow: 0 0 4px var(--accent-glow);
  cursor: pointer;
}
input[type="range"]::-moz-range-thumb {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--accent-hi);
  border: 2px solid var(--surface);
  cursor: pointer;
}

/* ── Messages ─────────────────────────────────────── */
.msg-box {
  padding: 8px 10px;
  border-radius: var(--radius-sm);
  font-size: 11px;
  font-family: var(--font-mono);
  border: 1px solid var(--border-mid);
  background: var(--surface-3);
  color: var(--text-dim);
}
.msg-box.error {
  border-color: var(--alarm);
  background: var(--alarm-bg);
  color: #fca5a5;
}
.msg-box.success {
  border-color: var(--ok);
  background: var(--ok-bg);
  color: #86efac;
}

/* ── Camera feed ──────────────────────────────────── */
.camera-feed-wrap {
  position: relative;
  background: #000;
  border-radius: var(--radius-sm);
  overflow: hidden;
  aspect-ratio: 4/3;
  border: 1px solid var(--border);
}

.camera-feed-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.camera-feed-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 8px;
  background: linear-gradient(transparent 60%, rgba(0,0,0,0.7));
  pointer-events: none;
}

.camera-feed-overlay > * { pointer-events: auto; }

.camera-feed-top {
  position: absolute;
  top: 8px;
  left: 8px;
  right: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.camera-feed-badge {
  display: flex;
  align-items: center;
  gap: 4px;
  background: rgba(0,0,0,0.6);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 99px;
  padding: 2px 8px;
  font-size: 9px;
  font-family: var(--font-mono);
  color: #ccc;
  backdrop-filter: blur(4px);
}

.camera-live-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--alarm);
  animation: pulse-dot 1.2s infinite;
  flex-shrink: 0;
}

.camera-capture-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 6px 12px;
  background: rgba(255,255,255,0.12);
  border: 1px solid rgba(255,255,255,0.25);
  border-radius: var(--radius-sm);
  color: #fff;
  font-size: 11px;
  font-family: var(--font-mono);
  font-weight: 600;
  cursor: pointer;
  backdrop-filter: blur(6px);
  transition: all var(--fast);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  width: 100%;
  justify-content: center;
}
.camera-capture-btn:hover {
  background: rgba(255,255,255,0.2);
  border-color: rgba(255,255,255,0.5);
}
.camera-capture-btn:active { transform: scale(0.97); }

/* ── Hint text ────────────────────────────────────── */
.hint {
  font-size: 10px;
  color: var(--text-muted);
  line-height: 1.5;
  font-style: italic;
}

/* ══════════════════════════════════════════════════════
   RESPONSIVE — mobile drawer
══════════════════════════════════════════════════════ */
.panel-toggle-btn {
  display: none;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  z-index: 20;
  width: 24px;
  height: 48px;
  background: var(--surface);
  border: 1px solid var(--border-mid);
  border-right: none;
  border-radius: 6px 0 0 6px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  color: var(--text-dim);
  font-size: 12px;
  transition: color var(--fast);
}

@media (max-width: 768px) {
  :root { --panel-w: 280px; }

  .panel-toggle-btn { display: flex; }

  .panel {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    z-index: 15;
    transform: translateX(100%);
    transition: transform var(--mid);
    box-shadow: -8px 0 24px rgba(0,0,0,0.4);
  }

  .panel.open { transform: translateX(0); }

  .toolbar-field { display: none; }
}
```

---

## `frontend/src/store/useRobotStore.js`

```js
/**
 * Layer 2: Global State (Zustand)
 *
 * Single source of truth for all robot state consumed by both
 * UI components (Layer 1) and the R3F canvas (Layer 3).
 *
 * WS connections are owned here — components are purely reactive.
 */
import { create } from 'zustand';

const IS_DEV = import.meta.env.DEV;

function resolveBackend() {
  return IS_DEV
    ? `${window.location.protocol}//${window.location.hostname}:8080`
    : window.location.origin;
}

function resolveWS(backendUrl) {
  try {
    const u = new URL(backendUrl);
    const proto = u.protocol === 'https:' ? 'wss' : 'ws';
    return `${proto}://${u.hostname}:${u.port || '8080'}`;
  } catch {
    return IS_DEV
      ? `${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${window.location.hostname}:8080`
      : `${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${window.location.host}`;
  }
}

export const useRobotStore = create((set, get) => ({
  // ── Connection ──────────────────────────────────────────────
  backendUrl: resolveBackend(),
  wsUrl: resolveWS(resolveBackend()),
  connected: false,

  setBackendUrl: (url) => {
    set({ backendUrl: url, wsUrl: resolveWS(url) });
  },

  // ── Robot State ──────────────────────────────────────────────
  pose: null,           // { x, y, z, qx, qy, qz, qw, yaw }
  jointPositions: {},   // { joint_name: radians }
  urdfVersion: 0,       // bumped when backend reloads URDF
  urdfStatus: 'loading…',

  // ── Navigation ───────────────────────────────────────────────
  waypoints: [],        // [{ x, y, z, yaw }]
  navFeedback: null,
  navigationRunning: false,
  repeatCount: 1,
  navPlan: null,        // { frame_id, count, points: [{x,y,z,yaw}] }

  // ── Point Cloud ──────────────────────────────────────────────
  pointCount: 0,
  // Float32Array of xyz positions — stored outside Zustand to avoid re-render on every frame
  // Access via the ref exported below (pointsRef)
  pointCloudHeader: null,

  // ── Live Config ──────────────────────────────────────────────
  liveCfg: null,

  // ── UI state ─────────────────────────────────────────────────
  viewMode: 'top',      // 'top' | '3d'
  addMode: true,
  message: '',
  error: '',

  setViewMode: (v) => set({ viewMode: v }),
  setAddMode: (v) => set({ addMode: v }),
  setUrdfStatus: (s) => set({ urdfStatus: s }),
  setMessage: (m) => set({ message: m }),
  setError: (e) => set({ error: e }),
  setRepeatCount: (n) => set({ repeatCount: n }),
  setLiveCfg: (cfg) => set({ liveCfg: cfg }),

  // ── Waypoint helpers (local UI only — POST separately) ───────
  addWaypoint: (wp) => set((s) => ({ waypoints: [...s.waypoints, wp] })),
  removeLastWaypoint: () => set((s) => ({ waypoints: s.waypoints.slice(0, -1) })),
  setWaypoints: (wps) => set({ waypoints: wps }),

  // ── WebSocket lifecycle ──────────────────────────────────────
  _statusWs: null,
  _pcWs: null,

  connectWS: () => {
    const { wsUrl, _statusWs, _pcWs } = get();

    // Close stale connections
    if (_statusWs) _statusWs.close();
    if (_pcWs) _pcWs.close();

    // ── Status WS ───────────────────────────────────────────────
    const statusWs = new WebSocket(`${wsUrl}/ws/status`);
    statusWs.onopen = () => {
      set({ connected: true });
      statusWs.send('ping');
    };
    statusWs.onclose = () => set({ connected: false });
    statusWs.onerror = () => set({ connected: false });
    statusWs.onmessage = (ev) => {
      try {
        const data = JSON.parse(ev.data);
        const patch = {};
        if (data.pose) patch.pose = data.pose;
        if (data.joint_positions) patch.jointPositions = data.joint_positions;
        if (data.nav_feedback) patch.navFeedback = data.nav_feedback;
        if (typeof data.navigation_running === 'boolean') patch.navigationRunning = data.navigation_running;
        if ('nav_plan' in data) patch.navPlan = data.nav_plan ?? null;
        if (typeof data.urdf_version === 'number') {
          const prev = get().urdfVersion;
          if (data.urdf_version !== prev) patch.urdfVersion = data.urdf_version;
        }
        if (Object.keys(patch).length) set(patch);
      } catch { /* ignore */ }
    };

    // ── PointCloud WS ────────────────────────────────────────────
    const pcWs = new WebSocket(`${wsUrl}/ws/pointcloud`);
    pcWs.binaryType = 'arraybuffer';
    pcWs.onopen = () => pcWs.send('ping');
    pcWs.onmessage = (ev) => {
      if (!(ev.data instanceof ArrayBuffer)) return;
      const bytes = new Uint8Array(ev.data);
      let nl = -1;
      for (let i = 0; i < bytes.length; i++) {
        if (bytes[i] === 10) { nl = i; break; }
      }
      if (nl < 0) return;
      const header = JSON.parse(new TextDecoder().decode(bytes.slice(0, nl)));
      // Store raw buffer in the shared ref — bypasses Zustand for perf
      pointsRef.current = new Float32Array(ev.data, nl + 1);
      set({ pointCount: header.count, pointCloudHeader: header });
    };

    set({ _statusWs: statusWs, _pcWs: pcWs });
  },

  disconnectWS: () => {
    const { _statusWs, _pcWs } = get();
    if (_statusWs) _statusWs.close();
    if (_pcWs) _pcWs.close();
    set({ _statusWs: null, _pcWs: null, connected: false });
  },
}));

/**
 * Raw point cloud buffer — stored as a plain ref outside Zustand to avoid
 * triggering React re-renders on every point cloud frame (up to 20 Hz).
 * The R3F canvas reads this directly each frame.
 */
export const pointsRef = { current: null };
```

---

## `frontend/src/canvas/SceneCanvas.jsx`

```jsx
/**
 * Layer 3 – 3D Canvas: R3F root canvas.
 *
 * FIX: Canvas is NEVER remounted (no key={viewMode}).
 * CameraRig uses useThree() to smoothly transition between top/3D cameras.
 * GroundPlaneHitTarget handles waypoint placement via R3F pointer events.
 * CrosshairMarker shows a 3D aim ring when addMode is active.
 */
import React, { useRef, useEffect } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, Grid } from '@react-three/drei';
import * as THREE from 'three';
import { useRobotStore } from '../store/useRobotStore';
import PointCloud from './PointCloud';
import RobotModel from './RobotModel';
import WaypointMarkers from './WaypointMarkers';
import NavPlanLine from './NavPlanLine';

const DRAG_THRESHOLD_PX = 12;

// Shared module-level ref — tracks latest ground intersection for crosshair.
// Pattern mirrors pointsRef: plain object avoids React overhead.
const crosshairPos = { current: new THREE.Vector3() };

// Target camera positions per view mode
const CAM_PRESETS = {
  top: {
    position: new THREE.Vector3(0, 0, 22),
    up: new THREE.Vector3(0, 1, 0),
    enableRotate: false,
  },
  '3d': {
    position: new THREE.Vector3(10, -14, 9),
    up: new THREE.Vector3(0, 0, 1),
    enableRotate: true,
  },
};

/**
 * CameraRig — lives inside <Canvas>, uses useThree() to smoothly lerp
 * the camera between top-down and perspective presets without tearing down
 * the WebGL context. OrbitControls must have makeDefault={true}.
 */
function CameraRig() {
  const viewMode = useRobotStore((s) => s.viewMode);
  const { camera, controls } = useThree();
  const targetPos = useRef(new THREE.Vector3().copy(CAM_PRESETS.top.position));
  const lerpAlpha = useRef(0);

  useEffect(() => {
    const preset = CAM_PRESETS[viewMode] ?? CAM_PRESETS.top;
    targetPos.current.copy(preset.position);
    camera.up.copy(preset.up);
    lerpAlpha.current = 0;

    if (controls) {
      controls.enableRotate = preset.enableRotate;
      controls.target.set(0, 0, 0);
      controls.update();
    }
  }, [viewMode, camera, controls]);

  useFrame((_, delta) => {
    lerpAlpha.current = Math.min(lerpAlpha.current + delta * 4, 1);
    camera.position.lerp(targetPos.current, lerpAlpha.current * 0.2 + 0.02);
    if (controls) controls.update();
  });

  return null;
}

/**
 * Invisible ground plane mesh (Z=0) for waypoint hit-testing.
 * Also updates crosshairPos for the CrosshairMarker to follow.
 */
function GroundPlaneHitTarget() {
  const addMode = useRobotStore((s) => s.addMode);
  const viewMode = useRobotStore((s) => s.viewMode);
  const addWaypoint = useRobotStore((s) => s.addWaypoint);

  const pendingWp = useRef(null);
  const pointerDownScreen = useRef(null);

  function handlePointerMove(e) {
    if (!addMode) return;
    crosshairPos.current.set(e.point.x, e.point.y, 0);
  }

  function handlePointerDown(e) {
    if (!addMode) return;
    e.stopPropagation();
    pointerDownScreen.current = {
      x: e.nativeEvent?.clientX ?? 0,
      y: e.nativeEvent?.clientY ?? 0,
    };
    pendingWp.current = { x: e.point.x, y: e.point.y, z: 0, yaw: 0 };
  }

  function handlePointerUp(e) {
    if (!addMode || !pendingWp.current) return;
    e.stopPropagation();
    const down = pointerDownScreen.current;
    pointerDownScreen.current = null;
    const wp = { ...pendingWp.current };
    pendingWp.current = null;

    const cx = e.nativeEvent?.clientX ?? 0;
    const cy = e.nativeEvent?.clientY ?? 0;
    const dragDist = down ? Math.hypot(cx - down.x, cy - down.y) : 0;

    if (viewMode === '3d' && dragDist > DRAG_THRESHOLD_PX) return;

    const dx = e.point.x - wp.x;
    const dy = e.point.y - wp.y;
    if (Math.hypot(dx, dy) > 0.08) wp.yaw = Math.atan2(dy, dx);

    addWaypoint({ x: wp.x, y: wp.y, z: 0, yaw: wp.yaw });
  }

  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, 0, 0]}
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      visible={false}
      renderOrder={-1}
    >
      <planeGeometry args={[500, 500]} />
      <meshBasicMaterial side={THREE.DoubleSide} transparent opacity={0} />
    </mesh>
  );
}

/**
 * 3D aim ring that appears only in addMode.
 * Follows the cursor's ground-plane intersection via crosshairPos ref — no React re-renders.
 * Uses getState() in useFrame to read addMode without subscribing.
 */
function CrosshairMarker() {
  const addMode = useRobotStore((s) => s.addMode);
  const groupRef = useRef(null);

  useFrame(() => {
    if (!groupRef.current) return;
    const active = useRobotStore.getState().addMode;
    groupRef.current.visible = active;
    if (!active) return;
    const p = crosshairPos.current;
    groupRef.current.position.set(p.x, p.y, 0.015);
  });

  // Keep mesh in scene graph always — visibility controlled by useFrame above.
  // Subscribing to addMode here only to force a proper initial render;
  // subsequent changes are handled imperatively in useFrame with no re-render.
  return (
    <group ref={groupRef} visible={addMode}>
      {/* Outer ring */}
      <mesh>
        <torusGeometry args={[0.38, 0.022, 8, 48]} />
        <meshBasicMaterial color="#2d8f9e" transparent opacity={0.9} depthTest={false} />
      </mesh>
      {/* Horizontal bar */}
      <mesh>
        <boxGeometry args={[0.65, 0.014, 0.001]} />
        <meshBasicMaterial color="#2d8f9e" transparent opacity={0.75} depthTest={false} />
      </mesh>
      {/* Vertical bar */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.65, 0.014, 0.001]} />
        <meshBasicMaterial color="#2d8f9e" transparent opacity={0.75} depthTest={false} />
      </mesh>
      {/* Centre dot */}
      <mesh>
        <circleGeometry args={[0.055, 16]} />
        <meshBasicMaterial color="#a7f3d0" depthTest={false} />
      </mesh>
    </group>
  );
}

export default function SceneCanvas() {
  // Subscribing here only to toggle CSS cursor class — addMode changes rarely
  const addMode = useRobotStore((s) => s.addMode);

  return (
    <div className={`viewer${addMode ? ' add-mode' : ''}`}>
      <Canvas
        camera={{ position: [0, 0, 22], up: [0, 1, 0], fov: 60, near: 0.05, far: 2000 }}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => {
          gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        }}
      >
        <color attach="background" args={['#101418']} />

        <hemisphereLight args={[0xffffff, 0x222222, 1.2]} />
        <directionalLight position={[5, 5, 20]} intensity={0.35} />

        <Grid
          args={[80, 80]}
          rotation={[Math.PI / 2, 0, 0]}
          cellColor="#1e2a38"
          sectionColor="#2a3f56"
          sectionSize={5}
          fadeDistance={80}
          infiniteGrid
        />

        <axesHelper args={[1.5]} />

        <CameraRig />
        <GroundPlaneHitTarget />
        <CrosshairMarker />

        <RobotModel />
        <PointCloud />
        <WaypointMarkers />
        <NavPlanLine />

        <OrbitControls
          makeDefault
          enableDamping
          dampingFactor={0.08}
          screenSpacePanning
          target={[0, 0, 0]}
        />
      </Canvas>
    </div>
  );
}
```

---

## `frontend/src/canvas/PointCloud.jsx`

```jsx
/**
 * Layer 3 – 3D Canvas: Live point cloud renderer.
 *
 * Performance contract:
 *   - No React re-renders from incoming point cloud frames (raw data via pointsRef)
 *   - No React re-renders from pose updates (read via getState() in useFrame)
 *   - GPU buffer pre-allocated at MAX_POINTS — never reallocated; setDrawRange controls what's drawn
 *   - Partial GPU upload via updateRange (only the changed region is re-uploaded each frame)
 */
import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useRobotStore, pointsRef } from '../store/useRobotStore';

const MAX_POINTS = 150_000;

export default function PointCloud() {
  // Only subscribe to header — changes at config time, not every frame
  const pointCloudHeader = useRobotStore((s) => s.pointCloudHeader);
  // NOTE: pose is intentionally NOT subscribed here.
  //       Reading via getState() inside useFrame() avoids ~10 React re-renders/sec.

  const geomRef  = useRef(null);
  const groupRef = useRef(null);

  // Pre-allocated backing buffer — lives for the lifetime of this component.
  // Three.js BufferAttribute shares this array reference; we write into it each frame.
  const preBuf = useRef(new Float32Array(MAX_POINTS * 3));

  const inRobotFrame = pointCloudHeader?.in_robot_frame === true;

  // Initialise draw range to 0 so nothing renders before first WS frame
  useEffect(() => {
    if (geomRef.current) geomRef.current.setDrawRange(0, 0);
  }, []);

  useFrame(() => {
    const pts = pointsRef.current;
    const geom = geomRef.current;
    if (!pts || !geom) return;

    const count = Math.min(pointCloudHeader?.count ?? 0, MAX_POINTS);
    if (count === 0) return;

    const floats = count * 3;

    // Write incoming data into the pre-allocated buffer (zero extra allocation)
    preBuf.current.set(pts.subarray(0, floats));

    // Partial GPU upload — only re-upload the live region, not the full MAX_POINTS buffer
    const attr = geom.attributes.position;
    attr.updateRange.offset = 0;
    attr.updateRange.count  = floats;
    attr.needsUpdate = true;
    geom.setDrawRange(0, count);
    geom.computeBoundingSphere();

    // Robot-frame transform: apply directly to group, bypassing React reconciler
    if (inRobotFrame && groupRef.current) {
      const p = useRobotStore.getState().pose;
      if (p) {
        groupRef.current.position.set(p.x, p.y, p.z ?? 0);
        groupRef.current.quaternion.set(p.qx ?? 0, p.qy ?? 0, p.qz ?? 0, p.qw ?? 1);
      }
    }
  });

  return (
    <group ref={groupRef}>
      <points frustumCulled={false}>
        <bufferGeometry ref={geomRef}>
          <bufferAttribute
            attach="attributes-position"
            args={[preBuf.current, 3]}
            usage={THREE.DynamicDrawUsage}
          />
        </bufferGeometry>
        <pointsMaterial size={0.045} color="#a7f3d0" sizeAttenuation />
      </points>
    </group>
  );
}
```

---

## `frontend/src/canvas/RobotModel.jsx`

```jsx
/**
 * Layer 3 – 3D Canvas: Animated robot model.
 *
 * Loads URDF from /api/robot_description, applies joint angles from
 * the status WS on each frame. Falls back to a placeholder box while loading.
 */
import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import URDFLoader from 'urdf-loader';
import { useRobotStore } from '../store/useRobotStore';

export default function RobotModel() {
  const pose = useRobotStore((s) => s.pose);
  const jointPositions = useRobotStore((s) => s.jointPositions);
  const urdfVersion = useRobotStore((s) => s.urdfVersion);
  const backendUrl = useRobotStore((s) => s.backendUrl);
  const setUrdfStatus = useRobotStore((s) => s.setUrdfStatus);

  const groupRef = useRef(null);
  const urdfRobotRef = useRef(null);
  const [urdfLoaded, setUrdfLoaded] = useState(false);

  // Apply pose every frame from latest store value (avoids re-render on pose change)
  useFrame(() => {
    const g = groupRef.current;
    const p = useRobotStore.getState().pose;
    if (!g || !p) return;
    g.position.set(p.x, p.y, p.z ?? 0);
    g.quaternion.set(p.qx, p.qy, p.qz, p.qw);
  });

  // Apply joint positions whenever they change
  useEffect(() => {
    const robot = urdfRobotRef.current;
    if (!robot?.joints || !jointPositions) return;
    for (const [name, value] of Object.entries(jointPositions)) {
      robot.joints[name]?.setJointValue(Number(value));
    }
  }, [jointPositions]);

  // Load / reload URDF when version changes
  useEffect(() => {
    let cancelled = false;
    setUrdfStatus('fetching…');

    async function load() {
      try {
        const res = await fetch(`${backendUrl.replace(/\/$/, '')}/api/robot_description`);
        if (!res.ok) { setUrdfStatus(`HTTP ${res.status}`); return; }
        const data = await res.json();
        const xml = data.robot_description ?? '';
        if (cancelled || xml.length < 80) {
          setUrdfStatus(xml ? 'empty' : 'no URDF');
          return;
        }

        const manager = new THREE.LoadingManager();
        const packages = {};
        const pkgRe = /package:\/\/([^/]+)\//g;
        let m;
        while ((m = pkgRe.exec(xml))) {
          const pkg = m[1];
          packages[pkg] = `${backendUrl.replace(/\/$/, '')}/api/pkg/${pkg}/`;
        }

        const loader = new URDFLoader(manager);
        loader.packages = packages;

        let meshCount = 0;
        manager.onLoad = () => {
          if (cancelled) return;
          robot.traverse((c) => {
            if (!c.isMesh) return;
            meshCount++;
            c.frustumCulled = false;
            const mats = Array.isArray(c.material) ? c.material : [c.material];
            mats.forEach((mat) => {
              if (!mat) return;
              mat.side = THREE.DoubleSide;
              if ('emissive' in mat) mat.emissive?.setHex(0x2a2a2a);
              mat.needsUpdate = true;
            });
          });
          setUrdfStatus(meshCount > 0 ? `OK (${meshCount} meshes)` : 'OK (0 meshes)');
          setUrdfLoaded(true);
        };

        const robot = loader.parse(xml);

        if (cancelled) return;

        // Dispose old model
        const g = groupRef.current;
        if (g) {
          g.children.slice().forEach((child) => {
            g.remove(child);
            child.traverse((obj) => {
              obj.geometry?.dispose();
              const mat = obj.material;
              if (mat) Array.isArray(mat) ? mat.forEach((m) => m.dispose()) : mat.dispose();
            });
          });
          g.add(robot);
        }
        urdfRobotRef.current = robot;
      } catch (e) {
        if (!cancelled) setUrdfStatus(`error: ${e.message}`);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [backendUrl, urdfVersion]);

  return (
    <group ref={groupRef}>
      {!urdfLoaded && <PlaceholderRobot />}
    </group>
  );
}

function PlaceholderRobot() {
  return (
    <group>
      <mesh position={[0, 0, 0.35]}>
        <boxGeometry args={[1.1, 0.55, 0.35]} />
        <meshStandardMaterial color="#4cc9f0" roughness={0.35} />
      </mesh>
      <mesh position={[0.72, 0, 0.35]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[0.18, 0.35, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
    </group>
  );
}
```

---

## `frontend/src/canvas/WaypointMarkers.jsx`

```jsx
/**
 * Layer 3 – 3D Canvas: Numbered arrow markers for each waypoint.
 * Re-renders only when the waypoints array changes.
 */
import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useRobotStore } from '../store/useRobotStore';

function ArrowMarker({ index, x, y, yaw }) {
  const labelTex = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgba(20,20,20,0.8)';
    ctx.beginPath();
    ctx.arc(64, 64, 42, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'white';
    ctx.font = 'bold 54px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(String(index + 1), 64, 68);
    return new THREE.CanvasTexture(canvas);
  }, [index]);

  return (
    <group position={[x, y, 0.05]} rotation={[0, 0, yaw]}>
      {/* Arrow cone */}
      <mesh position={[0.22, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.18, 0.45, 24]} />
        <meshBasicMaterial color="#ffcc00" />
      </mesh>
      {/* Ring */}
      <mesh>
        <torusGeometry args={[0.28, 0.025, 8, 32]} />
        <meshBasicMaterial color="#ffcc00" />
      </mesh>
      {/* Number label sprite */}
      <sprite position={[0, 0, 0.55]} scale={[0.55, 0.55, 0.55]}>
        <spriteMaterial map={labelTex} depthTest={false} />
      </sprite>
    </group>
  );
}

export default function WaypointMarkers() {
  const waypoints = useRobotStore((s) => s.waypoints);

  return (
    <>
      {waypoints.map((wp, i) => (
        <ArrowMarker key={`wp-${i}-${wp.x}-${wp.y}`} index={i} x={wp.x} y={wp.y} yaw={wp.yaw ?? 0} />
      ))}
    </>
  );
}
```

---

## `frontend/src/canvas/NavPlanLine.jsx`

```jsx
/**
 * Layer 3 – 3D Canvas: Nav2 global plan path line.
 *
 * Uses <primitive object={THREE.Line}> instead of <line> / <line_> JSX tags.
 * <line> conflicts with SVG in React's reconciler; <line_> is a dead R3F legacy alias.
 * <primitive> is unambiguous and works across all R3F versions.
 */
import { useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { useRobotStore } from '../store/useRobotStore';

export default function NavPlanLine() {
  const navPlan = useRobotStore((s) => s.navPlan);

  // Create THREE.Line once — geometry updated imperatively in useEffect
  const lineObj = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    const mat  = new THREE.LineBasicMaterial({ color: '#22d3ee', transparent: true, opacity: 0.95 });
    const l = new THREE.Line(geom, mat);
    l.frustumCulled = false;
    l.renderOrder   = 2;
    l.visible       = false;
    return l;
  }, []);

  useEffect(() => {
    const pts = navPlan?.points;
    if (!pts || pts.length < 2) {
      lineObj.visible = false;
      return;
    }

    const positions = new Float32Array(pts.length * 3);
    for (let i = 0; i < pts.length; i++) {
      positions[i * 3]     = pts[i].x;
      positions[i * 3 + 1] = pts[i].y;
      positions[i * 3 + 2] = (pts[i].z ?? 0) + 0.04; // lift off ground to avoid z-fighting
    }

    const existing = lineObj.geometry.attributes.position;
    if (existing && existing.array.length === positions.length) {
      existing.array.set(positions);
      existing.needsUpdate = true;
    } else {
      lineObj.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    }
    lineObj.geometry.computeBoundingSphere();
    lineObj.visible = true;
  }, [navPlan, lineObj]);

  return <primitive object={lineObj} />;
}
```

---

## `frontend/src/components/Toolbar.jsx`

```jsx
/**
 * Layer 1 – UI: Top toolbar.
 * Logo mark, backend URL input, connection pill, dashboard link.
 */
import React from 'react';
import { useRobotStore } from '../store/useRobotStore';

export default function Toolbar() {
  const backendUrl = useRobotStore((s) => s.backendUrl);
  const connected  = useRobotStore((s) => s.connected);
  const setBackendUrl = useRobotStore((s) => s.setBackendUrl);
  const connectWS     = useRobotStore((s) => s.connectWS);

  return (
    <div className="toolbar">
      {/* Logo */}
      <div className="toolbar-logo">
        <div className="toolbar-logo-mark">B2</div>
        <div>
          <div className="toolbar-logo-name">Web RViz</div>
          <div className="toolbar-logo-sub">Unitree B2 · ROS 2</div>
        </div>
      </div>

      <div className="toolbar-sep" />

      {/* Backend URL */}
      <div className="toolbar-field">
        <span>Gateway</span>
        <input
          value={backendUrl}
          onChange={(e) => setBackendUrl(e.target.value)}
          onBlur={() => connectWS()}
          onKeyDown={(e) => e.key === 'Enter' && connectWS()}
          placeholder="http://192.168.x.x:8080"
          spellCheck={false}
        />
      </div>

      <div className="toolbar-actions">
        {/* Connection status pill */}
        <div className={`conn-pill ${connected ? 'connected' : 'disconnected'}`}>
          <div className="conn-dot" />
          {connected ? 'online' : 'offline'}
        </div>

        <a className="toolbar-link" href="/" title="Back to HMI dashboard">
          ≡ Dashboard
        </a>
      </div>
    </div>
  );
}
```

---

## `frontend/src/components/ControlPanel.jsx`

```jsx
/**
 * Layer 1 – UI: Right-side control panel.
 * Industrial HMI card layout with collapsible sections.
 */
import React, { useEffect, useState } from 'react';
import { useRobotStore } from '../store/useRobotStore';
import WaypointList from './WaypointList';
import StreamSettings from './StreamSettings';
import CameraFeed from './CameraFeed';

// ── Small helper: collapsible card wrapper ──────────────────────────────────
function Section({ title, dotColor = 'var(--accent)', defaultOpen = true, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="card">
      <div className="card-header" onClick={() => setOpen((o) => !o)}>
        <div className="card-header-dot" style={{ background: dotColor }} />
        <span className="card-title">{title}</span>
        <span className={`card-chevron ${open ? 'open' : ''}`}>▼</span>
      </div>
      {open && <div className="card-body">{children}</div>}
    </div>
  );
}

// ── Nav feedback structured display ─────────────────────────────────────────
function NavStatus({ feedback, running, waypointTotal }) {
  if (!feedback) return <span className="badge badge-dim">idle</span>;

  const state = feedback.state ?? 'unknown';
  const badgeClass =
    state === 'running'        ? 'badge-accent' :
    state === 'finished'       ? 'badge-ok' :
    state === 'canceled'       ? 'badge-warn' :
    state === 'error'          ? 'badge-alarm' : 'badge-dim';

  const currentWp  = feedback.current_waypoint ?? null;
  const progress   = (waypointTotal > 0 && currentWp !== null)
    ? ((currentWp + 1) / waypointTotal) * 100 : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div className="data-row">
        <span className="data-label">State</span>
        <span className={`badge ${badgeClass}`}>{state.toUpperCase()}</span>
      </div>

      {state === 'running' && waypointTotal > 0 && (
        <div className="nav-progress">
          <div className="data-row">
            <span className="data-label">Waypoint</span>
            <span className="data-value accent">
              {currentWp !== null ? `${currentWp + 1} / ${waypointTotal}` : '—'}
            </span>
          </div>
          <div className="nav-progress-bar-wrap">
            <div className="nav-progress-bar" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      {feedback.round != null && (
        <div className="data-row">
          <span className="data-label">Round</span>
          <span className="data-value">
            {feedback.round}{feedback.repeat_count > 0 ? ` / ${feedback.repeat_count}` : ' (∞)'}
          </span>
        </div>
      )}

      {feedback.message && (
        <div className="msg-box error" style={{ fontSize: 10 }}>{feedback.message}</div>
      )}
    </div>
  );
}

// ── Main Panel ───────────────────────────────────────────────────────────────
export default function ControlPanel({ panelOpen = true }) {
  const pose            = useRobotStore((s) => s.pose);
  const urdfStatus      = useRobotStore((s) => s.urdfStatus);
  const pointCount      = useRobotStore((s) => s.pointCount);
  const navFeedback     = useRobotStore((s) => s.navFeedback);
  const navPlan         = useRobotStore((s) => s.navPlan);
  const navigationRunning = useRobotStore((s) => s.navigationRunning);
  const repeatCount     = useRobotStore((s) => s.repeatCount);
  const viewMode        = useRobotStore((s) => s.viewMode);
  const addMode         = useRobotStore((s) => s.addMode);
  const message         = useRobotStore((s) => s.message);
  const error           = useRobotStore((s) => s.error);
  const waypoints       = useRobotStore((s) => s.waypoints);
  const backendUrl      = useRobotStore((s) => s.backendUrl);

  const setViewMode         = useRobotStore((s) => s.setViewMode);
  const setAddMode          = useRobotStore((s) => s.setAddMode);
  const setRepeatCount      = useRobotStore((s) => s.setRepeatCount);
  const setMessage          = useRobotStore((s) => s.setMessage);
  const setError            = useRobotStore((s) => s.setError);
  const setWaypoints        = useRobotStore((s) => s.setWaypoints);
  const removeLastWaypoint  = useRobotStore((s) => s.removeLastWaypoint);
  const setLiveCfg          = useRobotStore((s) => s.setLiveCfg);

  // Load initial config on mount
  useEffect(() => {
    let cancelled = false;
    fetch(`${backendUrl.replace(/\/$/, '')}/api/config`)
      .then((r) => r.ok ? r.json() : null)
      .then((cfg) => { if (!cancelled && cfg) setLiveCfg(cfg); })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [backendUrl]);

  const api = (path, opts) =>
    fetch(`${backendUrl.replace(/\/$/, '')}${path}`, opts);

  async function startNavigation() {
    try {
      const syncRes = await api('/api/waypoints', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ waypoints }),
      });
      if (!syncRes.ok) throw new Error(await syncRes.text());

      const rc = Number.isFinite(Number(repeatCount)) ? Number(repeatCount) : 1;
      const res = await api('/api/navigation/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ repeat_count: rc }),
      });
      if (!res.ok) throw new Error(await res.text());
      setMessage('Navigation started');
      setError('');
    } catch (e) {
      setError(`Start failed: ${e.message}`);
    }
  }

  async function cancelNavigation() {
    try {
      const res = await api('/api/navigation/cancel', { method: 'POST' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setMessage('Cancelled');
      setError('');
    } catch (e) {
      setError(`Cancel: ${e.message}`);
    }
  }

  async function clearWaypoints() {
    setWaypoints([]);
    await api('/api/navigation/clear', { method: 'POST' });
  }

  const poseStr = pose
    ? `${Number(pose.x).toFixed(2)}, ${Number(pose.y).toFixed(2)}`
    : '—';
  const yawStr = pose
    ? `${((pose.yaw * 180) / Math.PI).toFixed(1)}°`
    : '—';
  const urdfOk = urdfStatus.startsWith('OK');

  return (
    <div className={`panel ${panelOpen ? 'open' : ''}`}>
      <div className="panel-scroll">

        {/* ── View Control ───────────────────────────── */}
        <Section title="View" defaultOpen>
          <div className="view-toggle">
            <button
              type="button"
              className={`view-toggle-btn ${viewMode === 'top' ? 'active' : ''}`}
              onClick={() => setViewMode('top')}
            >
              ⊞ Top
            </button>
            <button
              type="button"
              className={`view-toggle-btn ${viewMode === '3d' ? 'active' : ''}`}
              onClick={() => setViewMode('3d')}
            >
              ◈ 3D
            </button>
          </div>

          <label className="check-row">
            <input
              type="checkbox"
              checked={addMode}
              onChange={(e) => setAddMode(e.target.checked)}
            />
            Waypoint placement mode
          </label>
          <p className="hint">Click map to place · drag to set heading</p>
        </Section>

        {/* ── Robot Status ───────────────────────────── */}
        <Section title="Robot Status" dotColor="var(--ok)">
          <div className="data-row">
            <span className="data-label">Position</span>
            <span className="data-value">{poseStr}</span>
          </div>
          <div className="data-row">
            <span className="data-label">Yaw</span>
            <span className="data-value accent">{yawStr}</span>
          </div>
          <div className="data-row">
            <span className="data-label">URDF</span>
            <span className={`badge ${urdfOk ? 'badge-ok' : 'badge-dim'}`}>
              {urdfOk ? 'Loaded' : urdfStatus}
            </span>
          </div>
          <div className="data-row">
            <span className="data-label">Cloud pts</span>
            <span className="data-value">{pointCount.toLocaleString()}</span>
          </div>
          {navPlan && (
            <div className="data-row">
              <span className="data-label">Plan</span>
              <span className="data-value accent">{navPlan.count} pts</span>
            </div>
          )}
        </Section>

        {/* ── Camera Feed ────────────────────────────── */}
        <Section title="Camera" dotColor="var(--alarm)" defaultOpen>
          <CameraFeed />
        </Section>

        {/* ── Navigation ─────────────────────────────── */}
        <Section title="Navigation" dotColor="var(--accent)" defaultOpen>
          {/* Waypoint list */}
          <WaypointList />

          {/* Repeat rounds input */}
          <div className="label-field">
            <span className="label-field-label">Repeat rounds (−1 = ∞)</span>
            <input
              type="number"
              value={repeatCount}
              onChange={(e) => setRepeatCount(e.target.value)}
              min="-1"
            />
          </div>

          {/* Action buttons */}
          <div className="action-row">
            <button
              type="button"
              className="btn btn-primary"
              onClick={startNavigation}
              disabled={navigationRunning || waypoints.length === 0}
              style={{ flex: 1 }}
            >
              ▶ Start
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={cancelNavigation}
              disabled={!navigationRunning}
            >
              ■ Stop
            </button>
          </div>

          <div className="action-row">
            <button type="button" className="btn btn-sm" onClick={removeLastWaypoint}
              disabled={waypoints.length === 0}>
              ↩ Undo
            </button>
            <button type="button" className="btn btn-sm" onClick={clearWaypoints}
              disabled={waypoints.length === 0}>
              ✕ Clear
            </button>
          </div>

          {/* Nav status */}
          <NavStatus
            feedback={navFeedback}
            running={navigationRunning}
            waypointTotal={waypoints.length}
          />

          {/* Messages */}
          {message && <div className="msg-box success">{message}</div>}
          {error    && <div className="msg-box error">{error}</div>}
        </Section>

        {/* ── Stream Settings (collapsible, closed by default) ── */}
        <StreamSettings />

      </div>
    </div>
  );
}
```

---

## `frontend/src/components/WaypointList.jsx`

```jsx
/**
 * Layer 1 – UI: Waypoint card list with per-item delete.
 */
import React from 'react';
import { useRobotStore } from '../store/useRobotStore';

function deg(rad) { return ((rad * 180) / Math.PI).toFixed(0); }
function fmt(n)   { return Number(n).toFixed(2); }

export default function WaypointList() {
  const waypoints    = useRobotStore((s) => s.waypoints);
  const setWaypoints = useRobotStore((s) => s.setWaypoints);

  if (waypoints.length === 0) {
    return <p className="wp-empty">Click on the map to add waypoints</p>;
  }

  function remove(idx) {
    setWaypoints(waypoints.filter((_, i) => i !== idx));
  }

  return (
    <div className="wp-list">
      {waypoints.map((wp, i) => (
        <div key={`${i}-${wp.x}-${wp.y}`} className="wp-card">
          <div className="wp-index">{i + 1}</div>

          <div className="wp-data">
            <div className="wp-field">
              <span className="wp-field-label">X</span>
              <span className="wp-field-value">{fmt(wp.x)}</span>
            </div>
            <div className="wp-field">
              <span className="wp-field-label">Y</span>
              <span className="wp-field-value">{fmt(wp.y)}</span>
            </div>
            <div className="wp-field">
              <span className="wp-field-label">Yaw</span>
              <span className="wp-field-value">{deg(wp.yaw ?? 0)}°</span>
            </div>
          </div>

          <button
            className="wp-delete"
            onClick={() => remove(i)}
            title="Remove waypoint"
            type="button"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
```

---

## `frontend/src/components/CameraFeed.jsx`

```jsx
/**
 * Layer 1 – UI: MJPEG camera feed with snapshot capture.
 *
 * Displays the RTSP→MJPEG stream from /api/video_feed.
 * Snapshot: draws the current <img> frame to a hidden <canvas>
 *           then triggers a browser download — no backend round-trip.
 */
import React, { useRef, useState } from 'react';
import { useRobotStore } from '../store/useRobotStore';

export default function CameraFeed() {
  const backendUrl = useRobotStore((s) => s.backendUrl);
  const imgRef    = useRef(null);
  const canvasRef = useRef(null);
  const [error, setError]       = useState(false);
  const [capturing, setCapturing] = useState(false);

  const feedUrl = `${backendUrl.replace(/\/$/, '')}/api/video_feed`;

  function handleImgError() { setError(true); }
  function handleImgLoad()  { setError(false); }

  function captureSnapshot() {
    const img    = imgRef.current;
    const canvas = canvasRef.current;
    if (!img || !canvas || capturing) return;

    setCapturing(true);
    try {
      // Draw current frame into hidden canvas
      canvas.width  = img.naturalWidth  || 320;
      canvas.height = img.naturalHeight || 240;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Trigger download
      canvas.toBlob(
        (blob) => {
          if (!blob) return;
          const url = URL.createObjectURL(blob);
          const a   = document.createElement('a');
          a.href     = url;
          a.download = `b2_snapshot_${new Date().toISOString().replace(/[:.]/g, '-')}.jpg`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        },
        'image/jpeg',
        0.95,
      );
    } catch (e) {
      console.warn('Snapshot failed (CORS?):', e);
    } finally {
      setTimeout(() => setCapturing(false), 800);
    }
  }

  return (
    <div className="camera-feed-wrap">
      {error ? (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          gap: 6,
          background: '#0a0d10',
          color: 'var(--text-muted)',
          fontSize: 11,
          fontFamily: 'var(--font-mono)',
        }}>
          <span style={{ fontSize: 22 }}>📷</span>
          <span>Stream unavailable</span>
          <button
            className="btn btn-sm"
            onClick={() => { setError(false); }}
            type="button"
          >
            Retry
          </button>
        </div>
      ) : (
        <img
          ref={imgRef}
          src={feedUrl}
          alt="Robot camera feed"
          className="camera-feed-img"
          crossOrigin="anonymous"
          onError={handleImgError}
          onLoad={handleImgLoad}
        />
      )}

      {/* Live badge + timestamp */}
      <div className="camera-feed-top">
        <div className="camera-feed-badge">
          <div className="camera-live-dot" />
          LIVE
        </div>
        <div className="camera-feed-badge" style={{ fontSize: 8 }}>
          FRONT CAM
        </div>
      </div>

      {/* Snapshot button overlay */}
      <div className="camera-feed-overlay">
        <button
          className="camera-capture-btn"
          onClick={captureSnapshot}
          disabled={capturing || error}
          type="button"
        >
          {capturing ? '⏳ Saving…' : '📸 Capture Snapshot'}
        </button>
      </div>

      {/* Hidden canvas for snapshot encoding */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
}
```

---

## `frontend/src/components/StreamSettings.jsx`

```jsx
/**
 * Layer 1 – UI: Collapsible stream parameter controls.
 * Debounced POST to /api/config (250 ms trailing edge).
 */
import React, { useRef, useState } from 'react';
import { useRobotStore } from '../store/useRobotStore';

function SliderRow({ label, value, min, max, step, unit = '', onChange }) {
  return (
    <div className="slider-row">
      <div className="slider-header">
        <span className="slider-label">{label}</span>
        <span className="slider-value">{value}{unit}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={onChange} />
    </div>
  );
}

export default function StreamSettings() {
  const liveCfg = useRobotStore((s) => s.liveCfg);
  const setLiveCfg = useRobotStore((s) => s.setLiveCfg);
  const setError   = useRobotStore((s) => s.setError);
  const backendUrl = useRobotStore((s) => s.backendUrl);

  const [open, setOpen] = useState(false);
  const pendingRef = useRef({});
  const timerRef   = useRef(null);

  function push(partial) {
    setLiveCfg({ ...liveCfg, ...partial });
    Object.assign(pendingRef.current, partial);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(async () => {
      const body = pendingRef.current;
      pendingRef.current = {};
      try {
        const res = await fetch(`${backendUrl.replace(/\/$/, '')}/api/config`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        setLiveCfg(await res.json());
        setError('');
      } catch (e) {
        setError(`Config: ${e.message}`);
      }
    }, 250);
  }

  return (
    <div className="card">
      <div className="card-header" onClick={() => setOpen((o) => !o)}>
        <div className="card-header-dot" style={{ background: 'var(--warn)' }} />
        <span className="card-title">Stream Settings</span>
        <span className={`card-chevron ${open ? 'open' : ''}`}>▼</span>
      </div>

      {open && (
        <div className="card-body">
          {!liveCfg ? (
            <p className="hint">Loading config…</p>
          ) : (
            <>
              <SliderRow
                label="Pointcloud rate"
                value={Number(liveCfg.pointcloud_rate_hz ?? 5).toFixed(1)}
                min="0.5" max="20" step="0.5" unit=" Hz"
                onChange={(e) => push({ pointcloud_rate_hz: Number(e.target.value) })}
              />
              <SliderRow
                label="Max points"
                value={(liveCfg.max_points ?? 80000).toLocaleString()}
                min="5000" max="200000" step="5000"
                onChange={(e) => push({ max_points: Number(e.target.value) })}
              />
              <SliderRow
                label="Range limit"
                value={Number(liveCfg.pointcloud_range_limit ?? 40).toFixed(0)}
                min="1" max="100" step="1" unit=" m"
                onChange={(e) => push({ pointcloud_range_limit: Number(e.target.value) })}
              />

              <div className="input-row">
                <div className="label-field">
                  <span className="label-field-label">Z min (m)</span>
                  <input type="number" step="0.1"
                    value={liveCfg.pointcloud_z_min ?? -3}
                    onChange={(e) => push({ pointcloud_z_min: Number(e.target.value) })} />
                </div>
                <div className="label-field">
                  <span className="label-field-label">Z max (m)</span>
                  <input type="number" step="0.1"
                    value={liveCfg.pointcloud_z_max ?? 3}
                    onChange={(e) => push({ pointcloud_z_max: Number(e.target.value) })} />
                </div>
              </div>

              <label className="check-row">
                <input type="checkbox"
                  checked={Boolean(liveCfg.pointcloud_in_robot_frame)}
                  onChange={(e) => push({ pointcloud_in_robot_frame: e.target.checked })} />
                Cloud in robot frame
              </label>

              <label className="check-row">
                <input type="checkbox"
                  checked={Boolean(liveCfg.transform_pointcloud)}
                  onChange={(e) => push({ transform_pointcloud: e.target.checked })} />
                Apply TF transform
              </label>

              <div className="label-field">
                <span className="label-field-label">TF time mode</span>
                <select value={liveCfg.pointcloud_tf_time ?? 'latest'}
                  onChange={(e) => push({ pointcloud_tf_time: e.target.value })}>
                  <option value="latest">latest (recommended)</option>
                  <option value="message_stamp">message_stamp</option>
                  <option value="now">now</option>
                </select>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
```

---
