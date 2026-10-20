import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // SCENE SETUP
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030306, 0.035);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // AMBIENT LIGHTS & GLOW
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const cyanPoint = new THREE.PointLight(0x06b6d4, 4, 30);
    cyanPoint.position.set(-6, 3, 4);
    scene.add(cyanPoint);

    const purplePoint = new THREE.PointLight(0xa855f7, 5, 30);
    purplePoint.position.set(6, -2, 3);
    scene.add(purplePoint);

    const amberPoint = new THREE.PointLight(0xf59e0b, 2.5, 25);
    amberPoint.position.set(0, 5, -2);
    scene.add(amberPoint);

    // 1. 3D CURVED FILM STRIP RIBBON
    const curvePoints = [];
    for (let i = 0; i < 28; i++) {
      const t = i / 28;
      const angle = t * Math.PI * 4;
      const radius = 4.5 + Math.sin(t * Math.PI * 3) * 1.5;
      const x = Math.sin(angle) * radius;
      const y = (t - 0.5) * 22;
      const z = Math.cos(angle) * (radius * 0.7) - 3;
      curvePoints.push(new THREE.Vector3(x, y, z));
    }
    const ribbonCurve = new THREE.CatmullRomCurve3(curvePoints);
    const ribbonGeo = new THREE.TubeGeometry(ribbonCurve, 120, 0.28, 8, false);
    const ribbonMat = new THREE.MeshStandardMaterial({
      color: 0x9333ea,
      emissive: 0x581c87,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.85,
      wireframe: false,
    });
    const ribbonMesh = new THREE.Mesh(ribbonGeo, ribbonMat);
    scene.add(ribbonMesh);

    // Wireframe outer cage for high-tech aesthetic
    const ribbonWireGeo = new THREE.TubeGeometry(ribbonCurve, 80, 0.55, 4, false);
    const ribbonWireMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const ribbonWireMesh = new THREE.Mesh(ribbonWireGeo, ribbonWireMat);
    scene.add(ribbonWireMesh);

    // 2. FLOATING 3D CINEMATIC LENS APERTURE RINGS
    const ringsGroup = new THREE.Group();
    const ringColors = [0x06b6d4, 0xa855f7, 0xec4899, 0x3b82f6];

    for (let i = 0; i < 6; i++) {
      const ringGeo = new THREE.TorusGeometry(1.6 + i * 0.5, 0.025, 16, 64);
      const ringMat = new THREE.MeshStandardMaterial({
        color: ringColors[i % ringColors.length],
        emissive: ringColors[i % ringColors.length],
        emissiveIntensity: 0.8,
        roughness: 0.1,
        metalness: 0.9,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.position.set(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 6 - 2
      );
      ringMesh.rotation.x = Math.random() * Math.PI;
      ringMesh.rotation.y = Math.random() * Math.PI;
      ringMesh.userData = {
        rotX: (Math.random() - 0.5) * 0.008,
        rotY: (Math.random() - 0.5) * 0.01,
        rotZ: (Math.random() - 0.5) * 0.005,
      };
      ringsGroup.add(ringMesh);
    }
    scene.add(ringsGroup);

    // 3. FLOATING 3D FILM FRAMES / EDIT SLIDES
    const frameGroup = new THREE.Group();
    const frameMat = new THREE.MeshStandardMaterial({
      color: 0x1e1e2d,
      roughness: 0.4,
      metalness: 0.7,
      transparent: true,
      opacity: 0.85,
    });
    const edgeMat = new THREE.LineBasicMaterial({
      color: 0x818cf8,
      transparent: true,
      opacity: 0.45,
    });

    for (let i = 0; i < 7; i++) {
      const card = new THREE.Group();
      const geom = new THREE.PlaneGeometry(2.4, 1.4);
      const mesh = new THREE.Mesh(geom, frameMat);
      const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geom), edgeMat);
      card.add(mesh);
      card.add(edges);

      card.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 6 - 1
      );
      card.rotation.x = (Math.random() - 0.5) * 0.6;
      card.rotation.y = (Math.random() - 0.5) * 0.8;
      card.rotation.z = (Math.random() - 0.5) * 0.3;
      card.userData = {
        floatSpeed: 0.001 + Math.random() * 0.002,
        baseY: card.position.y,
        seed: Math.random() * 100,
      };
      frameGroup.add(card);
    }
    scene.add(frameGroup);

    // 4. FLOATING PARTICLES (BOKEH / DUST IN ANAMORPHIC LIGHT)
    const particleCount = 280;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 22;
      positions[i + 1] = (Math.random() - 0.5) * 30;
      positions[i + 2] = (Math.random() - 0.5) * 16 - 2;

      // Teal / Violet / Amber subtle glow colors
      const r = 0.4 + Math.random() * 0.6;
      const g = 0.4 + Math.random() * 0.5;
      const b = 0.8 + Math.random() * 0.2;
      colors[i] = r;
      colors[i + 1] = g;
      colors[i + 2] = b;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // MOUSE & SCROLL STATE
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let scrollY = 0;
    let targetScrollY = 0;

    const handleMouseMove = (e) => {
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // RESIZE LISTENER
    const handleResize = () => {
      if (!container) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // ANIMATION LOOP
    let clock = new THREE.Clock();
    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth lerp mouse & scroll
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;
      scrollY += (targetScrollY - scrollY) * 0.06;

      // Normalize scroll progress (0 to max document height)
      const docHeight = Math.max(
        document.body.scrollHeight - window.innerHeight,
        1
      );
      const scrollRatio = scrollY / docHeight;

      // 3D Camera Travel based on scroll + mouse parallax
      camera.position.x = mouseX * 1.4;
      camera.position.y = -scrollRatio * 18 + mouseY * 1.2;
      camera.position.z = 9 - Math.sin(scrollRatio * Math.PI * 2) * 2.2;
      camera.rotation.y = -mouseX * 0.12;
      camera.rotation.x = mouseY * 0.08 - scrollRatio * 0.25;

      // Rotate Ribbon
      ribbonMesh.rotation.y = elapsedTime * 0.04;
      ribbonMesh.rotation.z = Math.sin(elapsedTime * 0.1) * 0.1;
      ribbonWireMesh.rotation.y = elapsedTime * 0.04;
      ribbonWireMesh.rotation.z = Math.sin(elapsedTime * 0.1) * 0.1;

      // Rotate Rings
      ringsGroup.children.forEach((ring) => {
        ring.rotation.x += ring.userData.rotX;
        ring.rotation.y += ring.userData.rotY;
        ring.rotation.z += ring.userData.rotZ;
      });

      // Float Cards
      frameGroup.children.forEach((card) => {
        card.position.y =
          card.userData.baseY +
          Math.sin(elapsedTime * 1.2 + card.userData.seed) * 0.35;
        card.rotation.y += 0.0015;
      });

      // Slowly drift particles
      particles.rotation.y = elapsedTime * 0.015;
      particles.rotation.x = Math.sin(elapsedTime * 0.02) * 0.05;

      // Pulse Point Lights
      cyanPoint.intensity = 3.5 + Math.sin(elapsedTime * 2) * 1.2;
      purplePoint.intensity = 4.5 + Math.cos(elapsedTime * 2.5) * 1.4;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      ribbonGeo.dispose();
      ribbonMat.dispose();
      ribbonWireGeo.dispose();
      ribbonWireMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}
