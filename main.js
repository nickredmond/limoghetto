import * as THREE from 'three';
import { handleTouchMove, handleTouchEnd } from './touches.js'
import { initFloors, updateFloors } from './floors.js'
import { initBackground } from './background.js'
import { removeObject3D } from './utils.js'
import { initEnemies, updateEnemies, getEnemies, removeEnemy, resetEnemies } from './enemies.js'
import { initItems, updateItems, getItems, removeItem, resetItems } from './items.js'
import { updateSceneCollision } from './collision.js'
import { updateScore, resetScore } from './hud.js'
import { addEnemyExplosion, updateEnemyExplosions, resetParticles } from './particles.js'

const scene = new THREE.Scene()

const light = new THREE.PointLight(0xffffff, 2000)
light.position.set(0, 30, 0)
scene.add(light)

const fieldOfViewDegrees = 75
const aspectRatio = window.innerWidth / window.innerHeight
const nearClippingPlane = 0.1
const farClippingPlane = 1000
const camera = new THREE.PerspectiveCamera(
  fieldOfViewDegrees,
  aspectRatio,
  nearClippingPlane,
  farClippingPlane
)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

renderer.domElement.addEventListener('touchmove', (evt) => {
  evt.preventDefault()
  handleTouchMove(evt, camera)
})
renderer.domElement.addEventListener('touchend', (evt) => {
  evt.preventDefault()
  handleTouchEnd(evt)
})

initFloors(scene)
initBackground(scene)
initEnemies(scene)
initItems(scene)

camera.position.y = 5
camera.position.z = 5
camera.rotation.x = 0.2

let lines = []
document.getElementById('btn-shoot').addEventListener('touchstart', () => {
  const yaw = camera.rotation.x 
  const pitch = camera.rotation.y 
  
  const qy = Math.sin(yaw) * Math.cos(pitch)
  const qz = Math.cos(yaw) * Math.cos(pitch)
  const qx = -Math.sin(pitch)
  
  const material = new THREE.LineBasicMaterial( {
    color: 0xff0000,
    linewidth: 10
  } );
  
  const points = [];
points.push( new THREE.Vector3( 0, 5, 5 ) );
points.push( new THREE.Vector3( qx, 5 + qy, 5 + qz ) );

const geometry = new THREE.BufferGeometry().setFromPoints( points );
  
  const line = new THREE.Line( geometry, material );
  scene.add(line)
  lines.push(line)
  
  const lineInterval = setInterval(() => {
   line.position.x += qx
    line.position.y += qy
   line.position.z -= qz
   if (line.position.z < -120 || Math.abs(line.position.x) > 120 || line.position.y > 120) {
     removeObject3D(line)
     clearInterval(lineInterval)
   }
  }, 1000 / 60)
})

let health = 3 
function onPlayerHit() {
  if (health > 0) {
    document.getElementById('health-' + health).style.display = 'none'
    health--
    if (health <= 0) {
      document.getElementById('crosshair').style.display = 'none'
      document.getElementById('game-over').style.display = 'block'
    }
  }
}

function gainHealth() {
  if (health < 3) {
    health++
    document.getElementById('health-' + health).style.display = 'inline'
  }
}

const dt = 1000 / 60
function updateScene() {
  updateFloors(dt)
  
  updateEnemies(onPlayerHit)
  const enemies = getEnemies()
  const deletedEnemies = updateSceneCollision(lines, enemies)
  updateScore(deletedEnemies.length * 10)
  for (let deleted of deletedEnemies) {
    addEnemyExplosion(scene, deleted.position, 0xaaffbb)
    removeEnemy(deleted.name)
  }
  
  updateItems()
  const items = getItems()
  const gainedItems = updateSceneCollision(lines, items)
  updateScore(gainedItems.length * 5)
  for (let item of gainedItems) {
    if (item.itemType === 'heart') {
      gainHealth()
      addEnemyExplosion(scene, item.position, 0xffaaaa)
      removeItem(item.name)
    }
 }
  
  updateEnemyExplosions(dt)
}

function restartGame() {
  while(scene.children.length > 0){ 
    removeObject3D(scene.children[0]); 
  }
  lines = []
  resetEnemies()
  resetItems()
  resetParticles()
  resetScore()
  initFloors(scene)
  initBackground(scene)
  scene.add(light)
  document.getElementById('crosshair').style.display = 'block'
  document.getElementById('game-over').style.display = 'none'
  document.getElementById('health-1').style.display = 'inline'
  document.getElementById('health-2').style.display = 'inline'
  document.getElementById('health-3').style.display = 'inline'
  health = 3
}

document.getElementById('btn-retry').addEventListener('touchstart', () => {
  restartGame()
})

function animate() {
  if (health > 0) {
    updateScene()
  }
  
  renderer.render(scene, camera)
}

renderer.setAnimationLoop(animate)

