const maxHeat = 100
const overheatTime = 2000
const overheatColor = '#ff5555'
const regularColor = '#efefef'

let heat = 0
let overheatDt = 0
let isOverheat = false
let isBarRed = false
let overheatInterval;

function setHeatbarLevel() {
  const width = heat/maxHeat * 40
  document.getElementById('heatbar-fill').style.width = width + 'vw'
}

function setHeatbarColor(color) {
  document.getElementById('heatbar-fill').style.backgroundColor = color
  document.getElementById('heatbar-border').style.borderColor = color
}

function checkOverheat() {
  if (heat > maxHeat) {
    heat = maxHeat
    isOverheat = true
    setHeatbarColor(overheatColor)
    isBarRed = true
    overheatInterval = setInterval(() => {
      isBarRed = !isBarRed
      const color = isBarRed ? overheatColor : regularColor
      setHeatbarColor(color)
    }, 250)
  }
}

export function gainHeat(amount) {
  if (!isOverheat) {
    heat += amount 
    checkOverheat()
    setHeatbarLevel()
  }
}

function clearOverheat() {
  clearInterval(overheatInterval)
  overheatDt = 0 
  isBarRed = false
  setHeatbarColor(regularColor)
  isOverheat = false
}

export function resetHeatbar() {
  if (isOverheat) {
    clearOverheat()
  }
  heat = 0 
  setHeatbarLevel()
}

function checkOverheatDone() {
  if (overheatDt >= overheatTime) {
    clearOverheat()
  }
}

export function updateHeatbar(dt) {
  if (isOverheat) {
    overheatDt += dt
    checkOverheatDone()
  } else {
    heat -= maxHeat * dt / 3000
    if (heat < 0) {
      heat = 0
    }
    setHeatbarLevel()
  }
}

export function canShoot() {
  return !isOverheat
}