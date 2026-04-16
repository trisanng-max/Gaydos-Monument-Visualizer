"use client";

import React, { useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Text,
  Environment,
  ContactShadows,
} from "@react-three/drei";
import * as THREE from "three";

const granite: Record<string, string> = {
  "black-tie": "#0e0e10",
  "gray-forest": "#6f767b",
  mahogany: "#5a3a2e",
};

function Monument({ style, color, name }: any) {
  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: granite[color] || "#888",
      roughness: 0.95,
    });
  }, [color]);

  return (
    <group>
      <mesh material={material} position={[0, 1, 0]}>
        <boxGeometry args={[1.5, 2, 0.4]} />
      </mesh>

      <Text position={[0, 1.5, 0.25]} fontSize={0.2} color="#111">
        {name}
      </Text>
    </group>
  );
}

export default function Page() {
  const [style, setStyle] = useState("upright");
  const [color, setColor] = useState("gray-forest");
  const [name, setName] = useState("John Doe");

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ width: 300, padding: 16 }}>
        <h2>Monument Designer</h2>

        <label>Style</label>
        <select onChange={(e) => setStyle(e.target.value)}>
          <option value="upright">Upright</option>
        </select>

        <label>Granite</label>
        <select onChange={(e) => setColor(e.target.value)}>
          <option value="gray-forest">Gray</option>
          <option value="black-tie">Black</option>
        </select>

        <label>Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div style={{ flex: 1 }}>
        <Canvas camera={{ position: [0, 1.5, 4] }}>
          <ambientLight />
          <directionalLight position={[5, 5, 5]} />

          <Environment preset="sunset" />

          <Monument style={style} color={color} name={name} />

          <ContactShadows />

          <OrbitControls />
        </Canvas>
      </div>
    </div>
  );
}

