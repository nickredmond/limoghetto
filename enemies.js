import {
  SphereGeometry,
  MeshStandardMaterial,
  Mesh,
  TextureLoader
} from 'three'
import { removeObject3D } from './utils.js'
import { initObject, updateObjects } from './objectUtils.js'

const smallSize = 1 
const mediumSize = 3
const bigSize = 5

let scene;
let smallGeo, mediumGeo, bigGeo;
let material;
let isEnemyTimeout = false

export function initEnemies(scn) {
  scene = scn
  smallGeo = new SphereGeometry(smallSize);
  mediumGeo = new SphereGeometry(mediumSize);
  bigGeo = new SphereGeometry(bigSize);
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
  let geometry;
  let size;
  const odds = Math.random()
  if (odds < 0.34) {
    geometry = smallGeo
    size = smallSize
  } else if (odds < 0.67) {
    geometry = mediumGeo
    size = mediumSize
  } else {
    geometry = bigGeo
    size = bigSize
  }
  const sphere = new Mesh(geometry, material);
  initObject(sphere)
  sphere.rotation.y = -1.571
  sphere.size = size
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