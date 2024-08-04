import {
  AudioListener,
  Audio,
  AudioLoader
} from 'three'

let listener;
let loader;
let sounds = {}

function addSound(name, filename, volume, isRepeat, immediate) {
  const sound = new Audio( listener );
  loader.load( 'sounds/' + filename, function( buffer ) {
	  sound.setBuffer( buffer );
	  sound.setLoop( isRepeat );
	  sound.setVolume( volume );
	  sounds[name] = sound
	  if (immediate) {
	    sound.play()
	  }
  });
}

export function initSound(camera) {
  listener = new AudioListener();
  camera.add( listener );
  loader = new AudioLoader();
  addSound('background', 'background.m4a', 0.75, true, true)
  addSound('shoot', 'shoot.m4a', 1.0, false)
}

export function playSound(name) {
  sounds[name]?.play()
}