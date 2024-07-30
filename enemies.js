import {
  SphereGeometry,
  MeshStandardMaterial,
  Mesh,
  Vector3,
  TextureLoader
} from 'three'
import { removeObject3D } from './utils.js'

let scene;
let geometry, material;
let isEnemyTimeout = false

export function initEnemies(scn) {
  scene = scn
  geometry = new SphereGeometry(2);
  const texture = new TextureLoader()
    .load('textures/alien.jpg')
  material = new MeshStandardMaterial({
    map: texture
  });
}

let enemies = []

export function getEnemies() {
  return enemies
}

export function removeEnemy(name) {
  enemies = enemies.filter(e => e.name !== name)
}

let sphereIndex = 1
function addEnemy() {
  const dist = 100
  const x1 = 0
  const y1 = 5
  const z1 = 5
  const x2 = Math.random()*1.5*dist - 0.75*dist
  const y2 = Math.random()*0.75*dist
  const z2 = Math.sqrt(
    (dist * dist) - 
    ((x2 - x1) * (x2 - x1)) - 
    ((y2 - y1) * (y2 - y1))
  ) + z1
  
  const enemyLoc = new Vector3(x2, y2, z2)
  const playerLoc = new Vector3(x1, y1, z1)
  const direction = new Vector3()
  direction.subVectors(playerLoc, enemyLoc).normalize()
  
  const sphere = new Mesh(geometry, material);
  sphere.position.x = x2 
  sphere.position.y = y2
  sphere.position.z = -z2
  sphere.rotation.y = 1.571
  sphere.name = 'sphere' + sphereIndex
  sphereIndex++
  scene.add(sphere);
  enemies.push(sphere)
  
  sphere.direction = {
   x: direction.x *= 0.5,
   y: direction.y *= 0.5,
   z: direction.z *= 0.5
  }
}

export function updateEnemies(onPlayerHit) {
  if (!isEnemyTimeout) {
    isEnemyTimeout = true
    addEnemy()
    const enemyTimeout = Math.random() * 2000 + 500
    setTimeout(function() {
      isEnemyTimeout = false
    }, enemyTimeout)
  }
  
  const aliveEnemies = []
  for (let enemy of enemies) {
    enemy.position.x += enemy.direction.x
   enemy.position.y += enemy.direction.y
   enemy.position.z -= enemy.direction.z
   if (enemy.position.z >= 5) {
     removeObject3D(enemy)
     onPlayerHit()
   } else {
     aliveEnemies.push(enemy)
   }
  }
  enemies = aliveEnemies
}