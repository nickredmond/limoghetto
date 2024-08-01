import {
  PlaneGeometry,
  TextureLoader,
  RepeatWrapping,
  MeshStandardMaterial,
  Mesh
} from 'three'

let scene;
let floors = []
const PANEL_SIZE = 50

function addFloor(x, y, z) {
  const geometry = new PlaneGeometry(PANEL_SIZE, PANEL_SIZE)
  const texture = new TextureLoader()
  .load('textures/moon-rock.jpg', function(texture) {
    texture.wrapS = texture.wrapT = RepeatWrapping;
    texture.offset.set( 0, 0 );
    const repeatsX = 5
    const repeatsY = 5
    texture.repeat.set( repeatsX, repeatsY );
  })
  const material = new MeshStandardMaterial({
    map: texture
  })
  const plane = new Mesh(geometry, material)
  plane.position.x = x 
  plane.position.y = y 
  plane.position.z = z 
  plane.rotation.x = -1.571
  scene.add(plane)
  floors.push(plane)
}

const MAX_LENGTH = 200

export function initFloors(scn) {
  scene = scn
  const increment = PANEL_SIZE - 0.1
  for (var x = -MAX_LENGTH*0.75; x < MAX_LENGTH*0.8; x += increment) {
    for (var z = -MAX_LENGTH; z <= MAX_LENGTH/4; z += increment) {
      addFloor(x, 0, z)
    }
  }
}

const velocity = 20

export function updateFloors(dt) {
  const movement = velocity * dt / 1000
  for (let floor of floors) {
    if (floor.position.z >= MAX_LENGTH/4) {
      floor.position.z = -MAX_LENGTH
    } else {
      floor.position.z += movement
    }
  }
}
