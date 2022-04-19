/**
 * For audioMotion-analyzer documentation and
 * mode demos, visit https://audiomotion.dev
 */
import "./styles.css";

import AudioMotionAnalyzer from "audiomotion-analyzer";
import Pizzicato from "pizzicato";

const el = document.getElementById("container");

// use the AudioContext provided by Pizzicato
// when creating the audioMotion-analyzer object
const audioMotion = new AudioMotionAnalyzer(el, {
  audioCtx: Pizzicato.context
});

const soundPath = "assets/test.wav";

// use the getInputNode() method in your sound object
// to obtain the audio node to connect to audioMotion
const mySound = new Pizzicato.Sound(soundPath, () => {
  audioMotion.connectInput(mySound.getInputNode());
});

// effect
var ringModulator = new Pizzicato.Effects.RingModulator({
  speed: 30,
  distortion: 1,
  mix: 0.5
});

mySound.addEffect(ringModulator);

document.getElementById("play").addEventListener("click", () => mySound.play());
