import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Water } from 'three/examples/jsm/objects/Water.js';

interface ThreeOceanProps {
  currentSection: number;
  isDiving?: boolean;
}

export const ThreeOcean: React.FC<ThreeOceanProps> = ({ currentSection, isDiving }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const waterRef = useRef<Water | null>(null);
  const animFrameId = useRef<number | null>(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // Exact Scene Setup from user's attached code
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x331100, 100, 2000);
    sceneRef.current = scene;

    // Exact Camera Setup
    const camera = new THREE.PerspectiveCamera(55, width / height, 1, 20000);
    camera.position.set(0, 30, 100);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Exact Renderer Setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.innerWidth < 820 ? 1.5 : 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.9;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Exact Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffaa66, 0.7);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.3);
    directionalLight.position.set(100, 100, 50);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xff9944, 1.5, 500);
    pointLight.position.set(0, 50, 0);
    scene.add(pointLight);

    // Underwater additional lighting from user's code
    const underLight1 = new THREE.PointLight(0xff9944, 1.2, 400);
    underLight1.position.set(-80, 30, -120);
    scene.add(underLight1);

    const underLight2 = new THREE.PointLight(0xff9944, 1.2, 400);
    underLight2.position.set(80, 30, -120);
    scene.add(underLight2);

    // Exact Water Geometry and Normals
    const waterGeometry = new THREE.PlaneGeometry(10000, 10000);
    const textureLoader = new THREE.TextureLoader();
    const waterNormals = textureLoader.load(
      'https://threejs.org/examples/textures/waternormals.jpg',
      function (texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      }
    );

    const water = new Water(waterGeometry, {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: waterNormals,
      sunDirection: new THREE.Vector3(1, 1, 0.5).normalize(),
      sunColor: 0xffaa44,
      waterColor: 0xff7733,
      distortionScale: 3.7,
      fog: true,
      side: THREE.DoubleSide,
    });
    water.rotation.x = -Math.PI / 2;
    water.position.y = 0;
    scene.add(water);
    waterRef.current = water;

    // Exact Sky Sphere (Dark Cosmic Navy)
    const sky = new THREE.Mesh(
      new THREE.SphereGeometry(5000, 32, 32),
      new THREE.MeshBasicMaterial({
        color: 0x000814,
        side: THREE.BackSide,
        fog: false,
      })
    );
    scene.add(sky);

    // Exact Underwater Ambient Sphere from user's code (Deep Amber/Brown)
    const underwaterSphere = new THREE.Mesh(
      new THREE.SphereGeometry(2000, 32, 32),
      new THREE.MeshBasicMaterial({
        color: 0x4d2200,
        side: THREE.BackSide,
        fog: false,
      })
    );
    scene.add(underwaterSphere);

    // Resize Handler
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Exact Animation Loop with gentle sway
    const animate = () => {
      animFrameId.current = requestAnimationFrame(animate);
      if (document.hidden) return;

      timeRef.current += 0.01;
      const t = timeRef.current;

      if (waterRef.current) {
        waterRef.current.material.uniforms['time'].value += 0.6 / 60.0;
      }

      // Dynamic underwater camera motion from user's code
      if (cameraRef.current) {
        if (currentSection === 1) {
          cameraRef.current.position.x = Math.sin(t * 0.2) * 3;
          cameraRef.current.position.z = Math.cos(t * 0.15) * 3;
          cameraRef.current.position.y = -30 + Math.sin(t * 0.3) * 2;
          cameraRef.current.lookAt(
            Math.sin(t * 0.3) * 10,
            5 + Math.cos(t * 0.2) * 3,
            Math.sin(t * 0.15) * 10
          );
        } else if (currentSection === 2) {
          cameraRef.current.position.x = Math.sin(t * 0.25) * 4;
          cameraRef.current.position.z = Math.cos(t * 0.18) * 4;
          cameraRef.current.position.y = -25 + Math.sin(t * 0.35) * 2.5;
          cameraRef.current.lookAt(
            Math.sin(t * 0.35) * 12,
            6 + Math.cos(t * 0.25) * 4,
            Math.sin(t * 0.18) * 12
          );
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      waterGeometry.dispose();
      sky.geometry.dispose();
      underwaterSphere.geometry.dispose();
      if (container) container.innerHTML = '';
    };
  }, []);

  // Camera viewpoint response for dive in and section changes
  useEffect(() => {
    const camera = cameraRef.current;
    const water = waterRef.current;
    if (!camera || !water) return;

    if (isDiving) {
      // Smooth plunge into the water surface
      camera.position.set(0, 5, 10);
      camera.lookAt(0, -5, -50);
      water.material.uniforms['distortionScale'].value = 7.0;
      return;
    }

    if (currentSection === 0) {
      // Exact original hero viewpoint
      camera.position.set(0, 30, 100);
      camera.lookAt(0, 0, 0);
      water.material.uniforms['distortionScale'].value = 3.7;
      water.material.uniforms['waterColor'].value.setHex(0xff7733);
    } else if (currentSection === 1) {
      // Underwater viewpoint looking up at surface (exact original concept scene)
      camera.position.set(0, -30, 0);
      camera.lookAt(0, 5, 0);
      water.material.uniforms['distortionScale'].value = 4.5;
      water.material.uniforms['waterColor'].value.setHex(0xff7733);
    } else if (currentSection === 2) {
      camera.position.set(0, -25, 0);
      camera.lookAt(0, 6, 0);
      water.material.uniforms['distortionScale'].value = 4.0;
      water.material.uniforms['waterColor'].value.setHex(0xff7733);
    } else {
      camera.position.set(0, -25, 0);
      camera.lookAt(0, 6, 0);
      water.material.uniforms['distortionScale'].value = 4.0;
      water.material.uniforms['waterColor'].value.setHex(0xff7733);
    }
  }, [currentSection, isDiving]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{
        opacity: currentSection <= 2 ? 1 : 0.35,
        transition: 'opacity 0.8s ease-out',
        pointerEvents: 'none',
      }}
    />
  );
};
