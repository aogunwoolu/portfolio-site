import React, { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Stars } from "@react-three/drei"
import * as THREE from "three"

function NebulaCloud({ position, color, scale }) {
  const mesh = useRef()
  useFrame((_, delta) => {
    mesh.current.rotation.x += delta * 0.012
    mesh.current.rotation.y += delta * 0.008
  })
  return (
    <mesh ref={mesh} position={position} scale={scale}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.07}
        side={THREE.BackSide}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}

function Scene() {
  const starsRef = useRef()
  useFrame((_, delta) => {
    starsRef.current.rotation.x -= delta * 0.018
    starsRef.current.rotation.y -= delta * 0.012
  })
  return (
    <>
      <color attach="background" args={["#04010c"]} />
      <fog attach="fog" args={["#0d0022", 60, 220]} />
      <group ref={starsRef}>
        <Stars
          radius={90}
          depth={55}
          count={7000}
          factor={5}
          saturation={0.8}
          fade
        />
      </group>
      {/* Purple nebula core */}
      <NebulaCloud position={[-6, 2, -30]}  color="#9b00ff" scale={[28, 18, 20]} />
      <NebulaCloud position={[0,  0, -40]}  color="#7000cc" scale={[35, 22, 25]} />
      <NebulaCloud position={[8,  -2, -35]} color="#b300e0" scale={[24, 16, 18]} />
      {/* Magenta highlights */}
      <NebulaCloud position={[-3, 4, -28]}  color="#cc00aa" scale={[14, 10, 12]} />
      <NebulaCloud position={[5,  1, -32]}  color="#dd00bb" scale={[12, 9,  10]} />
      {/* Deep indigo fill */}
      <NebulaCloud position={[12, -4, -45]} color="#3300aa" scale={[30, 20, 22]} />
      <NebulaCloud position={[-14, 3, -50]} color="#22007a" scale={[32, 20, 24]} />
      {/* Small teal accent to echo original */}
      <NebulaCloud position={[-4, 1, -26]}  color="#00aaaa" scale={[8, 6, 7]} />
    </>
  )
}

export default function GalaxyBackground() {
  const [client, setClient] = useState(false)
  useEffect(() => { setClient(true) }, [])
  if (!client) return null
  return (
    <Canvas
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
      }}
      camera={{ position: [0, 0, 1], fov: 75 }}
    >
      <Scene />
    </Canvas>
  )
}
