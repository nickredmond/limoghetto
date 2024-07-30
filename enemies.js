import {
  SphereGeometry,
  MeshStandardMaterial,
  Mesh,
  TextureLoader
} from 'three'
import { removeObject3D } from './utils.js'
import { initObject } from './objectUtils.js'

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

function addEnemy() {
  const sphere = new Mesh(geometry, material);
  initObject(sphere)
  scene.add(sphere);
  enemies.push(sphere)
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