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
let smallMat, mediumMat, bigMat;
let isEnemyTimeout = false

export function initEnemies(scn) {
  scene = scn
  smallGeo = new SphereGeometry(smallSize);
  mediumGeo = new SphereGeometry(mediumSize);
  bigGeo = new SphereGeometry(bigSize);
  const loader = new TextureLoader()
  const smallTexture = loader.load('textures/alien.jpg')
  smallMat = new MeshStandardMaterial({
    map: smallTexture
  });
  const mediumTexture = loader.load('textures/alien.jpg')
  mediumMat = new MeshStandardMaterial({
    map: mediumTexture
  });
  const bigTexture = loader.load('textures/bisbee.jpg')
  bigMat = new MeshStandardMaterial({
    map: bigTexture
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
  let material;
  let size;
  let speed;
  let color;
  const odds = Math.random()
  if (odds < 0.34) {
    geometry = smallGeo
    material = smallMat
    size = smallSize
    speed = 0.4
    color = 0xaabbff
  } else if (odds < 0.67) {
    geometry = mediumGeo
    material = mediumMat
    size = mediumSize
    speed = 0.3
    color = 0xaaffbb
  } else {
    geometry = bigGeo
    material = bigMat
    size = bigSize
    speed = 0.2
    color = 0xdfdfdf
  }
  const sphere = new Mesh(geometry, material);
  initObject(sphere, speed)
  sphere.rotation.y = -1.571
  sphere.size = size
  sphere.particleColor = color
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