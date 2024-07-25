import {
  PlaneGeometry,
  TextureLoader,
  RepeatWrapping,
  MeshStandardMaterial,
  Mesh
} from 'three'

let scene;

function addFloor(x, y, z) {
  const geometry = new PlaneGeometry(50, 50)
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
}

export function initFloors(scn) {
  scene = scn
  for (var x = -120; x < 120; x += 49.9) {
    for (var z = -120; z < 120; z += 49.9) {
      addFloor(x, 0, z)
    }
  }
}
