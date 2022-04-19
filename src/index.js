/**
 * For audioMotion-analyzer documentation and
 * mode demos, visit https://audiomotion.dev
 */
import "./styles.css";

import AudioMotionAnalyzer from "audiomotion-analyzer";
import Pizzicato from "pizzicato";

// use the AudioContext provided by Pizzicato
// when creating the audioMotion-analyzer object
const audioMotion = new AudioMotionAnalyzer(
  document.getElementById("container"),
  {
    audioCtx: Pizzicato.context,
    alphaBars: 1,
    barSpace: 0.2,
    mode: 2,
    outlineBars: 1,
    mirror: 1,
    reflexRatio: 0.5,
    reflexAlpha: 1,
    reflexBright: 1,    
    gradient: "rainbow",
    showScaleX: 0,
    ShowScaleY: 0,
    showPeaks: 1,
    ledBars: true,
    smoothing: 0.3
  }
);

// use the getInputNode() method in your sound object
// to obtain the audio node to connect to audioMotion
const voice = new Pizzicato.Sound({ source: "input" }, () => {
  audioMotion.connectInput(voice.getInputNode());
});

audioMotion.setFreqRange(50, 800);

// effect
//var ringModulator = new Pizzicato.Effects.RingModulator({
//  speed: 166,
//  distortion: 21,
//  mix: 1
//});

// voice.addEffect(ringModulator);

document.getElementById("play").addEventListener("click", () => voice.play());
document.getElementById("stop").addEventListener("click", () => voice.stop());
