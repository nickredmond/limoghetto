export function checkCollision(objects1, objects2, r1, r2) {
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