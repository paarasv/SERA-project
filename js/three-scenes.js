// Three.js 3D Scenes for SERA Phases
const scenes = {};

// Color palette matching SERA
const colors = {
  gold: 0xc9a96e,
  rose: 0xc4a2a2,
  dark: 0x0e0c10,
  light: 0xe8e2da,
};

// === RELATIONSHIP CYCLES - Lunar Orbit ===
function createRelationshipScene() {
  const canvas = document.getElementById('canvas-relationship');
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setClearColor(0x000000, 0);
  camera.position.z = 5;
  
  // Central sphere
  const centralGeom = new THREE.IcosahedronGeometry(1, 4);
  const centralMat = new THREE.MeshPhongMaterial({ color: colors.gold, emissive: colors.gold, emissiveIntensity: 0.3 });
  const central = new THREE.Mesh(centralGeom, centralMat);
  scene.add(central);
  
  // Orbiting moon
  const moonGeom = new THREE.SphereGeometry(0.3, 32, 32);
  const moonMat = new THREE.MeshPhongMaterial({ color: colors.rose, emissive: colors.rose, emissiveIntensity: 0.2 });
  const moon = new THREE.Mesh(moonGeom, moonMat);
  scene.add(moon);
  
  // Orbit line
  const orbitGeom = new THREE.BufferGeometry();
  const orbitPoints = [];
  for (let i = 0; i <= 64; i++) {
    const angle = (i / 64) * Math.PI * 2;
    orbitPoints.push(new THREE.Vector3(Math.cos(angle) * 3, Math.sin(angle) * 3, 0));
  }
  orbitGeom.setFromPoints(orbitPoints);
  const orbitMat = new THREE.LineBasicMaterial({ color: colors.gold, transparent: true, opacity: 0.3 });
  const orbit = new THREE.Line(orbitGeom, orbitMat);
  scene.add(orbit);
  
  // Lighting
  const light = new THREE.PointLight(colors.gold, 1);
  light.position.set(5, 5, 5);
  scene.add(light);
  scene.add(new THREE.AmbientLight(0xffffff, 0.4));
  
  function animate() {
    requestAnimationFrame(animate);
    central.rotation.x += 0.002;
    central.rotation.y += 0.003;
    
    const time = Date.now() * 0.0005;
    moon.position.x = Math.cos(time) * 3;
    moon.position.y = Math.sin(time) * 3;
    moon.rotation.x += 0.01;
    
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

// === FAMILY PRESSURE WAVES - Spiral Growth ===
function createFamilyScene() {
  const canvas = document.getElementById('canvas-family');
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setClearColor(0x000000, 0);
  camera.position.z = 6;
  
  // Spiral geometry
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
  const spiralMat = new THREE.LineBasicMaterial({ color: colors.rose, linewidth: 2 });
  const spiral = new THREE.Line(spiralGeom, spiralMat);
  scene.add(spiral);
  
  // Particles along spiral
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
  const particleMat = new THREE.PointsMaterial({ color: colors.gold, size: 0.15 });
  const particles = new THREE.Points(particleGeom, particleMat);
  scene.add(particles);
  
  const light = new THREE.PointLight(colors.rose, 1);
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

// === CAREER EXPANSION - Rising Constellation ===
function createCareerScene() {
  const canvas = document.getElementById('canvas-career');
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setClearColor(0x000000, 0);
  camera.position.z = 6;
  
  // Star positions
  const stars = [];
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const r = 2 + Math.sin(i) * 0.5;
    const starGeom = new THREE.SphereGeometry(0.25, 16, 16);
    const starMat = new THREE.MeshPhongMaterial({ color: colors.gold, emissive: colors.gold, emissiveIntensity: 0.5 });
    const star = new THREE.Mesh(starGeom, starMat);
    star.position.set(r * Math.cos(angle), r * Math.sin(angle), 0);
    stars.push(star);
    scene.add(star);
  }
  
  // Connecting lines
  const lineGeom = new THREE.BufferGeometry();
  const linePoints = [];
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const nextAngle = ((i + 1) / 8) * Math.PI * 2;
    const r = 2 + Math.sin(i) * 0.5;
    const nextR = 2 + Math.sin((i + 1) % 8) * 0.5;
    linePoints.push(new THREE.Vector3(r * Math.cos(angle), r * Math.sin(angle), 0));
    linePoints.push(new THREE.Vector3(nextR * Math.cos(nextAngle), nextR * Math.sin(nextAngle), 0));
  }
  lineGeom.setFromPoints(linePoints);
  const lineMat = new THREE.LineBasicMaterial({ color: colors.rose, transparent: true, opacity: 0.5 });
  const constellation = new THREE.LineSegments(lineGeom, lineMat);
  scene.add(constellation);
  
  const light = new THREE.PointLight(colors.gold, 1);
  light.position.set(5, 5, 5);
  scene.add(light);
  scene.add(new THREE.AmbientLight(0xffffff, 0.4));
  
  function animate() {
    requestAnimationFrame(animate);
    stars.forEach((star, i) => {
      star.rotation.x += 0.01;
      star.rotation.y += 0.015;
      star.position.y += Math.sin(Date.now() * 0.0005 + i) * 0.002;
    });
    constellation.rotation.z += 0.001;
    
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

// === RECOVERY SEASONS - Wave Resonance ===
function createRecoveryScene() {
  const canvas = document.getElementById('canvas-recovery');
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setClearColor(0x000000, 0);
  camera.position.z = 5;
  
  // Wave geometry
  const geometry = new THREE.PlaneGeometry(10, 4, 64, 16);
  const material = new THREE.MeshPhongMaterial({
    color: colors.rose,
    wireframe: false,
    emissive: colors.rose,
    emissiveIntensity: 0.2,
  });
  const wave = new THREE.Mesh(geometry, material);
  scene.add(wave);
  
  const light = new THREE.PointLight(colors.rose, 1);
  light.position.set(5, 5, 5);
  scene.add(light);
  scene.add(new THREE.AmbientLight(0xffffff, 0.4));
  
  const originalPositions = geometry.attributes.position.array.slice();
  
  function animate() {
    requestAnimationFrame(animate);
    
    const time = Date.now() * 0.001;
    const positions = geometry.attributes.position.array;
    
    for (let i = 0; i < positions.length; i += 3) {
      const x = originalPositions[i];
      const y = originalPositions[i + 1];
      positions[i + 2] = Math.sin((x * 0.5 + time) * 2) * 0.3 * Math.cos((y + time) * 2);
    }
    geometry.attributes.position.needsUpdate = true;
    
    wave.rotation.x += 0.0005;
    
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

// Initialize all scenes when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Check if Three.js is loaded
  if (typeof THREE !== 'undefined') {
    setTimeout(() => {
      if (document.getElementById('canvas-relationship')) createRelationshipScene();
      if (document.getElementById('canvas-family')) createFamilyScene();
      if (document.getElementById('canvas-career')) createCareerScene();
      if (document.getElementById('canvas-recovery')) createRecoveryScene();
    }, 100);
  }
});
