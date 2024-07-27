import {
  SphereGeometry,
  MeshBasicMaterial,
  Mesh,
  Vector3,
  BufferGeometry,
  Float32BufferAttribute,
  PointsMaterial,
  Points
} from 'three'
import { MeshSurfaceSampler } from 'three/addons/math/MeshSurfaceSampler.js';

export function initBackground(scene) {
  const geometry = new SphereGeometry(120);
  const material = new MeshBasicMaterial({
    color: 0x000000,
    wireframe: true
  });
  const sphere = new Mesh(geometry, material);
  sphere.position.y = 5
  scene.add(sphere);
  
  const sampler = new MeshSurfaceSampler( sphere )
  	.setWeightAttribute( 'color' )
  	.build();
  
  const vertices = [];
  const tempPosition = new Vector3();
  for (let i = 0; i < 8000; i ++) {
    sampler.sample(tempPosition);
    vertices.push(tempPosition.x, tempPosition.y, tempPosition.z);
  }
  
  /* Create a geometry from the coordinates */
  const pointsGeometry = new BufferGeometry();
  pointsGeometry.setAttribute('position', new Float32BufferAttribute(vertices, 3));
  
  /* Create a material */
  const pointsMaterial = new PointsMaterial({
    color: 0xffffff,
    size: 0.3
  });
  /* Create a Points object */
  const points = new Points(pointsGeometry, pointsMaterial);
  points.position.y = 5
  /* Add the points into the scene */
  scene.add(points);	
}