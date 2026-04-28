import { useEffect, useRef } from "react";
import * as THREE from "three";
import { FaHome, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const mountRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Setup Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050b1a);
    scene.fog = new THREE.FogExp2(0x050b1a, 0.008);

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 2, 8);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0x404060);
    scene.add(ambientLight);

    // Main light
    const mainLight = new THREE.DirectionalLight(0xffffff, 1);
    mainLight.position.set(5, 10, 7);
    mainLight.castShadow = true;
    mainLight.receiveShadow = true;
    scene.add(mainLight);

    // Fill light
    const fillLight = new THREE.PointLight(0x4466cc, 0.5);
    fillLight.position.set(-2, 3, 4);
    scene.add(fillLight);

    // Back light
    const backLight = new THREE.PointLight(0xff6633, 0.3);
    backLight.position.set(0, 2, -5);
    scene.add(backLight);

    // Floating particles
    const particleCount = 1500;
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesPositions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      particlesPositions[i * 3] = (Math.random() - 0.5) * 40;
      particlesPositions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      particlesPositions[i * 3 + 2] = (Math.random() - 0.5) * 30 - 15;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlesPositions, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x88aaff,
      size: 0.05,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Create 3D Text "404"
    const createTextTexture = (text, color, glowColor) => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      
      ctx.fillStyle = 'rgba(0,0,0,0)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Glow effect
      ctx.shadowBlur = 0;
      ctx.font = 'Bold 240px "Arial"';
      ctx.fillStyle = glowColor;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, canvas.width/2 + 4, canvas.height/2 + 4);
      
      // Main text
      ctx.shadowBlur = 0;
      ctx.font = 'Bold 240px "Arial"';
      ctx.fillStyle = color;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, canvas.width/2, canvas.height/2);
      
      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      return texture;
    };
    
    const textMaterial4 = new THREE.MeshStandardMaterial({
      map: createTextTexture('4', '#ff3366', '#ff6699'),
      emissive: '#331122',
      emissiveIntensity: 0.3,
      metalness: 0.8,
      roughness: 0.2
    });
    
    const textMaterial0 = new THREE.MeshStandardMaterial({
      map: createTextTexture('0', '#ff6633', '#ff9966'),
      emissive: '#331100',
      emissiveIntensity: 0.3,
      metalness: 0.8,
      roughness: 0.2
    });
    
    const textMaterial4b = new THREE.MeshStandardMaterial({
      map: createTextTexture('4', '#ff3366', '#ff6699'),
      emissive: '#331122',
      emissiveIntensity: 0.3,
      metalness: 0.8,
      roughness: 0.2
    });
    
    // Create 3D boxes for numbers
    const createNumberBox = (material, xPos, rotationY) => {
      const geometry = new THREE.BoxGeometry(1.2, 1.2, 0.3);
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(xPos, 0, 0);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.userData = { rotationY };
      return mesh;
    };
    
    const numberGroup = new THREE.Group();
    const num4_1 = createNumberBox(textMaterial4, -1.5, 0);
    const num0 = createNumberBox(textMaterial0, 0, 0);
    const num4_2 = createNumberBox(textMaterial4b, 1.5, 0);
    
    numberGroup.add(num4_1);
    numberGroup.add(num0);
    numberGroup.add(num4_2);
    numberGroup.position.y = 0.5;
    scene.add(numberGroup);
    
    // Floating rings around numbers
    const ringGeometry = new THREE.TorusGeometry(1.8, 0.05, 64, 200);
    const ringMaterial = new THREE.MeshStandardMaterial({
      color: 0xff6699,
      emissive: 0xff3366,
      emissiveIntensity: 0.5,
      metalness: 0.9,
      roughness: 0.1
    });
    
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.position.y = 0.5;
    scene.add(ring);
    
    const ring2Geometry = new THREE.TorusGeometry(2.2, 0.03, 64, 200);
    const ring2Material = new THREE.MeshStandardMaterial({
      color: 0x66ccff,
      emissive: 0x3366ff,
      emissiveIntensity: 0.3,
      metalness: 0.8,
      roughness: 0.2
    });
    
    const ring2 = new THREE.Mesh(ring2Geometry, ring2Material);
    ring2.position.y = 0.5;
    scene.add(ring2);
    
    // Ground plane with glow
    const groundGeometry = new THREE.CircleGeometry(4, 32);
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0x112233,
      emissive: 0x001133,
      emissiveIntensity: 0.2,
      metalness: 0.7,
      roughness: 0.4,
      transparent: true,
      opacity: 0.8
    });
    
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.8;
    ground.receiveShadow = true;
    scene.add(ground);
    
    // Subtle floating cubes around
    const cubes = [];
    const cubeColors = [0xff3366, 0xff6633, 0x66ff33, 0x33ff66, 0x3366ff, 0xff33ff];
    
    for (let i = 0; i < 30; i++) {
      const size = 0.08 + Math.random() * 0.1;
      const cubeGeo = new THREE.BoxGeometry(size, size, size);
      const cubeMat = new THREE.MeshStandardMaterial({
        color: cubeColors[Math.floor(Math.random() * cubeColors.length)],
        emissive: 0x331133,
        emissiveIntensity: 0.2,
        metalness: 0.5,
        roughness: 0.3
      });
      const cube = new THREE.Mesh(cubeGeo, cubeMat);
      
      const angle = Math.random() * Math.PI * 2;
      const radius = 2.5 + Math.random() * 1.5;
      cube.position.x = Math.cos(angle) * radius;
      cube.position.z = Math.sin(angle) * radius;
      cube.position.y = -0.5 + Math.random() * 2;
      
      cube.userData = {
        angle: angle,
        radius: radius,
        speed: 0.005 + Math.random() * 0.01,
        ySpeed: 0.005 + Math.random() * 0.01,
        yPos: cube.position.y
      };
      
      cube.castShadow = true;
      scene.add(cube);
      cubes.push(cube);
    }
    
    // Animation variables
    let time = 0;
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;
      
      // Rotate number group
      numberGroup.rotation.y = Math.sin(time * 0.3) * 0.3;
      numberGroup.position.y = 0.5 + Math.sin(time * 1.5) * 0.05;
      
      // Rotate rings
      ring.rotation.x = Math.sin(time * 0.5) * 0.2;
      ring.rotation.z = time * 0.3;
      ring.rotation.y = time * 0.2;
      
      ring2.rotation.x = Math.cos(time * 0.4) * 0.15;
      ring2.rotation.z = -time * 0.25;
      ring2.rotation.y = time * 0.15;
      
      // Animate floating cubes
      cubes.forEach(cube => {
        cube.userData.angle += cube.userData.speed;
        cube.position.x = Math.cos(cube.userData.angle) * cube.userData.radius;
        cube.position.z = Math.sin(cube.userData.angle) * cube.userData.radius;
        cube.position.y = cube.userData.yPos + Math.sin(time * cube.userData.ySpeed * 10) * 0.1;
        cube.rotation.x += 0.03;
        cube.rotation.y += 0.04;
        cube.rotation.z += 0.02;
      });
      
      // Animate particles
      particles.rotation.y += 0.001;
      particles.rotation.x = Math.sin(time * 0.1) * 0.05;
      
      // Camera movement
      camera.position.x = Math.sin(time * 0.1) * 0.3;
      camera.position.y = 2 + Math.sin(time * 0.2) * 0.05;
      camera.lookAt(0, 0.5, 0);
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);
  
  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-gray-900 to-black">
      <div ref={mountRef} className="absolute inset-0" />
      
      {/* Overlay content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
        <div className="text-center transform translate-y-32">
          <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-pink-500 via-orange-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
            404
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mt-4 font-light">
            Oops! Halaman yang Anda cari tidak ditemukan
          </p>
          <div className="mt-8 flex gap-4 justify-center pointer-events-auto">
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-gradient-to-r from-pink-600 to-orange-600 text-white rounded-lg font-semibold hover:from-pink-700 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
            >
              <FaHome /> Kembali ke Beranda
              </button>
              <button
              onClick={() => navigate(-1)}
              className="px-6 py-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
            >
              <FaArrowLeft /> Halaman Sebelumnya
            </button>
          </div>
        </div>
      </div>
      
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}