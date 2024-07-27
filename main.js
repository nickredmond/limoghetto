import * as THREE from 'three';
import { handleTouchMove, handleTouchEnd } from './touches.js'
import { initFloors, updateFloors } from './floors.js'
import { initBackground } from './background.js'

const scene = new THREE.Scene()

const light = new THREE.PointLight(0xffffff, 1500)
light.position.set(0, 20, 0)
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

camera.position.y = 5
camera.position.z = 5
camera.rotation.x = 0.2

const dt = 1000 / 60

function animate() {
  updateFloors(dt)
  
  renderer.render(scene, camera)
}

renderer.setAnimationLoop(animate)

