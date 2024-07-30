import { removeObject3D } from './utils.js'

function checkCollision(objects1, objects2, r1, r2) {
  let collidedObjs = {
    objects1: new Set(),
    objects2: new Set()
  }
  for (let obj1 of objects1) {
    for (let obj2 of objects2) {
      if (obj1.position.x + r1 > obj2.position.x - r2 &&
          obj1.position.x - r1 < obj2.position.x + r2 &&
          obj1.position.y + r1 + 5 > obj2.position.y - r2 &&
          obj1.position.y - r1 + 5 < obj2.position.y + r2 &&
          obj1.position.z + r1 > obj2.position.z - r2 &&
          obj1.position.z - r1 < obj2.position.z + r2) {
            collidedObjs.objects1.add(obj1)
            collidedObjs.objects2.add(obj2)
          }
    }
  }
  return collidedObjs
}

export function updateSceneCollision(lines, enemies) {
  const collided = checkCollision(lines, enemies, 0.5, 1)
  let deletedIndices = []
  for (let i = 0; i < lines.length; i++) {
    for (let obj of collided.objects1) {
      if (obj === lines[i]) {
        deletedIndices.push(i)
      }
    }
  }
  for (let deleted of deletedIndices) {
    removeObject3D(lines[deleted])
    lines.splice(deleted, 1)
  }
  deletedIndices = []
  for (let i = 0; i < enemies.length; i++) {
    for (let obj of collided.objects2) {
      if (obj === enemies[i]) {
        deletedIndices.push(i)
      }
    }
  }
  let deletedObjs = []
  for (let deleted of deletedIndices) {
    deletedObjs.push(enemies[deleted])
    removeObject3D(enemies[deleted])
    enemies.splice(deleted, 1)
  }
  return deletedObjs
}
