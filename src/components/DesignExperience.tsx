'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { gsap } from 'gsap';
import { ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { Link } from '@/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

// --- Constants & Types ---
const PARTICLE_COUNT = 80000;

const vertexShader = `
  attribute float size;
  attribute vec3 color;
  attribute vec3 targetPosition;
  attribute float opacity;
  
  varying vec3 vColor;
  varying float vOpacity;
  
  void main() {
    vColor = color;
    vOpacity = opacity;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = size * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  varying vec3 vColor;
  varying float vOpacity;
  
  void main() {
    float d = distance(gl_PointCoord, vec2(0.5));
    if (d > 0.5) discard;
    float strength = smoothstep(0.5, 0.1, d);
    gl_FragColor = vec4(vColor, strength * vOpacity);
  }
`;

export default function DesignExperience({ lang }: { lang: string }) {
  const t = useTranslations('Design');
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentModeIndex, setCurrentModeIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showHint, setShowHint] = useState(true);

  const MODES = useMemo(() => [
    {
      id: 'analyze',
      name: t('modes.analyze.name'),
      subtitle: t('modes.analyze.subtitle'),
      description: t('modes.analyze.description'),
      colors: ['#00d4ff', '#0047ab'], // Cyan to Deep Blue
    },
    {
      id: 'structure',
      name: t('modes.structure.name'),
      subtitle: t('modes.structure.subtitle'),
      description: t('modes.structure.description'),
      colors: ['#8892a4', '#e8edf5'], // Steel Gray to Bright White
    },
    {
      id: 'expansion',
      name: t('modes.expansion.name'),
      subtitle: t('modes.expansion.subtitle'),
      description: t('modes.expansion.description'),
      colors: ['#f59e0b', '#ef4444'], // Amber to Red-Orange
    },
    {
      id: 'focus',
      name: t('modes.focus.name'),
      subtitle: t('modes.focus.subtitle'),
      description: t('modes.focus.description'),
      colors: ['#10b981', '#fbbf24'], // Emerald to Gold
    },
  ], [t]);
  
  // Three.js Refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const composerRef = useRef<EffectComposer | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  
  // Animation state refs
  const positionsRef = useRef<Float32Array | null>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;

    // --- Initialization ---
    const width = window.innerWidth;
    const height = window.innerHeight - 120; // Approx header height
    
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#080c12');
    scene.fog = new THREE.FogExp2('#080c12', 0.002);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 2000);
    camera.position.set(0, 0, 400);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.3;
    controlsRef.current = controls;

    // Post-processing
    const renderScene = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(width, height), 0.4, 0.6, 0.85);
    const composer = new EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);
    composerRef.current = composer;

    // --- Particle System Setup ---
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);
    const opacities = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Random initial scatter
      positions[i * 3] = (Math.random() - 0.5) * 1000;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 1000;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 1000;

      sizes[i] = 0.8 + Math.random() * 1.7;
      opacities[i] = 0.3 + Math.random() * 0.7;

      colors[i * 3] = 1;
      colors[i * 3 + 1] = 1;
      colors[i * 3 + 2] = 1;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('opacity', new THREE.BufferAttribute(opacities, 1));

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    particlesRef.current = particles;
    positionsRef.current = positions;
    
    // --- Initial Mode Trigger ---
    generateModePositions(0);
    setIsLoading(false);
    
    // Auto-rotate resume logic
    let timeout: NodeJS.Timeout;
    controls.addEventListener('start', () => {
      controls.autoRotate = false;
      clearTimeout(timeout);
    });
    controls.addEventListener('end', () => {
      timeout = setTimeout(() => {
        controls.autoRotate = true;
      }, 3000);
    });

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      composer.render();
    };
    animate();

    // Resize
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight - 120;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      composer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Keyboard
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextMode();
      if (e.key === 'ArrowLeft') prevMode();
      if (e.key === ' ') controls.autoRotate = !controls.autoRotate;
      if (e.key === 'f') {
        if (!document.fullscreenElement) {
          containerRef.current?.requestFullscreen();
        } else {
          document.exitFullscreen();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Hint timeout
    const hintTimer = setTimeout(() => setShowHint(false), 4000);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(hintTimer);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  const generateModePositions = (index: number) => {
    const mode = MODES[index];
    const targetPositions = new Float32Array(PARTICLE_COUNT * 3);
    const targetColors = new Float32Array(PARTICLE_COUNT * 3);
    
    const color1 = new THREE.Color(mode.colors[0]);
    const color2 = new THREE.Color(mode.colors[1]);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      let x = 0, y = 0, z = 0;
      
      if (mode.id === 'analyze') {
        // Helix Ribbon
        const t = (i / PARTICLE_COUNT) * Math.PI * 20;
        const radius = 100 + Math.sin(t * 0.1) * 20;
        x = Math.cos(t) * radius + (Math.random() - 0.5) * 30;
        y = (i / PARTICLE_COUNT - 0.5) * 600 + (Math.random() - 0.5) * 30;
        z = Math.sin(t) * radius + (Math.random() - 0.5) * 30;
      } else if (mode.id === 'structure') {
        // Lattice
        const size = 150;
        const step = 40;
        const ix = (i % 8) - 4;
        const iy = (Math.floor(i / 8) % 8) - 4;
        const iz = (Math.floor(i / 64) % 8) - 4;
        
        x = ix * step + (Math.random() - 0.5) * 5;
        y = iy * step + (Math.random() - 0.5) * 5;
        z = iz * step + (Math.random() - 0.5) * 5;
      } else if (mode.id === 'expansion') {
        // Sphere Shell
        const phi = Math.acos(-1 + (2 * i) / PARTICLE_COUNT);
        const theta = Math.sqrt(PARTICLE_COUNT * Math.PI) * phi;
        const radius = 200 + (Math.random() - 0.5) * 20;
        x = radius * Math.cos(theta) * Math.sin(phi);
        y = radius * Math.sin(theta) * Math.sin(phi);
        z = radius * Math.cos(phi);
      } else if (mode.id === 'focus') {
        // Core + Halo
        if (i < PARTICLE_COUNT * 0.8) {
          // Core
          const r = Math.pow(Math.random(), 2) * 50;
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.random() * Math.PI;
          x = r * Math.sin(phi) * Math.cos(theta);
          y = r * Math.sin(phi) * Math.sin(theta);
          z = r * Math.cos(phi);
        } else {
          // Halo
          const r = 150 + Math.random() * 50;
          const theta = Math.random() * Math.PI * 2;
          x = Math.cos(theta) * r;
          y = (Math.random() - 0.5) * 20;
          z = Math.sin(theta) * r;
        }
      }

      targetPositions[i * 3] = x;
      targetPositions[i * 3 + 1] = y;
      targetPositions[i * 3 + 2] = z;

      // Colors
      const mixedColor = color1.clone().lerp(color2, Math.random());
      targetColors[i * 3] = mixedColor.r;
      targetColors[i * 3 + 1] = mixedColor.g;
      targetColors[i * 3 + 2] = mixedColor.b;
    }

    if (particlesRef.current) {
      const posAttr = particlesRef.current.geometry.attributes.position;
      const colAttr = particlesRef.current.geometry.attributes.color;
      
      gsap.to(posAttr.array, {
        duration: 1.8,
        ease: 'power3.inOut',
        endArray: targetPositions as any,
        onUpdate: () => { posAttr.needsUpdate = true; }
      });

      gsap.to(colAttr.array, {
        duration: 1.8,
        ease: 'power3.inOut',
        endArray: targetColors as any,
        onUpdate: () => { colAttr.needsUpdate = true; }
      });
    }
  };

  const nextMode = () => {
    const next = (currentModeIndex + 1) % MODES.length;
    setCurrentModeIndex(next);
    generateModePositions(next);
  };

  const prevMode = () => {
    const prev = (currentModeIndex - 1 + MODES.length) % MODES.length;
    setCurrentModeIndex(prev);
    generateModePositions(prev);
  };

  return (
    <div className="relative flex flex-col w-full bg-[#080c12] text-white overflow-hidden">
      {/* Layer 1: Contextual Header */}
      <header className="z-20 w-full px-8 py-10 flex justify-between items-start border-b border-white/5 bg-[#080c12]">
        <div className="space-y-2">
          <p className="font-code text-[10px] uppercase tracking-widest text-primary/80">
            {t('eyebrow')}
          </p>
          <h1 className="text-4xl font-headline font-black tracking-tight">{t('title')}</h1>
          <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
            {t('description')}
          </p>
        </div>
        <Link 
          href="/" 
          className="flex items-center gap-2 font-code text-xs text-white/60 hover:text-primary transition-colors group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span> {t('backLink')}
        </Link>
      </header>

      {/* Layer 2: WebGL Canvas */}
      <div 
        ref={containerRef} 
        className="relative w-full overflow-hidden" 
        style={{ height: 'calc(100vh - 180px)' }}
      >
        <AnimatePresence>
          {isLoading && (
            <motion.div 
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#080c12] gap-4"
            >
              <div className="flex gap-2">
                {MODES.map((mode, i) => (
                  <motion.div 
                    key={i}
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: mode.colors[0] }}
                  />
                ))}
              </div>
              <p className="font-code text-xs text-white/40">{t('loading')}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* HUD Navigation */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20">
          <div className="bg-black/45 backdrop-blur-md border border-white/10 rounded-full px-6 py-4 flex items-center gap-8 shadow-2xl">
            <button 
              onClick={prevMode}
              className="p-2 hover:bg-white/10 rounded-full transition-all hover:scale-110 active:scale-95 border border-transparent hover:border-white/10"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="text-center min-w-[140px]">
              <div className="font-code text-[11px] uppercase tracking-[0.2em] font-light mb-0.5">
                {MODES[currentModeIndex].name}
              </div>
              <div className="text-[10px] italic text-white/50">
                {MODES[currentModeIndex].subtitle}
              </div>
              <div className="flex justify-center gap-2 mt-3">
                {MODES.map((_, i) => (
                  <button 
                    key={i}
                    onClick={() => {
                      setCurrentModeIndex(i);
                      generateModePositions(i);
                    }}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${
                      i === currentModeIndex ? 'bg-white scale-125' : 'bg-white/20 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </div>

            <button 
              onClick={nextMode}
              className="p-2 hover:bg-white/10 rounded-full transition-all hover:scale-110 active:scale-95 border border-transparent hover:border-white/10"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Keyboard Hint */}
        <AnimatePresence>
          {showHint && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-32 left-1/2 -translate-x-1/2 font-code text-[10px] text-white/30 tracking-widest uppercase"
            >
              {t('hint')}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Layer 3: Mode Summary Grid */}
      <section className="w-full px-8 py-20 border-t border-white/5 bg-[#080c12]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MODES.map((mode, i) => (
            <div 
              key={mode.id}
              className="p-6 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-4 hover:bg-white/[0.05] transition-colors group"
            >
              <div className="flex justify-between items-start">
                <span className="font-code text-[10px] text-white/40">0{i + 1}</span>
                <div 
                  className="w-2 h-2 rounded-full shadow-lg"
                  style={{ backgroundColor: mode.colors[0], boxShadow: `0 0 10px ${mode.colors[0]}` }}
                />
              </div>
              <div>
                <h3 className="font-headline font-bold text-lg mb-1 group-hover:text-primary transition-colors">
                  {mode.name}
                </h3>
                <p className="text-[11px] italic text-white/40 mb-3">{mode.subtitle}</p>
                <p className="text-xs text-white/60 leading-relaxed line-clamp-3">
                  {mode.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Final CTA Row */}
        <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-white/40">
            {t('cta.text')}
          </p>
          <div className="flex gap-4">
            <Link 
              href="/projects"
              className="px-6 py-2.5 rounded-lg border border-white/10 text-xs font-code hover:bg-white/5 transition-colors"
            >
              {t('cta.projects')}
            </Link>
            <Link 
              href="/#contact"
              className="px-6 py-2.5 rounded-lg border border-white/10 text-xs font-code hover:bg-white/5 transition-colors"
            >
              {t('cta.contact')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
