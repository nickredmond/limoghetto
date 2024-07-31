import {
  Shape,
  ShapeGeometry,
  MeshStandardMaterial,
  DoubleSide,
  Mesh
} from 'three'
import { removeObject3D } from './utils.js'
import { initObject, updateObjects } from './objectUtils.js'

let scene;
let geometry, material;
let isItemTimeout = false

export function initItems(scn) {
  scene = scn
  
  const heartShape = new Shape();
  const x = 0 
  const y = 0
  heartShape.moveTo( x + 5, y + 5 );
  heartShape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
  heartShape.bezierCurveTo( x - 6, y, x - 6, y + 7,x - 6, y + 7 );
  heartShape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
  heartShape.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
  heartShape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
  heartShape.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );
geometry = new ShapeGeometry( heartShape )
  geometry.scale(0.25, 0.25, 0.25)
  material = new MeshStandardMaterial({
    color: 0xff8888
  });
  material.side = DoubleSide
  
}

let items = []

export function getItems() {
  return items
}

export function removeItem(name) {
  items = items.filter(e => e.name !== name)
}

export function resetItems() {
  items = []
}

function addItem() {
  const heart = new Mesh(geometry, material);
  initObject(heart)
  heart.rotation.z = 3.142
  heart.itemType = 'heart'
  scene.add(heart);
  items.push(heart)
}

export function updateItems() {
  if (!isItemTimeout) {
    isItemTimeout = true
    addItem()
    const itemTimeout = Math.random() * 7000 + 3000
    setTimeout(function() {
      isItemTimeout = false
    }, itemTimeout)
  }
  
  items = updateObjects(_ => {}, items, item => {
    item.rotation.y += 0.1
  })
}