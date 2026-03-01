// COLOR PALETTE
const palette = {
  gold: new BABYLON.Color3(0.788, 0.659, 0.427),
  rose: new BABYLON.Color3(0.769, 0.635, 0.635),
  dark: new BABYLON.Color3(0.055, 0.047, 0.063),
};

// ============================================
// METHOD 1: BABYLON.JS - Relationship Cycles
// ============================================
function initBabylonScene() {
  const canvas = document.getElementById('babylonCanvas');
  if (!canvas) return;
  
  const engine = new BABYLON.Engine(canvas, true);
  const scene = new BABYLON.Scene(engine);
  scene.clearColor = new BABYLON.Color4(0.03, 0.03, 0.06, 0);
  
  // Camera
  const camera = new BABYLON.ArcRotateCamera('Camera', 0, 0.8, 8, BABYLON.Vector3.Zero(), scene);
  camera.attachControl(canvas, true);
  camera.angularSensibilityX = 500;
  camera.angularSensibilityY = 500;
  
  // Lighting
  const light1 = new BABYLON.PointLight('pointLight', new BABYLON.Vector3(5, 5, 5), scene);
  light1.intensity = 0.8;
  light1.diffuse = palette.gold;
  
  const light2 = new BABYLON.HemisphericLight('hemiLight', new BABYLON.Vector3(0, 1, 0), scene);
  light2.intensity = 0.4;
  
  // Central sphere
  const centralSphere = BABYLON.MeshBuilder.CreateSphere('central', { diameter: 2, segments: 32 }, scene);
  const centralMat = new BABYLON.StandardMaterial('centralMat', scene);
  centralMat.emissiveColor = palette.gold;
  centralMat.specularColor = new BABYLON.Color3(1, 1, 1);
  centralMat.specularPower = 32;
  centralSphere.material = centralMat;
  
  // Orbiting sphere
  const orbitSphere = BABYLON.MeshBuilder.CreateSphere('orbit', { diameter: 0.6, segments: 16 }, scene);
  const orbitMat = new BABYLON.StandardMaterial('orbitMat', scene);
  orbitMat.emissiveColor = palette.rose;
  orbitMat.specularColor = new BABYLON.Color3(1, 1, 1);
  orbitSphere.material = orbitMat;
  
  // Orbit torus
  const orbitTorus = BABYLON.MeshBuilder.CreateTorus('orbitLine', { diameter: 6, thickness: 0.1 }, scene);
  const orbitLineMat = new BABYLON.StandardMaterial('orbitLineMat', scene);
  orbitLineMat.emissiveColor = palette.gold;
  orbitLineMat.alpha = 0.3;
  orbitTorus.material = orbitLineMat;
  
  // Animation
  scene.registerBeforeRender(() => {
    centralSphere.rotation.x += 0.001;
    centralSphere.rotation.y += 0.002;
    
    const time = Date.now() * 0.0003;
    orbitSphere.position.x = Math.cos(time) * 3;
    orbitSphere.position.z = Math.sin(time) * 3;
    orbitSphere.rotation.x += 0.01;
    
    orbitTorus.rotation.z += 0.0005;
  });
  
  window.addEventListener('resize', () => engine.resize());
  engine.runRenderLoop(() => scene.render());
}

