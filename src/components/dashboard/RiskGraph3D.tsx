"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import * as React from "react";

type Node = { id: string; x: number; y: number; z: number; r: number };

function Nodes({ nodes }: { nodes: Node[] }) {
  return (
    <>
      {nodes.map((n) => (
        <mesh key={n.id} position={[n.x, n.y, n.z]}>
          <sphereGeometry args={[n.r, 24, 24]} />
          <meshStandardMaterial emissiveIntensity={0.25} />
        </mesh>
      ))}
    </>
  );
}

export default function RiskGraph3D() {
  const nodes = React.useMemo<Node[]>(
    () => [
      { id: "core", x: 0, y: 0, z: 0, r: 0.42 },
      { id: "hr1", x: 1.1, y: 0.2, z: -0.5, r: 0.28 },
      { id: "hr2", x: -1.0, y: -0.1, z: 0.6, r: 0.26 },
      { id: "lim1", x: 0.6, y: 0.8, z: 0.8, r: 0.2 },
      { id: "min1", x: -0.7, y: 0.9, z: -0.9, r: 0.16 }
    ],
    []
  );

  return (
    <Canvas camera={{ position: [2.4, 1.6, 2.4], fov: 50 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 2]} intensity={1.2} />
      <group>
        <mesh rotation={[0, 0, 0]}>
          <torusKnotGeometry args={[0.75, 0.16, 140, 16]} />
          <meshStandardMaterial wireframe />
        </mesh>
        <Nodes nodes={nodes} />
      </group>
      <Environment preset="city" />
      <OrbitControls enablePan={false} />
    </Canvas>
  );
}
