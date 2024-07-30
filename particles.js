import {
  BufferGeometry,
  Float32BufferAttribute,
  Vector3,
  PointsMaterial,
  Points
} from 'three'

//let particles = []
//let meshes = []
let enemyExplosions = []

function rand(min, max) {
  return Math.random() * (max - min) + min
}

export function addEnemyExplosion(scene, position) {
    let points = []
    for(let i=0; i<100; i++) {
        points.push(rand(position.x-1, position.x+1))
        points.push(rand(position.y-1, position.y+1))
        points.push(rand(position.z-1, position.z+1))
        
       // geo.vertices.push(particle.position)
    }
    const geo = new BufferGeometry()//.setFromPoints(points)
    geo.setAttribute('position', new Float32BufferAttribute(points, 3))
    
    const mat = new PointsMaterial({color:0xffffff,size: 0.1})
    const mesh = new Points(geo,mat)
    mesh.position.x = position.x
    mesh.position.y = position.y
    mesh.position.z = position.z
    scene.add(mesh)
   enemyExplosions.push({
      geo
    }) 
}

export function updateEnemyExplosions() {
   enemyExplosions.forEach(e => {
     const particles = e.geo.attributes.position.array 
     for (let i = 0; i < 300; i++) {
       particles[i] += 1
     }
     e.geo.attributes.position.needsUpdate = true
   })
 }