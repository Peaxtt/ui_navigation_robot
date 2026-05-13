import React, { useEffect, useState } from 'react';
import { Play, Square, TerminalSquare, Activity, Cpu, RotateCcw, Box, Layers, PlayCircle, StopCircle, RefreshCw } from 'lucide-react';
import { useRobotStore } from '../store/useRobotStore';

function ProcessCard({ proc, onStart, onStop, onToggleLog, isLogOpen }) {
  const isRunning = proc.running;
  const isExited = proc.exit_code != null && proc.exit_code !== 0;
  const isStopped = !isRunning && proc.exit_code == null;

  const statusClass = isRunning ? 'badge-ok' : isExited ? 'badge-alarm' : 'badge-dim';
  const statusText = isRunning ? `RUNNING (PID: ${proc.pid})` : isExited ? `EXITED (${proc.exit_code})` : 'STOPPED';

  return (
    <div className="card" style={{ marginBottom: '16px', borderLeft: isRunning ? '3px solid var(--ok)' : '3px solid var(--border-mid)' }}>
      <div className="card-body" style={{ padding: '16px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          
          <div style={{ display: 'flex', gap: '16px', flex: '1 1 300px' }}>
            <div style={{ 
              width: '36px', height: '36px', borderRadius: '8px', 
              background: 'var(--bg-deep)', border: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)'
            }}>
              <TerminalSquare size={18} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text)', marginBottom: '4px' }}>
                {proc.name}
              </div>
              <div style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', lineHeight: 1.5, wordBreak: 'break-all' }}>
                {proc.cmd}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '12px', flex: '1 1 200px' }}>
            <span className={`badge ${statusClass}`} style={{ padding: '6px 12px', fontSize: '11px', alignSelf: 'flex-end' }}>
              {statusText}
            </span>
            <div className="action-row" style={{ width: '100%', justifyContent: 'flex-end' }}>
              <button className="btn btn-sm" onClick={() => onStart(proc.name)} disabled={isRunning} style={{ borderColor: isRunning ? '' : 'var(--ok)', color: isRunning ? '' : 'var(--ok)' }}>
                <Play size={14} /> Start
              </button>
              <button className="btn btn-sm" onClick={() => onStop(proc.name)} disabled={!isRunning} style={{ borderColor: !isRunning ? '' : 'var(--alarm)', color: !isRunning ? '' : 'var(--alarm)' }}>
                <Square size={14} /> Stop
              </button>
              <button className={`btn btn-sm ${isLogOpen ? 'btn-primary' : ''}`} onClick={() => onToggleLog(proc.name)} style={isLogOpen ? { minHeight: '36px', padding: '8px 14px' } : {}}>
                <Activity size={14} /> {isLogOpen ? 'Hide Log' : 'Show Log'}
              </button>
            </div>
          </div>
          
        </div>

        {isLogOpen && (
          <div style={{ 
            marginTop: '16px', background: '#090A0C', borderRadius: '8px', border: '1px solid var(--border-strong)',
            padding: '12px 16px', maxHeight: '280px', overflowY: 'auto',
            fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#A8B0BC', whiteSpace: 'pre-wrap', lineHeight: 1.6
          }}>
            {(proc.log_tail && proc.log_tail.length > 0) ? proc.log_tail.join('\n') : '— no output —'}
          </div>
        )}

      </div>
    </div>
  );
}

