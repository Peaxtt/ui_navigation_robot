import React, { useEffect, useState } from 'react';
import Toolbar from './components/Toolbar';
import ControlPanel from './components/ControlPanel';
import SceneCanvas from './canvas/SceneCanvas';
import Launcher from './components/Launcher';
import { useRobotStore } from './store/useRobotStore';

export default function App() {
  const connectWS = useRobotStore((s) => s.connectWS);
  const disconnectWS = useRobotStore((s) => s.disconnectWS);
  const [panelOpen, setPanelOpen] = useState(false);
  const [view, setView] = useState('launcher'); // 'launcher' | 'rviz'

  useEffect(() => {
    if (view === 'rviz') {
      connectWS();
      return () => disconnectWS();
    }
  }, [view, connectWS, disconnectWS]);

  if (view === 'launcher') {
    return <Launcher onLaunchRviz={() => setView('rviz')} />;
  }

  return (
    <div className="app">
      <Toolbar onBack={() => setView('launcher')} />

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
