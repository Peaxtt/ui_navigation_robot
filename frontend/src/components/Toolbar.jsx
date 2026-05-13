import React from 'react';
import { Bot, Wifi, WifiOff, LayoutDashboard, MapPin, Move, ArrowLeft } from 'lucide-react';
import { useRobotStore } from '../store/useRobotStore';

export default function Toolbar({ onBack }) {
  const backendUrl = useRobotStore((s) => s.backendUrl);
  const connected  = useRobotStore((s) => s.connected);
  const addMode    = useRobotStore((s) => s.addMode);
  const viewMode   = useRobotStore((s) => s.viewMode);
  const setBackendUrl = useRobotStore((s) => s.setBackendUrl);
  const connectWS     = useRobotStore((s) => s.connectWS);
  const setAddMode    = useRobotStore((s) => s.setAddMode);
  const setViewMode   = useRobotStore((s) => s.setViewMode);

  return (
    <div className="toolbar">
      {onBack && (
        <button 
          onClick={onBack} 
          style={{ 
            background: 'var(--surface-2)', border: '1px solid var(--border-mid)', color: 'var(--text-muted)', 
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '8px', marginRight: '8px', borderRadius: '6px', transition: 'all 0.2s'
          }}
          title="Back to Launcher"
          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.borderColor = 'var(--border-hi)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border-mid)'; }}
        >
          <ArrowLeft size={16} />
        </button>
      )}

      <div className="toolbar-logo">
        <div className="toolbar-logo-mark">
          <Bot size={17} strokeWidth={1.75} />
        </div>
        <div>
          <div className="toolbar-logo-name">B2 Web RViz</div>
          <div className="toolbar-logo-sub">Unitree B2 · ROS 2</div>
        </div>
      </div>

      <div className="toolbar-sep" />

      {/* ── View + addMode toggles ───────────────────────────── */}
      <div className="toolbar-toggles">
        <button
          type="button"
          className={`toolbar-toggle-btn ${viewMode === 'top' ? 'active' : ''}`}
          onClick={() => setViewMode('top')}
          title="Top-down view"
        >⊞ Top</button>
        <button
          type="button"
          className={`toolbar-toggle-btn ${viewMode === '3d' ? 'active' : ''}`}
          onClick={() => setViewMode('3d')}
          title="3D orbit view"
        >◈ 3D</button>
      </div>

      <div className="toolbar-sep" />

      <button
        type="button"
        className={`toolbar-mode-btn ${addMode ? 'active' : ''}`}
        onClick={() => setAddMode(!addMode)}
        title={addMode ? 'Waypoint mode — คลิกแผนที่เพื่อวาง waypoint' : 'Pan mode — ลากเพื่อเลื่อนจอ'}
      >
        {addMode
          ? <><MapPin size={14} /> Placing Waypoints</>
          : <><Move size={14} /> Navigate</>
        }
      </button>

      <div className="toolbar-sep" />

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
        <div className={`conn-pill ${connected ? 'connected' : 'disconnected'}`}>
          <div className="conn-dot" />
          {connected
            ? <><Wifi size={12} />&nbsp;Online</>
            : <><WifiOff size={12} />&nbsp;Offline</>
          }
        </div>

        {onBack && (
          <button className="toolbar-link" onClick={onBack} title="Back to dashboard" style={{ background: 'transparent', cursor: 'pointer' }}>
            <LayoutDashboard size={13} />
            Dashboard
          </button>
        )}
      </div>
    </div>
  );
}
