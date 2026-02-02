"use client";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Environment, Center } from "@react-three/drei";
import Bottle from "./LipstickRequested";

export default function Scene() {
  return (
    <Canvas 
      camera={{ position: [0, 0, 5], fov: 35 }} // Cámara más alejada + fov bajo = menos distorsión
      style={{ pointerEvents: 'none' }}
    > 
      <ambientLight intensity={0.7} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <Suspense fallback={null}>
        <Center>
          <Bottle />
        </Center>
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}