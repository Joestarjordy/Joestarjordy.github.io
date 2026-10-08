import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Environment } from '@react-three/drei'
import * as THREE from 'three'

type Props = { scroll: React.MutableRefObject<number> }

function Particles({ count = 900 }: { count?: number }) {
  const ref = useRef<THREE.InstancedMesh>(null!)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const data = useRef(
    Array.from({ length: count }, () => ({
      pos: new THREE.Vector3(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 30 - 5,
      ),
      s: Math.random() * 0.05 + 0.015,
      speed: Math.random() * 0.4 + 0.1,
    })),
  )

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    data.current.forEach((p, i) => {
      dummy.position.set(p.pos.x, p.pos.y + Math.sin(t * p.speed + i) * 0.4, p.pos.z)
      dummy.scale.setScalar(p.s)
      dummy.updateMatrix()
      ref.current.setMatrixAt(i, dummy.matrix)
    })
    ref.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]} frustumCulled={false}>
      <octahedronGeometry args={[1, 0]} />
      <meshBasicMaterial color="#c6ff3d" transparent opacity={0.7} />
    </instancedMesh>
  )
}

function Hero() {
  const core = useRef<THREE.Mesh>(null!)
  const shell = useRef<THREE.Mesh>(null!)
  useFrame(({ clock, pointer }, dt) => {
    const t = clock.elapsedTime
    core.current.rotation.x = t * 0.15 + pointer.y * 0.4
    core.current.rotation.y = t * 0.2 + pointer.x * 0.6
    shell.current.rotation.x -= dt * 0.1
    shell.current.rotation.y += dt * 0.15
  })
  return (
    <group position={[2.2, 0, 0]}>
      <mesh ref={core}>
        <icosahedronGeometry args={[1.6, 24]} />
        <MeshDistortMaterial color="#0c0f12" metalness={1} roughness={0.15} distort={0.35} speed={1.8} />
      </mesh>
      <mesh ref={shell}>
        <icosahedronGeometry args={[2.3, 1]} />
        <meshBasicMaterial color="#c6ff3d" wireframe transparent opacity={0.35} />
      </mesh>
    </group>
  )
}

function Satellites() {
  return (
    <>
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
        <mesh position={[-4, -11, -2]}>
          <torusKnotGeometry args={[1, 0.3, 160, 20]} />
          <meshStandardMaterial color="#5ee7ff" metalness={0.9} roughness={0.2} />
        </mesh>
      </Float>
      <Float speed={1.5} rotationIntensity={2} floatIntensity={2}>
        <mesh position={[4.5, -24, -3]}>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial color="#ff6b9d" metalness={0.8} roughness={0.25} />
        </mesh>
      </Float>
      <Float speed={2.5} rotationIntensity={1} floatIntensity={3}>
        <mesh position={[-4, -38, -2]}>
          <torusGeometry args={[1.4, 0.45, 24, 64]} />
          <meshStandardMaterial color="#c6ff3d" metalness={0.9} roughness={0.2} />
        </mesh>
      </Float>
    </>
  )
}

// Camera travels down the world as the page scrolls.
function Rig({ scroll }: Props) {
  useFrame(({ camera, pointer }, dt) => {
    const safeDt = Math.min(dt, 0.1)
    const targetY = -scroll.current * 42
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY, 4, safeDt)
    camera.position.x = THREE.MathUtils.damp(camera.position.x, pointer.x * 0.6, 3, safeDt)
    camera.lookAt(0, camera.position.y, 0)
  })
  return null
}

export default function Scene({ scroll }: Props) {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        dpr={[1, Math.min(window.devicePixelRatio, 2)]}
        camera={{ position: [0, 0, 9], fov: 50 }}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
      >
        <fog attach="fog" args={['#07080a', 10, 32]} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 6, 5]} intensity={2} color="#ffffff" />
        <pointLight position={[-6, 0, 4]} intensity={30} color="#5ee7ff" />
        <Environment preset="night" />
        <Hero />
        <Satellites />
        <Particles />
        <Rig scroll={scroll} />
      </Canvas>
    </div>
  )
}