// ============================================
// METHOD 2: THREE.JS - Family Pressure Waves
// ============================================
function initThreeScene() {
  const canvas = document.getElementById('threeCanvas');
  if (!canvas) return;
  
  // Check if Three.js is loaded
  if (typeof THREE === 'undefined') {
    // Load Three.js dynamically
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.onload = () => initThreeScene();
    document.head.appendChild(script);
    return;
  }
  
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setClearColor(0x000000, 0);
  camera.position.z = 6;
  
  // Spiral
  const spiralGeom = new THREE.BufferGeometry();
  const spiralPoints = [];
  for (let i = 0; i < 200; i++) {
    const t = i / 50;
    const r = 0.5 + t * 0.8;
    const x = r * Math.cos(t * Math.PI * 4);
    const y = r * Math.sin(t * Math.PI * 4);
    const z = (t - 1) * 2;
    spiralPoints.push(new THREE.Vector3(x, y, z));
  }
  spiralGeom.setFromPoints(spiralPoints);
  const spiralMat = new THREE.LineBasicMaterial({ color: 0xc4a2a2, linewidth: 2 });
  const spiral = new THREE.Line(spiralGeom, spiralMat);
  scene.add(spiral);
  
  // Particles
  const particleCount = 30;
  const particleGeom = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    const t = i / particleCount;
    const r = 0.5 + t * 0.8;
    const angle = t * Math.PI * 8;
    particlePositions[i * 3] = r * Math.cos(angle);
    particlePositions[i * 3 + 1] = r * Math.sin(angle);
    particlePositions[i * 3 + 2] = (t - 1) * 2;
  }
  particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
  const particleMat = new THREE.PointsMaterial({ color: 0xc9a96e, size: 0.15 });
  const particles = new THREE.Points(particleGeom, particleMat);
  scene.add(particles);
  
  // Lighting
  const light = new THREE.PointLight(0xc4a2a2, 1);
  light.position.set(5, 5, 5);
  scene.add(light);
  scene.add(new THREE.AmbientLight(0xffffff, 0.4));
  
  function animate() {
    requestAnimationFrame(animate);
    spiral.rotation.z += 0.002;
    particles.rotation.z += 0.003;
    renderer.render(scene, camera);
  }
  
  window.addEventListener('resize', () => {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  });
  
  animate();
}

// ============================================
// METHOD 3: CESIUM.JS - Career Expansion
// ============================================
function initCesiumScene() {
  const container = document.getElementById('cesiumContainer');
  if (!container || typeof Cesium === 'undefined') {
    // Load Cesium dynamically if needed
    if (typeof Cesium === 'undefined') {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cesium.com/downloads/cesiumjs/releases/1.104/Widgets/widgets.css';
      document.head.appendChild(link);
      
      const script = document.createElement('script');
      script.src = 'https://cesium.com/downloads/cesiumjs/releases/1.104/Cesium.js';
      script.onload = () => initCesiumScene();
      document.head.appendChild(script);
      return;
    }
  }
  
  Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlNjczNDdkNi01MjAwLTQzZjctOGUxNi01ZTcwMDc2OTNkMGMiLCJpZCI6NzU4NDAsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE2Mjg3MTMyNzd9.zMbmH7A_mDXLiMeKx8AYHrk2TgS4YXGKXoLi-lkJP5w';
  
  const viewer = new Cesium.Viewer(container, {
    baseLayerPicker: false,
    fullscreenButton: false,
    homeButton: false,
    infoBox: false,
    selectionIndicator: false,
    sceneModePicker: false,
    timeline: false,
    navigationHelpButton: false,
    geocoder: false,
    navigationInstructionsInitiallyVisible: false,
    skyBox: false,
    skyAtmosphere: false,
  });
  
  viewer.scene.backgroundColor = Cesium.Color.fromCssColorString('rgba(8, 8, 8, 0)');
  
  // Stars
  const stars = [];
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const entity = viewer.entities.add({
      position: Cesium.Cartesian3.fromDegrees(angle * 10, 20, 1000000),
      sphere: {
        radius: 50000,
        material: Cesium.Color.fromCssColorString('rgba(201, 169, 110, 0.8)'),
        outline: false,
      },
    });
    stars.push({ entity, angle });
  }
  
  viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(0, 0, 2000000),
  });
}

// ============================================
// INITIALIZE ALL
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // Try to initialize Babylon.js first (default)
  setTimeout(() => {
    if (typeof BABYLON !== 'undefined') {
      initBabylonScene();
    } else {
      console.log('Babylon.js not loaded yet');
    }
  }, 500);
  
  // Initialize Three.js
  setTimeout(() => initThreeScene(), 600);
});

// ============================================
// METHOD SWITCHER
// ============================================
function switchMethod(method) {
  // Update button states
  document.querySelectorAll('.method-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  document.querySelector(`[data-method="${method}"]`).classList.add('active');
  
  // Show/hide containers
  const items = document.querySelectorAll('.phase-item');
  items.forEach((item, index) => {
    const container = item.querySelector('.phase-3d-container');
    container.style.display = 'block';
  });
  
  console.log('Switched to method:', method);
}
