import * as THREE from 'three';
import { MeshSurfaceSampler } from 'three/addons/math/MeshSurfaceSampler.js';
import { handleTouchMove, handleTouchEnd } from './touches.js'
import { initFloors, updateFloors } from './floors.js'

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

//
const geometry = new THREE.SphereGeometry(120);
const material = new THREE.MeshBasicMaterial({
  color: 0x000000,
  wireframe: true
});
const cube = new THREE.Mesh(geometry, material);
cube.position.y = 5
scene.add(cube);

//const sampler = new THREE.MeshSurfaceSampler(cube).build()
const sampler = new MeshSurfaceSampler( cube )
	.setWeightAttribute( 'color' )
	.build();

const vertices = [];
const tempPosition = new THREE.Vector3();
for (let i = 0; i < 8000; i ++) {
  sampler.sample(tempPosition);
  vertices.push(tempPosition.x, tempPosition.y, tempPosition.z);
}

/* Create a geometry from the coordinates */
const pointsGeometry = new THREE.BufferGeometry();
pointsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

/* Create a material */
const pointsMaterial = new THREE.PointsMaterial({
  color: 0xffffff,
  size: Math.random() * 0.5 + 0.1
});
/* Create a Points object */
const points = new THREE.Points(pointsGeometry, pointsMaterial);
points.position.y = 5
/* Add the points into the scene */
scene.add(points);	
//

camera.position.y = 5
camera.position.z = 5

const dt = 1000 / 60
function animate() {
  updateFloors(dt)
  
  renderer.render(scene, camera)
}

renderer.setAnimationLoop(animate)

