import { Vector3 } from 'three';

let lastMoveX, lastMoveY;
let lastX = 0;
let lastY = 5;

export function handleTouchMove(evt, camera) {
  const touch = evt.changedTouches[0]
  if (lastMoveX) {
    const diffX = touch.pageX - lastMoveX
    const diffY = touch.pageY - lastMoveY
    lastX += diffX / 60
    lastY -= diffY / 60
    camera.lookAt(new Vector3(lastX, lastY, 0))
  }
  lastMoveX = touch.pageX
  lastMoveY = touch.pageY
}

export function handleTouchEnd(evt) {
  lastMoveX = null
  lastMoveY = null
}