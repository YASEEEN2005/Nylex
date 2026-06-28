"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function CanvasBackground() {
  const containerRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Dimensions
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 250;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Create custom particle textures
    const createParticleTexture = (color1, color2) => {
      const canvas = document.createElement("canvas");
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext("2d");
      
      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.2, color1);
      gradient.addColorStop(0.6, color2);
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 32, 32);
      
      return new THREE.CanvasTexture(canvas);
    };

    const blueTexture = createParticleTexture("rgba(139, 94, 60, 0.5)", "rgba(139, 94, 60, 0)");
    const purpleTexture = createParticleTexture("rgba(237, 229, 219, 0.6)", "rgba(237, 229, 219, 0)");

    // Particles Group 1 (Blue)
    const particleCount = 600;
    const geometry1 = new THREE.BufferGeometry();
    const positions1 = new Float32Array(particleCount * 3);
    const originalPositions1 = new Float32Array(particleCount * 3);
    const randomScales1 = new Float32Array(particleCount);

    for (let i = 0; i < particleCount * 3; i += 3) {
      // Create a sphere distribution or cloud distribution
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const distance = 50 + Math.random() * 200;

      const x = distance * Math.sin(phi) * Math.cos(theta);
      const y = distance * Math.sin(phi) * Math.sin(theta);
      const z = (Math.random() - 0.5) * 100;

      positions1[i] = x;
      positions1[i + 1] = y;
      positions1[i + 2] = z;

      originalPositions1[i] = x;
      originalPositions1[i + 1] = y;
      originalPositions1[i + 2] = z;

      randomScales1[i / 3] = 0.5 + Math.random() * 1.5;
    }

    geometry1.setAttribute("position", new THREE.BufferAttribute(positions1, 3));

    const material1 = new THREE.PointsMaterial({
      size: 4,
      map: blueTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles1 = new THREE.Points(geometry1, material1);
    scene.add(particles1);

    // Particles Group 2 (Purple)
    const geometry2 = new THREE.BufferGeometry();
    const positions2 = new Float32Array(particleCount * 3);
    const originalPositions2 = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const distance = 50 + Math.random() * 200;

      const x = distance * Math.sin(phi) * Math.cos(theta);
      const y = distance * Math.sin(phi) * Math.sin(theta);
      const z = (Math.random() - 0.5) * 100;

      positions2[i] = x;
      positions2[i + 1] = y;
      positions2[i + 2] = z;

      originalPositions2[i] = x;
      originalPositions2[i + 1] = y;
      originalPositions2[i + 2] = z;
    }

    geometry2.setAttribute("position", new THREE.BufferAttribute(positions2, 3));

    const material2 = new THREE.PointsMaterial({
      size: 6,
      map: purpleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles2 = new THREE.Points(geometry2, material2);
    scene.add(particles2);

    // Mouse Tracking
    const handleMouseMove = (event) => {
      mouse.current.targetX = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.targetY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop using performance.now() to avoid deprecated THREE.Clock warning
    const startTime = performance.now();

    const animate = () => {
      requestAnimationFrame(animate);

      const time = (performance.now() - startTime) * 0.001 * 0.15;

      // Dampen mouse movements
      mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.05;
      mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.05;

      // Rotate whole scenes
      particles1.rotation.y = time * 0.2;
      particles1.rotation.x = time * 0.1;
      
      particles2.rotation.y = -time * 0.15;
      particles2.rotation.x = -time * 0.05;

      // Animate Individual Particles (Group 1)
      const pos1Arr = geometry1.attributes.position.array;
      const orig1Arr = originalPositions1;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const oX = orig1Arr[i3];
        const oY = orig1Arr[i3 + 1];
        const oZ = orig1Arr[i3 + 2];

        // Cosmic wave drift
        const waveX = Math.sin(time + oY * 0.01) * 3;
        const waveY = Math.cos(time + oX * 0.01) * 3;

        // Mouse displacement
        // Convert three space to screen space
        const pVector = new THREE.Vector3(oX + waveX, oY + waveY, oZ);
        pVector.applyEuler(particles1.rotation);

        // Calculate distance from screen mouse
        const mX = mouse.current.x * 250;
        const mY = mouse.current.y * 150;

        const dX = pVector.x - mX;
        const dY = pVector.y - mY;
        const distance = Math.sqrt(dX * dX + dY * dY);

        let forceX = 0;
        let forceY = 0;

        if (distance < 80) {
          const repelFactor = (80 - distance) / 80;
          forceX = (dX / distance) * repelFactor * 15;
          forceY = (dY / distance) * repelFactor * 15;
        }

        pos1Arr[i3] = oX + waveX + forceX;
        pos1Arr[i3 + 1] = oY + waveY + forceY;
      }
      geometry1.attributes.position.needsUpdate = true;

      // Animate Individual Particles (Group 2)
      const pos2Arr = geometry2.attributes.position.array;
      const orig2Arr = originalPositions2;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const oX = orig2Arr[i3];
        const oY = orig2Arr[i3 + 1];
        const oZ = orig2Arr[i3 + 2];

        const waveX = Math.cos(time * 0.8 + oY * 0.01) * 4;
        const waveY = Math.sin(time * 0.8 + oX * 0.01) * 4;

        const pVector = new THREE.Vector3(oX + waveX, oY + waveY, oZ);
        pVector.applyEuler(particles2.rotation);

        const mX = mouse.current.x * 250;
        const mY = mouse.current.y * 150;

        const dX = pVector.x - mX;
        const dY = pVector.y - mY;
        const distance = Math.sqrt(dX * dX + dY * dY);

        let forceX = 0;
        let forceY = 0;

        if (distance < 90) {
          const repelFactor = (90 - distance) / 90;
          forceX = (dX / distance) * repelFactor * 20;
          forceY = (dY / distance) * repelFactor * 20;
        }

        pos2Arr[i3] = oX + waveX + forceX;
        pos2Arr[i3 + 1] = oY + waveY + forceY;
      }
      geometry2.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Clean up
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      geometry1.dispose();
      material1.dispose();
      blueTexture.dispose();
      geometry2.dispose();
      material2.dispose();
      purpleTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 bg-transparent overflow-hidden pointer-events-none"
    />
  );
}
