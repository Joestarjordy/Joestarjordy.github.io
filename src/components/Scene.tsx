import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { AdaptiveDpr, Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

type Props = { scroll: React.MutableRefObject<number> }

function Particles({ count = 420 }: { count?: number }) {
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
    const arr = data.current
    const mesh = ref.current
    for (let i = 0; i < arr.length; i++) {
      const p = arr[i]
      dummy.position.set(p.pos.x, p.pos.y + Math.sin(t * p.speed + i) * 0.4, p.pos.z)
      dummy.scale.setScalar(p.s)
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)
    }
    mesh.instanceMatrix.needsUpdate = true
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
    const safeDt = Math.min(dt, 0.1)
    const t = clock.elapsedTime
    const targetX = t * 0.15 + pointer.y * 0.4
    const targetY = t * 0.2 + pointer.x * 0.6
    core.current.rotation.x = THREE.MathUtils.damp(core.current.rotation.x, targetX, 6, safeDt)
    core.current.rotation.y = THREE.MathUtils.damp(core.current.rotation.y, targetY, 6, safeDt)
    shell.current.rotation.x -= safeDt * 0.1
    shell.current.rotation.y += safeDt * 0.15
  })
  return (
    <group position={[2.2, 0, 0]}>
      <mesh ref={core}>
        <icosahedronGeometry args={[1.6, 10]} />
        <MeshDistortMaterial color="#12161f" emissive="#070a0e" metalness={0.85} roughness={0.2} distort={0.35} speed={1.8} />
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
          <torusKnotGeometry args={[1, 0.3, 80, 14]} />
          <meshStandardMaterial color="#5ee7ff" metalness={0.75} roughness={0.25} />
        </mesh>
      </Float>
      <Float speed={1.5} rotationIntensity={2} floatIntensity={2}>
        <mesh position={[4.5, -24, -3]}>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial color="#ff6b9d" metalness={0.7} roughness={0.3} />
        </mesh>
      </Float>
      <Float speed={2.5} rotationIntensity={1} floatIntensity={3}>
        <mesh position={[-4, -38, -2]}>
          <torusGeometry args={[1.4, 0.45, 18, 40]} />
          <meshStandardMaterial color="#c6ff3d" metalness={0.75} roughness={0.25} />
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
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY, 5, safeDt)
    camera.position.x = THREE.MathUtils.damp(camera.position.x, pointer.x * 0.6, 4, safeDt)
    camera.lookAt(0, camera.position.y, 0)
  })
  return null
}

export default function Scene({ scroll }: Props) {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        dpr={[1, 1.25]}
        camera={{ position: [0, 0, 9], fov: 50 }}
        gl={{ antialias: true, powerPreference: 'high-performance', alpha: false, stencil: false }}
        eventSource={document.documentElement}
        eventPrefix="client"
      >
        <color attach="background" args={['#07080a']} />
        <AdaptiveDpr pixelated={false} />
        <fog attach="fog" args={['#07080a', 10, 32]} />
        <hemisphereLight args={['#5ee7ff', '#07080a', 1.2]} />
        <directionalLight position={[5, 6, 5]} intensity={2.6} color="#ffffff" />
        <directionalLight position={[-6, -4, -3]} intensity={1.1} color="#c6ff3d" />
        <pointLight position={[-6, 0, 4]} intensity={35} color="#5ee7ff" />
        <Hero />
        <Satellites />
        <Particles />
        <Rig scroll={scroll} />
      </Canvas>
    </div>
  )
}
