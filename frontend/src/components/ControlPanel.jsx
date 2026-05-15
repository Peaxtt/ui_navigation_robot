import React, { useEffect, useState } from 'react';
import {
  Navigation2, Camera, Activity, Settings2,
  Play, Square, Undo2, Trash2, MapPin, Repeat,
  CheckCircle2, AlertCircle, XCircle, Loader2,
} from 'lucide-react';
import { useRobotStore } from '../store/useRobotStore';
import WaypointList from './WaypointList';
import StreamSettings from './StreamSettings';
import CameraFeed from './CameraFeed';

function Section({ title, icon: Icon, defaultOpen = true, className = '', children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={`card ${className}`}>
      <div className="card-header" onClick={() => setOpen((o) => !o)}>
        {Icon && <Icon size={14} className="card-header-icon" strokeWidth={2} />}
        <span className="card-title">{title}</span>
        <span className={`card-chevron ${open ? 'open' : ''}`}>▼</span>
      </div>
      {open && <div className="card-body">{children}</div>}
    </div>
  );
}

function NavStatus({ feedback, waypointTotal }) {
  if (!feedback) {
    return (
      <div className="data-row">
        <span className="data-label">Status</span>
        <span className="badge badge-dim">Idle</span>
      </div>
    );
  }

  const state = feedback.state ?? 'unknown';

  const badgeClass =
    state === 'running'  ? 'badge-accent' :
    state === 'finished' ? 'badge-ok' :
    state === 'canceled' ? 'badge-warn' :
    state === 'error'    ? 'badge-alarm' : 'badge-dim';

  const StateIcon =
    state === 'running'  ? Loader2 :
    state === 'finished' ? CheckCircle2 :
    state === 'canceled' ? XCircle :
    state === 'error'    ? AlertCircle : null;

  const currentWp = feedback.current_waypoint ?? null;
  const progress  = (waypointTotal > 0 && currentWp !== null)
    ? ((currentWp + 1) / waypointTotal) * 100 : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div className="data-row">
        <span className="data-label">Status</span>
        <span className={`badge ${badgeClass}`}>
          {StateIcon && <StateIcon size={10} strokeWidth={2.5} />}
          {state.toUpperCase()}
        </span>
      </div>

      {state === 'running' && waypointTotal > 0 && (
        <div className="nav-progress">
          <div className="data-row">
            <span className="data-label"><MapPin size={12} /> Waypoint</span>
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
          <span className="data-label"><Repeat size={12} /> Round</span>
          <span className="data-value">
            {feedback.round}{feedback.repeat_count > 0 ? ` / ${feedback.repeat_count}` : ' (∞)'}
          </span>
        </div>
      )}

      {feedback.message && (
        <div className="msg-box error">
          <AlertCircle size={14} style={{ flexShrink: 0 }} />
          {feedback.message}
        </div>
      )}
    </div>
  );
}

export default function ControlPanel({ panelOpen = true, panelWidth }) {
  const pose              = useRobotStore((s) => s.pose);
  const urdfStatus        = useRobotStore((s) => s.urdfStatus);
  const pointCount        = useRobotStore((s) => s.pointCount);
  const navFeedback       = useRobotStore((s) => s.navFeedback);
  const navPlan           = useRobotStore((s) => s.navPlan);
  const navigationRunning = useRobotStore((s) => s.navigationRunning);
  const repeatCount       = useRobotStore((s) => s.repeatCount);
  const message           = useRobotStore((s) => s.message);
  const error             = useRobotStore((s) => s.error);
  const waypoints         = useRobotStore((s) => s.waypoints);
  const backendUrl        = useRobotStore((s) => s.backendUrl);

  const setRepeatCount     = useRobotStore((s) => s.setRepeatCount);
  const setMessage         = useRobotStore((s) => s.setMessage);
  const setError           = useRobotStore((s) => s.setError);
  const setWaypoints       = useRobotStore((s) => s.setWaypoints);
  const removeLastWaypoint = useRobotStore((s) => s.removeLastWaypoint);
  const setLiveCfg         = useRobotStore((s) => s.setLiveCfg);

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
  const yawStr  = pose
    ? `${((pose.yaw * 180) / Math.PI).toFixed(1)}°`
    : '—';
  const urdfOk = urdfStatus.startsWith('OK');

  return (
    <div className={`panel ${panelOpen ? 'open' : ''}`} style={panelWidth ? { width: panelWidth } : undefined}>
      <div className="panel-scroll">

        {/* ── Navigation ── */}
        <Section title="Navigation" icon={Navigation2} defaultOpen className="card-nav">
          <WaypointList />

          <div className="label-field">
            <span className="label-field-label">Repeat rounds (−1 = ∞)</span>
            <input
              type="number"
              value={repeatCount}
              onChange={(e) => setRepeatCount(e.target.value)}
              min="-1"
            />
          </div>

          <div className="nav-actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={startNavigation}
              disabled={navigationRunning || waypoints.length === 0}
            >
              <Play size={16} strokeWidth={3} />
              Start Navigation
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={cancelNavigation}
              disabled={!navigationRunning}
            >
              <Square size={14} strokeWidth={3} />
              Stop
            </button>
          </div>

          <div className="nav-secondary">
            <button type="button" className="btn btn-sm" onClick={removeLastWaypoint}
              disabled={waypoints.length === 0}>
              <Undo2 size={13} /> Undo
            </button>
            <button type="button" className="btn btn-sm" onClick={clearWaypoints}
              disabled={waypoints.length === 0}>
              <Trash2 size={13} /> Clear All
            </button>
          </div>

          <div className="divider" />

          <NavStatus
            feedback={navFeedback}
            running={navigationRunning}
            waypointTotal={waypoints.length}
          />

          {message && (
            <div className="msg-box success">
              <CheckCircle2 size={14} style={{ flexShrink: 0 }} />
              {message}
            </div>
          )}
          {error && (
            <div className="msg-box error">
              <AlertCircle size={14} style={{ flexShrink: 0 }} />
              {error}
            </div>
          )}
        </Section>

        {/* ── Camera ── */}
        <Section title="Camera" icon={Camera} defaultOpen>
          <CameraFeed />
        </Section>

        {/* ── Robot Status ── */}
        <Section title="Robot Status" icon={Activity} defaultOpen={false}>
          <div className="data-row">
            <span className="data-label">Position (x, y)</span>
            <span className="data-value">{poseStr}</span>
          </div>
          <div className="data-row">
            <span className="data-label">Yaw</span>
            <span className="data-value accent">{yawStr}</span>
          </div>
          <div className="data-row">
            <span className="data-label">URDF Model</span>
            <span className={`badge ${urdfOk ? 'badge-ok' : 'badge-dim'}`}>
              {urdfOk ? 'Loaded' : urdfStatus}
            </span>
          </div>
          <div className="data-row">
            <span className="data-label">Cloud points</span>
            <span className="data-value">{pointCount.toLocaleString()}</span>
          </div>
          {navPlan && (
            <div className="data-row">
              <span className="data-label">Plan points</span>
              <span className="data-value accent">{navPlan.count}</span>
            </div>
          )}
        </Section>

        {/* ── Stream Settings ── */}
        <StreamSettings />

      </div>
    </div>
  );
}
