import React, { useRef, useState } from 'react';
import { Camera, Download, RefreshCw } from 'lucide-react';
import { useRobotStore } from '../store/useRobotStore';

export default function CameraFeed() {
  const backendUrl = useRobotStore((s) => s.backendUrl);
  const imgRef     = useRef(null);
  const canvasRef  = useRef(null);
  const [error, setError]         = useState(false);
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
      canvas.width  = img.naturalWidth  || 320;
      canvas.height = img.naturalHeight || 240;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

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
        <div className="camera-feed-offline">
          <Camera size={30} strokeWidth={1.5} />
          <span>Stream unavailable</span>
          <button
            className="btn btn-sm"
            style={{ marginTop: 4 }}
            onClick={() => setError(false)}
            type="button"
          >
            <RefreshCw size={13} /> Retry
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

      <div className="camera-feed-top">
        <div className="camera-feed-badge">
          <div className="camera-live-dot" />
          Live
        </div>
        <div className="camera-feed-badge">
          <Camera size={9} />
          Front Cam
        </div>
      </div>

      {!error && (
        <div className="camera-feed-overlay">
          <button
            className="camera-capture-btn"
            onClick={captureSnapshot}
            disabled={capturing}
            type="button"
          >
            <Download size={14} />
            {capturing ? 'Saving…' : 'Save Snapshot'}
          </button>
        </div>
      )}

      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
}