export default function Launcher({ onLaunchRviz }) {
  const backendUrl = useRobotStore((s) => s.backendUrl);
  const [processes, setProcesses] = useState([]);
  const [openLogs, setOpenLogs] = useState(new Set());
  const [error, setError] = useState(null);

  const fetchProcs = async () => {
    try {
      const res = await fetch(`${backendUrl.replace(/\/$/, '')}/api/processes?tail=20`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setProcesses(data.processes || []);
      setError(null);
    } catch (err) {
      setError(`Cannot connect to gateway: ${err.message}`);
    }
  };

  useEffect(() => {
    fetchProcs();
    const interval = setInterval(fetchProcs, 3000);
    return () => clearInterval(interval);
  }, [backendUrl]);

  // Dedicated effect to fetch logs for opened panels more frequently
  useEffect(() => {
    if (openLogs.size === 0) return;
    const logInterval = setInterval(async () => {
      try {
        const res = await fetch(`${backendUrl.replace(/\/$/, '')}/api/processes?tail=50`);
        if (res.ok) {
          const data = await res.json();
          setProcesses(data.processes || []);
        }
      } catch (e) {}
    }, 1500);
    return () => clearInterval(logInterval);
  }, [openLogs, backendUrl]);

  const callApi = async (name, action) => {
    try {
      const res = await fetch(`${backendUrl.replace(/\/$/, '')}/api/processes/${encodeURIComponent(name)}/${action}`, { method: 'POST' });
      if (!res.ok) throw new Error(`Action failed with status ${res.status}`);
      fetchProcs();
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const startAll = async () => {
    for (const p of processes) {
      if (!p.running) await callApi(p.name, 'start');
    }
  };

  const stopAll = async () => {
    for (const p of processes) {
      if (p.running) await callApi(p.name, 'stop');
    }
  };

  const toggleLog = (name) => {
    setOpenLogs(prev => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflowY: 'auto', background: 'var(--bg-app)' }}>
      
      {/* Launcher Header */}
      <div style={{ background: 'var(--bg-panel)', padding: '32px 0', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div className="toolbar-logo-mark" style={{ width: '56px', height: '56px', borderRadius: '12px' }}>
            <Cpu size={32} />
          </div>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: '4px' }}>UNITREE B2 · WEB RVIZ</h1>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              LOCAL HMI · ROS 2 LAUNCH SUPERVISION
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 24px 80px', width: '100%' }}>
        
        {error && (
          <div className="msg-box error" style={{ marginBottom: '24px', padding: '16px' }}>
            <strong>Connection Error:</strong> {error}
          </div>
        )}

        {/* Visualization Card */}
        <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px', fontFamily: 'var(--font-mono)' }}>
          Visualization
        </div>
        <div className="card" style={{ marginBottom: '32px', borderLeft: '3px solid var(--accent)', background: 'linear-gradient(90deg, var(--bg-card) 0%, var(--bg-panel) 100%)' }}>
          <div className="card-body" style={{ padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <div style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text)', marginBottom: '8px' }}>Browser 3D RViz UI</div>
              <div style={{ fontSize: '13px', color: 'var(--text-dim)', maxWidth: '500px', lineHeight: 1.5 }}>
                Real-time 3D pose, point cloud, joint-animated URDF, Nav2 plan and waypoint management.
              </div>
            </div>
            <button className="btn-primary" style={{ padding: '0 32px', minHeight: '48px', fontSize: '14px', borderRadius: '8px' }} onClick={onLaunchRviz}>
              <Layers size={18} /> Enter Workspace →
            </button>
          </div>
        </div>

        {/* Processes Section */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'var(--font-mono)' }}>
            Process Supervision
          </div>
          <div className="action-row">
            <button className="btn btn-sm" onClick={startAll} style={{ color: 'var(--ok)', borderColor: 'rgba(48,209,88,0.3)' }}>
              <PlayCircle size={14} /> Start All
            </button>
            <button className="btn btn-sm" onClick={stopAll} style={{ color: 'var(--alarm)', borderColor: 'rgba(255,69,58,0.3)' }}>
              <StopCircle size={14} /> Stop All
            </button>
            <button className="btn btn-sm" onClick={fetchProcs}>
              <RefreshCw size={14} /> Refresh
            </button>
          </div>
        </div>

        {processes.length === 0 && !error ? (
          <div className="card" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
            <Box size={32} style={{ margin: '0 auto 12px', opacity: 0.5 }} />
            No processes configured in manifest.
          </div>
        ) : (
          processes.map(p => (
            <ProcessCard 
              key={p.name} 
              proc={p} 
              onStart={callApi} 
              onStop={callApi} 
              onToggleLog={toggleLog} 
              isLogOpen={openLogs.has(p.name)} 
            />
          ))
        )}

      </div>
    </div>
  );
}
