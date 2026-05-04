import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, PresentationControls } from '@react-three/drei';
import { motion } from 'framer-motion';

const AbstractTooth = ({ mobile }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const rotationSpeed = mobile ? 0.004 : 0.008;
    meshRef.current.rotation.y += rotationSpeed;
    meshRef.current.position.y = Math.sin(time) * 0.1;
  });

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <MeshDistortMaterial
          color="#8FC49F"
          speed={2}
          distort={0.4}
          radius={1}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </Float>
  );
};

const TeethShowcase = () => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <section id="teeth-showcase" className="bg-bg min-h-screen flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-accent text-sm uppercase tracking-widest block mb-4 font-medium"
          >
            Digital Precision
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="font-display text-heading"
          >
            3D Diagnostic Visualization
          </motion.h2>
        </div>

        <div className="h-[500px] w-full relative">
          <Canvas 
            camera={{ position: [0, 0, 5], fov: 45 }}
            style={{ touchAction: 'none' }} // Fix scroll hijacking
          >
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} color="#8FC49F" intensity={1} />
            <Suspense fallback={null}>
              <PresentationControls
                global
                config={{ mass: 2, tension: 500 }}
                snap={{ mass: 4, tension: 1500 }}
                rotation={[0, 0.3, 0]}
                polar={[-Math.PI / 3, Math.PI / 3]}
                azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
              >
                <AbstractTooth mobile={isMobile} />
              </PresentationControls>
            </Suspense>
          </Canvas>

          {/* Mobile Hint */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-muted text-sm uppercase tracking-widest"
          >
            <span className="animate-pulse">tap & drag to rotate</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
              <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
              <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
              <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TeethShowcase;
