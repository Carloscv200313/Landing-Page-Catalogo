"use client";
import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

export default function Bottle() {
  const modelRef = useRef(null);
  const { scene } = useGLTF("/models/cosmetic_jar/scene.gltf");
  const { viewport } = useThree();

  // Calculamos una escala que se adapte al ancho del viewport de Three.js
  // Si el viewport es pequeño (móvil), la escala baja automáticamente.
  const responsiveScale = viewport.width < 5 ? viewport.width * 4 : 12;

  return (
    <primitive 
      ref={modelRef} 
      object={scene} 
      scale={responsiveScale} 
      rotation={[0.2, -0.5, 0]}
    />
  );
}