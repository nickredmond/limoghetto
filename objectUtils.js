import { Vector3 } from 'three'
import { removeObject3D } from './utils.js'

let meshIndex = 1

export function initObject(mesh, speed) {
  const dist = 100
  mesh.position.x = Math.random()*0.5*dist - 0.25*dist 
  mesh.position.y = Math.random()*0.2*dist + 5
  mesh.position.z = -dist*2
  mesh.name = 'mesh' + meshIndex
  meshIndex++
  mesh.direction = {
   x: 0,
   y: 0,
   z: -speed
  }
}


export function updateObjects(onPlayerHit, objects, eachObj) {
  const aliveObjects = []
  for (let obj of objects) {
    obj.position.x += obj.direction.x
   obj.position.y += obj.direction.y
   obj.position.z -= obj.direction.z 
   if (eachObj) {
     eachObj(obj)
   }
   if (obj.position.z >= 5) {
     removeObject3D(obj)
     onPlayerHit()
   } else {
     aliveObjects.push(obj)
   }
  }
  return aliveObjects
}