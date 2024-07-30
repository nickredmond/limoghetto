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
        
       // geo.vertices.push(particle.position)
    }
    const geo = new BufferGeometry()//.setFromPoints(points)
    geo.setAttribute('position', new Float32BufferAttribute(points, 3))
    geo.setAttribute('size', new Float32BufferAttribute(sizes, 1))
    
    const mat = new PointsMaterial({color:0xffffff})
    const mesh = new Points(geo,mat)
    mesh.position.x = position.x
    mesh.position.y = position.y
    mesh.position.z = position.z
    scene.add(mesh)
   enemyExplosions.push({
      geo,
      velocities
    }) 
}

export function updateEnemyExplosions() {
   enemyExplosions.forEach(e => {
     const particles = e.geo.attributes.position.array 
     for (let i = 0; i < 300; i++) {
       particles[i] += e.velocities[i]
       e.velocities[i] += e.velocities[i] > 0 ? -0.005 : 0.005
     }
     e.geo.attributes.position.needsUpdate = true
   })
 }