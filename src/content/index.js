require('../css/index.css');
const ml5 = require('ml5');
// とりあえずconstruct
// popupから呼び出した時に切り抜きrectが動く
//
class Switcher {
  constructor() {
    let self = this;
    self.initialized = false;
  }
  initialize(rectRate, switchInterval) {
    let self = this;
    // 描画用領域と動画キャプチャ用の要素を用意
    self.rectRate = rectRate; // top,bottom,left,right
    self.switchInterval = switchInterval
    self.backgroundCanvasPlayer = [document.createElement("canvas"), document.createElement("canvas"), document.createElement("canvas"), document.createElement("canvas")];
    self.backgroundCanvasForFeatureExtruction = document.createElement("canvas");
    self.backgroundImageForFeatureExtruction = document.createElement("img");
    self.playerViews = [document.createElement("img"), document.createElement("img"), document.createElement("img"), document.createElement("img")];
    self.rootdiv = document.createElement("div");
    self.videoElement = document.getElementsByTagName("video")[0];
    self.videoPosition = self.videoElement.getBoundingClientRect();
    console.log(self.videoPosition, self.videoElement);
    document.body.appendChild(self.rootdiv);
    for (let i = 0; i < 4; i++) {
      let pvCanvas = self.backgroundCanvasPlayer[i];
      let pv = self.playerViews[i];
      pvCanvas.width = self.videoPosition.width;
      pvCanvas.height = self.videoPosition.height;
      self.rootdiv.appendChild(pv);
      pv.classList.add("playerHandView");
      pv.setAttribute("id", `player${i}HandView`);
      pv.src = pvCanvas.toDataURL();
    }
    console.log(2);
    self.backgroundCanvasForFeatureExtruction.width = self.rectRate[3]-self.rectRate[2];
    self.backgroundCanvasForFeatureExtruction.height = self.rectRate[1] - self.rectRate[0];
    console.log(22);
    // feature extoructorの用意
    self.featureExtractor = ml5.featureExtractor('MobileNet');
    console.log(self.featureExtractor);
    self.samples = [];
    self.studied = false;
    self.initialized = true;
  }

  takeScreenshot(playerID) {
    let self = this;
    let pvCanvas = self.backgroundCanvasPlayer[playerID];
    let pv = playerViews[playerID];
    let ctx = pvCanvas.getContext('2d', { alpha: false });
    ctx.drawImage(self.videoElement, 0, 0);
    pv.src = pvCanvas.toDataURL();
  }

  featureExtraction() {
    let self = this;
    console.log(self.featureExtractor);
    let ctx = self.backgroundCanvasForFeatureExtruction.getContext('2d', { alpha: false });
    ctx.drawImage(self.videoElement, 0, 0);
    self.backgroundImageForFeatureExtruction.src = self.backgroundCanvasForFeatureExtruction.toDataURL();
    let feature = self.featureExtractor.infer(self.backgroundCanvasForFeatureExtruction);
    console.log(feature);
    return feature;
  }

  study() {
    console.log(self.samples);
    self.studied = true;
  }

  getplayerID(feature) {
    if (!self.studied) {
      return none;
    }
    return 0;
  }

  run() {
    let self = this;
    if (!self.initialized) {
      return
    }
    const nSample = 60;
    let sampleCnt = 0;
    let timer_id;
    timer_id = setInterval(() => {
      if (sampleCnt < nSample) {
        sampleCnt += 1;
        self.featureExtraction().then((r) => {
          console.log(11, r, r.data.text)
          self.samples.push(r.text);
        })
      } else {
        self.study();
        clearInterval(timer_id);
      }
    }, 500);
    setInterval(() => {
      if (self.studied) {
        self.featureExtraction().then((r) => {
          let playerID = self.getplayerID(r.text);
          self.takeScreenshot(playerID);
        })
      }
    }, 1000);
   }
}

let switcher = new Switcher();

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.mode == "check") {
    let overlay = document.createElement("div");
    let videoElement = document.getElementsByTagName("video")[0];
    let videoPosition = videoElement.getBoundingClientRect();
    let rate = request.points.split(",").map(Number);  // top,bottom,left,right
    videoElement.parentElement.insertBefore(overlay, videoElement);
    overlay.classList.add("rectCheckOverlay")
    overlay.style.height = (videoPosition.height) * ((rate[1] - rate[0]) / 100).toString() + "px";
    overlay.style.width = (videoPosition.width) * ((rate[3] - rate[2]) / 100).toString() + "px";
    overlay.style.top = (videoPosition.top + (videoPosition.height) * rate[0] / 100).toString() + "px";
    overlay.style.left = (videoPosition.left + (videoPosition.width) * rate[2] / 100).toString() + "px";
    overlay.style.position = "fixed";
    setTimeout(() => {
      overlay.remove()
    }, 2000);

  } else if (request.mode == "start") {
    let rectRate = request.points.split(",").map(Number);  // top,bottom,left,right
    switcher.initialize(rectRate, 1000);
    console.log("fin init");
    switcher.run();
  }
});



// let playerViews = [document.createElement("img"), document.createElement("img"), document.createElement("img"), document.createElement("img")];
// let playerViewsBackgroundCanvas = [document.createElement("canvas"), document.createElement("canvas"), document.createElement("canvas"), document.createElement("canvas")];
// let rootdiv = document.createElement("div");
// let videoElement = document.getElementsByTagName("video")[0];
// let videoPosition = videoElement.getBoundingClientRect();
// document.body.appendChild(rootdiv);
// for (let i = 0; i < 4; i++) {
//   let pvCanvas = playerViewsBackgroundCanvas[i];
//   let pv = playerViews[i];
//   let ctx = pvCanvas.getContext('2d', { alpha: false });
//   pvCanvas.width = videoPosition.width;
//   pvCanvas.height = videoPosition.height;
//   rootdiv.appendChild(pv);
//   pv.classList.add("playerHandView");
//   pv.setAttribute("id", `player${i}HandView`);
//   ctx.drawImage(videoElement, 0, 0);
//   pv.src = pvCanvas.toDataURL();
// }
// setInterval(() => {
//   let i = 0;
//   let pvCanvas = playerViewsBackgroundCanvas[i];
//   let pv = playerViews[i];
//   let ctx = pvCanvas.getContext('2d', { alpha: false });
//   ctx.drawImage(videoElement, 0, 0);
//   pv.src = pvCanvas.toDataURL();

// }, 1000);
// setInterval(() => {
//   let i = 1;
//   let pvCanvas = playerViewsBackgroundCanvas[i];
//   let pv = playerViews[i];
//   let ctx = pvCanvas.getContext('2d', { alpha: false });
//   ctx.drawImage(videoElement, 0, 0);
//   pv.src = pvCanvas.toDataURL();

// }, 700);
// console.log(22);
// }
// console.log(request); // -> 選択範囲ちょうだい が出力される
// console.log(1); // -> 選択範囲ちょうだい が出力される
// // document.body.innerHTML = document.body.innerHTML.replace(/鬼滅の刃/g, 'ボボボーボ・ボーボボ');
