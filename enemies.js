import {
  SphereGeometry,
  MeshStandardMaterial,
  Mesh,
  Vector3
} from 'three'
import { removeObject3D } from './utils.js'

let scene;
let isEnemyTimeout = false

export function initEnemies(scn) {
  scene = scn
}

function addEnemy() {
  const dist = 100
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
  
  const geometry = new SphereGeometry(2);
  const material = new MeshStandardMaterial({
    color: 0xff0000
  });
  
  const enemyLoc = new Vector3(x2, y2, z2)
  const playerLoc = new Vector3(x1, y1, z1)
  const direction = new Vector3()
  direction.subVectors(playerLoc, enemyLoc).normalize()
  
  const sphere = new Mesh(geometry, material);
  sphere.position.x = x2 
  sphere.position.y = y2
  sphere.position.z = -z2
  scene.add(sphere);
  
  direction.x *= 0.5
  direction.y *= 0.5
  direction.z *= 0.5
  const interval = setInterval(() => {
   sphere.position.x += direction.x
   sphere.position.y += direction.y
   sphere.position.z -= direction.z
   if (sphere.position.z >= 5) {
     removeObject3D(sphere)
     clearInterval(interval)
   }
  }, 1000 / 60)
}

export function updateEnemies() {
  if (!isEnemyTimeout) {
    isEnemyTimeout = true
    addEnemy()
    const enemyTimeout = Math.random() * 2000 + 500
    setTimeout(function() {
      isEnemyTimeout = false
    }, enemyTimeout)
  }
}