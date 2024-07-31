import {
  SphereGeometry,
  MeshStandardMaterial,
  Mesh,
  TextureLoader
} from 'three'
import { removeObject3D } from './utils.js'
import { initObject, updateObjects } from './objectUtils.js'

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

export function resetEnemies() {
  enemies = []
}

function addEnemy() {
  const sphere = new Mesh(geometry, material);
  initObject(sphere)
  sphere.rotation.y = 1.571
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
  
  enemies = updateObjects(onPlayerHit, enemies)
}