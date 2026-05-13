import React from 'react';
import { Trash2, MapPin } from 'lucide-react';
import { useRobotStore } from '../store/useRobotStore';

function deg(rad) { return ((rad * 180) / Math.PI).toFixed(0); }
function fmt(n)   { return Number(n).toFixed(2); }

export default function WaypointList() {
  const waypoints    = useRobotStore((s) => s.waypoints);
  const setWaypoints = useRobotStore((s) => s.setWaypoints);

  if (waypoints.length === 0) {
    return (
      <div className="wp-empty">
        <MapPin size={22} />
        <span>No waypoints — click the map to add</span>
      </div>
    );
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
            <Trash2 size={14} strokeWidth={2} />
          </button>
        </div>
      ))}
    </div>
  );
}
