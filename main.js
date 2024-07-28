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

document.getElementById('btn-shoot').addEventListener('touchstart', () => {
 //alert('yeah')
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
/**  const geometry = new THREE.SphereGeometry(1);
  const material = new THREE.MeshBasicMaterial({
    color: 0xff0000
  });
  const sphere = new THREE.Mesh(geometry, material);
  sphere.position.y = 5
  scene.add(sphere);*/
  
  setInterval(() => {
   line.position.x += qx
    line.position.y += qy
   line.position.z -= qz
    //const end = getNextPoint(start.x, start.y, start.z, 1, pitch, yaw)
  }, 1000 / 60)
})

const dt = 1000 / 60

function animate() {
  updateFloors(dt)
  
  renderer.render(scene, camera)
}

renderer.setAnimationLoop(animate)

