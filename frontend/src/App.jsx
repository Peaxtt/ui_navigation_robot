import React, { useEffect, useState, useRef, useCallback } from 'react';
import Toolbar from './components/Toolbar';
import ControlPanel from './components/ControlPanel';
import SceneCanvas from './canvas/SceneCanvas';
import Launcher from './components/Launcher';
import { useRobotStore } from './store/useRobotStore';

const PANEL_MIN = 220;
const PANEL_MAX = 620;
const PANEL_DEFAULT = 320;

export default function App() {
  const connectWS    = useRobotStore((s) => s.connectWS);
  const disconnectWS = useRobotStore((s) => s.disconnectWS);
  const [panelOpen, setPanelOpen] = useState(false);
  const [view, setView]           = useState('launcher');
  const [panelWidth, setPanelWidth] = useState(() => {
    const saved = parseInt(localStorage.getItem('panelWidth'), 10);
    return isNaN(saved) ? PANEL_DEFAULT : Math.max(PANEL_MIN, Math.min(PANEL_MAX, saved));
  });
  const dragging = useRef(false);

  useEffect(() => {
    if (view === 'rviz') {
      connectWS();
      return () => disconnectWS();
    }
  }, [view, connectWS, disconnectWS]);

  const onResizeStart = useCallback((e) => {
    dragging.current = true;
    e.preventDefault();
  }, []);

  useEffect(() => {
    function onMove(e) {
      if (!dragging.current) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const w = Math.max(PANEL_MIN, Math.min(PANEL_MAX, window.innerWidth - clientX));
      setPanelWidth(w);
    }
    function onUp() {
      if (dragging.current) {
        dragging.current = false;
        // Persist final width
        setPanelWidth((w) => { localStorage.setItem('panelWidth', w); return w; });
      }
    }
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup',   onUp);
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('touchend',  onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup',   onUp);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend',  onUp);
    };
  }, []);

  if (view === 'launcher') {
    return <Launcher onLaunchRviz={() => setView('rviz')} />;
  }

  return (
    <div className="app">
      <Toolbar onBack={() => setView('launcher')} />

      <div className="layout" style={{ position: 'relative' }}>
        <SceneCanvas />

        {/* Drag handle — sits between canvas and panel */}
        <div
          className="panel-resize-handle"
          onMouseDown={onResizeStart}
          onTouchStart={onResizeStart}
          title="Drag to resize panel"
        />

        <ControlPanel panelOpen={panelOpen} panelWidth={panelWidth} />

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
