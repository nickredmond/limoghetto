import { Vector3 } from 'three'
import { removeObject3D } from './utils.js'

let meshIndex = 1

export function initObject(mesh) {
  const dist = 100
  const x1 = 0
  const y1 = 5
  const z1 = 5
  const x2 = Math.random()*1.5*dist - 0.75*dist
  const y2 = Math.random()*0.75*dist
  const z2 = Math.sqrt(
    (dist * dist) - 
    ((x2 - x1) * (x2 - x1)) - 
    ((y2 - y1) * (y2 - y1))
  ) + z1
  
  const enemyLoc = new Vector3(x2, y2, z2)
  const playerLoc = new Vector3(x1, y1, z1)
  const direction = new Vector3()
  direction.subVectors(playerLoc, enemyLoc).normalize()
  
  mesh.position.x = x2 
  mesh.position.y = y2
  mesh.position.z = -z2
  mesh.name = 'mesh' + meshIndex
  meshIndex++
  
  mesh.direction = {
   x: direction.x * 0.5,
   y: direction.y * 0.5,
   z: direction.z * 0.5
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