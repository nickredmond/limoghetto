import {
  SphereGeometry,
  MeshBasicMaterial,
  Mesh
} from 'three'

let scene;
let isEnemyTimeout = false

export function initEnemies(scn) {
  scene = scn
}

function addEnemy() {
  const dist = 15
  const x1 = 0
  const y1 = 5
  const z1 = 5
  const x2 = Math.random() * 2 * dist - dist
  const y2 = Math.random() * dist
  const z2 = Math.sqrt(
    (dist * dist) - 
    ((x2 - x1) * (x2 - x1)) - 
    ((y2 - y1) * (y2 - y1))
  ) + z1
  
  const geometry = new SphereGeometry(1);
  const material = new MeshBasicMaterial({
    color: 0xff0000
  });
  const sphere = new Mesh(geometry, material);
  sphere.position.x = x2
  sphere.position.y = y2
  sphere.position.z = -z2
  scene.add(sphere);
}

export function updateEnemies() {
  if (!isEnemyTimeout) {
    isEnemyTimeout = true
    addEnemy()
    const enemyTimeout = Math.random() * 1000 + 200
    setTimeout(function() {
      isEnemyTimeout = false
    }, enemyTimeout)
  }
}