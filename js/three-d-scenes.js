// Three.js 3D Scenes - Luxury Edition
// Color palette
const colors = {
  gold: 0xc9a96e,
  rose: 0xc4a2a2,
  darkBg: 0x080808,
};

// ============================================
// SCENE 1: MOON - Relationship Cycles
// ============================================
function createMoonScene() {
  const canvas = document.getElementById('canvas-moon');
  if (!canvas) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });

  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  camera.position.z = 3;

  // Main moon
  const moonGeometry = new THREE.SphereGeometry(1, 64, 64);
  const moonMaterial = new THREE.MeshStandardMaterial({
    color: colors.gold,
    metalness: 0.3,
    roughness: 0.7,
    emissive: colors.gold,
    emissiveIntensity: 0.3,
  });
  const moon = new THREE.Mesh(moonGeometry, moonMaterial);
  scene.add(moon);

  // Lighting
  const light1 = new THREE.PointLight(colors.gold, 1.5);
  light1.position.set(3, 3, 3);
  scene.add(light1);

  const light2 = new THREE.PointLight(colors.rose, 0.8);
  light2.position.set(-3, -3, 2);
  scene.add(light2);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    moon.rotation.x += 0.001;
    moon.rotation.y += 0.002;
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
// SCENE 2: SPIRAL - Family Pressure Waves
// ============================================
function createSpiralScene() {
  const canvas = document.getElementById('canvas-spiral');
  if (!canvas) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });

  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  camera.position.z = 4;

  // Create spiral curve
  const spiralGeometry = new THREE.BufferGeometry();
  const spiralPoints = [];

  for (let i = 0; i < 200; i++) {
    const t = i / 50;
    const radius = 0.5 + t * 0.8;
    const angle = t * Math.PI * 4;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    const z = (t - 1) * 2;
    spiralPoints.push(new THREE.Vector3(x, y, z));
  }

  spiralGeometry.setFromPoints(spiralPoints);
  const spiralMaterial = new THREE.LineBasicMaterial({
    color: colors.rose,
    linewidth: 2,
    fog: false,
  });
  const spiral = new THREE.Line(spiralGeometry, spiralMaterial);
  scene.add(spiral);

  // Add spheres along spiral
  for (let i = 0; i < 15; i++) {
    const t = i / 15;
    const radius = 0.5 + t * 0.8;
    const angle = t * Math.PI * 4;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    const z = (t - 1) * 2;

    const sphereGeometry = new THREE.SphereGeometry(0.12, 16, 16);
    const sphereMaterial = new THREE.MeshStandardMaterial({
      color: colors.gold,
      metalness: 0.4,
      roughness: 0.6,
      emissive: colors.gold,
      emissiveIntensity: 0.2,
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(x, y, z);
    scene.add(sphere);
  }

  // Lighting
  const light1 = new THREE.PointLight(colors.rose, 1.2);
  light1.position.set(2, 2, 2);
  scene.add(light1);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  function animate() {
    requestAnimationFrame(animate);
    spiral.rotation.z += 0.003;
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
// SCENE 3: CONSTELLATION - Career Expansion
// ============================================
function createStarsScene() {
  const canvas = document.getElementById('canvas-stars');
  if (!canvas) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });

  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  camera.position.z = 3;

  const stars = [];

  // Create stars in a constellation pattern
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const radius = 1.5 + Math.sin(i * 0.7) * 0.5;

    const starGeometry = new THREE.SphereGeometry(0.2, 32, 32);
    const starMaterial = new THREE.MeshStandardMaterial({
      color: colors.gold,
      metalness: 0.5,
      roughness: 0.5,
      emissive: colors.gold,
      emissiveIntensity: 0.6,
    });
    const star = new THREE.Mesh(starGeometry, starMaterial);
    star.position.set(radius * Math.cos(angle), radius * Math.sin(angle), 0);
    scene.add(star);
    stars.push(star);
  }

  // Connect stars with lines
  const lineGeometry = new THREE.BufferGeometry();
  const linePoints = [];

  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const nextAngle = ((i + 1) / 8) * Math.PI * 2;
    const radius = 1.5 + Math.sin(i * 0.7) * 0.5;
    const nextRadius = 1.5 + Math.sin((i + 1) * 0.7) * 0.5;

    linePoints.push(
      new THREE.Vector3(radius * Math.cos(angle), radius * Math.sin(angle), 0),
      new THREE.Vector3(nextRadius * Math.cos(nextAngle), nextRadius * Math.sin(nextAngle), 0)
    );
  }

  lineGeometry.setFromPoints(linePoints);
  const lineMaterial = new THREE.LineBasicMaterial({
    color: colors.rose,
    transparent: true,
    opacity: 0.6,
  });
  const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
  scene.add(lines);

  // Lighting
  const light1 = new THREE.PointLight(colors.gold, 1.5);
  light1.position.set(2, 2, 2);
  scene.add(light1);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  function animate() {
    requestAnimationFrame(animate);

    stars.forEach((star, i) => {
      star.rotation.x += 0.01;
      star.rotation.y += 0.015;
      const pulse = 1 + Math.sin(Date.now() * 0.003 + i) * 0.1;
      star.scale.set(pulse, pulse, pulse);
    });

    lines.rotation.z += 0.001;
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
// SCENE 4: WAVES - Recovery Seasons
// ============================================
function createWavesScene() {
  const canvas = document.getElementById('canvas-waves');
  if (!canvas) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });

  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  camera.position.z = 2.5;

  // Create wave geometry
  const geometry = new THREE.PlaneGeometry(6, 4, 128, 32);
  const material = new THREE.MeshStandardMaterial({
    color: colors.rose,
    metalness: 0.3,
    roughness: 0.6,
    emissive: colors.rose,
    emissiveIntensity: 0.2,
    wireframe: false,
  });
  const wave = new THREE.Mesh(geometry, material);
  scene.add(wave);

  const positionAttribute = geometry.getAttribute('position');
  const originalPositions = positionAttribute.array.slice();

  // Lighting
  const light1 = new THREE.PointLight(colors.rose, 1.2);
  light1.position.set(2, 2, 2);
  scene.add(light1);

  const light2 = new THREE.PointLight(colors.gold, 0.8);
  light2.position.set(-2, -2, 2);
  scene.add(light2);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  function animate() {
    requestAnimationFrame(animate);

    const time = Date.now() * 0.0008;
    const positions = geometry.attributes.position.array;

    for (let i = 0; i < positions.length; i += 3) {
      const x = originalPositions[i];
      const y = originalPositions[i + 1];

      positions[i + 2] = Math.sin((x * 0.5 + time) * 1.5) * 0.3 * Math.cos((y * 0.5 + time) * 1.5);
    }

    geometry.attributes.position.needsUpdate = true;
    wave.rotation.x += 0.0003;

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
// INITIALIZE ALL SCENES
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    createMoonScene();
    createSpiralScene();
    createStarsScene();
    createWavesScene();
  }, 300);
});
