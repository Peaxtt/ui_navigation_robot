import React, { useRef, useState } from 'react';
import { Settings2 } from 'lucide-react';
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
  const liveCfg    = useRobotStore((s) => s.liveCfg);
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
        <Settings2 size={14} className="card-header-icon" strokeWidth={2} />
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
