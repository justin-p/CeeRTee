import "./styles.css";

import AudioMotionAnalyzer from "audiomotion-analyzer";
import Pizzicato from "pizzicato";

// use the AudioContext provided by Pizzicato
// when creating the audioMotion-analyzer object
const audioMotion = new AudioMotionAnalyzer(
    document.getElementById("mouth"), {
        audioCtx: Pizzicato.context,
        alphaBars: 1,
        barSpace: 0.2,
        mode: 2,
        outlineBars: 1,
        mirror: 1,
        reflexRatio: 0.5,
        reflexAlpha: 1,
        reflexBright: 1,
        showScaleX: 0,
        ShowScaleY: 0,
        showPeaks: 1,
        ledBars: true,
        smoothing: 0.3,
        showBgColor: 1,
        overlay: true,
        bgAlpha: 1,
    }
);


// Gradiant borrowed
// from https://github.com/hvianna/audioMotion.js/blob/196a5fe30954162626262e0e2aa73a692a4d544b/src/index.js
const gradiantOptions = {
    bgColor: '#000000',
    colorStops: [
        { pos: .1, color: '#f00' },
        { pos: 1, color: '#600' }
    ],
    disabled: false
};
audioMotion.registerGradient('my-grad', gradiantOptions);
audioMotion.gradient = "my-grad";

// use the getInputNode() method in your sound object
// to obtain the audio node to connect to audioMotion
const voice = new Pizzicato.Sound({ source: "input" }, () => {
    audioMotion.connectInput(voice.getInputNode());
});

audioMotion.setFreqRange(50, 800);

// Robot voice effect
var ringModulator = new Pizzicato.Effects.RingModulator({
    speed: 30,
    distortion: 0.7,
    mix: 0.5
});

voice.addEffect(ringModulator);

document.getElementById("play").addEventListener("click", () => voice.play());
document.getElementById("stop").addEventListener("click", () => voice.stop());