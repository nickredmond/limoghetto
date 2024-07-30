import {
  BufferGeometry,
  Float32BufferAttribute,
  ShaderMaterial,
  Vector3,
  PointsMaterial,
  Points
} from 'three'
import { removeObject3D } from './utils.js'

let enemyExplosions = []

function rand(min, max) {
  return Math.random() * (max - min) + min
}

export function addEnemyExplosion(scene, position) {
    let points = []
    let sizes = []
    let velocities = []
    for(let i=0; i<100; i++) {
        points.push(rand(position.x-1, position.x+1))
        points.push(rand(position.y-1, position.y+1))
        points.push(rand(position.z-1, position.z+1))
        sizes.push(rand(0.05,0.3))
        velocities.push(rand(-0.75, 0.75))
        velocities.push(rand(-0.75, 0.75))
        velocities.push(rand(-0.75, 0.75))
    }
    const geo = new BufferGeometry()//.setFromPoints(points)
    geo.setAttribute('position', new Float32BufferAttribute(points, 3))
    geo.setAttribute('size', new Float32BufferAttribute(sizes, 1))
    
    const mat = new PointsMaterial({color:0xaaffbb})
    const mesh = new Points(geo,mat)
    mesh.position.x = position.x
    mesh.position.y = position.y
    mesh.position.z = position.z
    scene.add(mesh)
   enemyExplosions.push({
      geo,
      mesh,
      velocities,
      timeLapsed: 0
    }) 
}

function calcEnemyParticles(e) {
  const particles = e.geo.attributes.position.array 
  const removedIndex = Math.floor(Math.random()*100)
  let currentIndex = 0
  for (let i = 0; i < 300; i+=3) {
    if (currentIndex === removedIndex) {
      particles[i+2] = 25
    } else {
      particles[i] += e.velocities[i]
      e.velocities[i] += e.velocities[i] > 0 ? -0.005 : 0.005
      particles[i+1] += e.velocities[i+1]
      e.velocities[i+1] += e.velocities[i+1] > 0 ? -0.005 : 0.005
      particles[i+2] += e.velocities[i+2]
      e.velocities[i+2] += e.velocities[i+2] > 0 ? -0.005 : 0.005
    }
    currentIndex++
  }
  e.geo.attributes.position.needsUpdate = true
}

export function updateEnemyExplosions(dt) {
   let removedIndexes = []
   enemyExplosions.forEach((e, i) => {
     e.timeLapsed += dt
     if (e.timeLapsed >= 3000) {
       removeObject3D(e.mesh)
       removedIndexes.push(i)
     } else {
       calcEnemyParticles(e)
     }
   })
   for (let i of removedIndexes) {
     enemyExplosions.splice(i, 1)
   }
 }