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
              mat.needsUpdate = true;
            });
          });
          setUrdfStatus(meshCount > 0 ? `OK (${meshCount} meshes)` : 'OK (0 meshes)');
          setUrdfLoaded(true);
        };

        const robot = loader.parse(xml);

        if (cancelled) return;

        // Fix urdf-loader default pitch and up-vector for Z-up scene
        robot.rotation.set(0, 0, 0);
        robot.up.set(0, 0, 1);

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
