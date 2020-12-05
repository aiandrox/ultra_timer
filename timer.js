'use strict'

// const haiTime = 67120
const haiTime = 67400
const ultraId = 'Ujb-ZeX7Mo8'

const formatDate = (date) => {
  const y = date.getFullYear()
  const m = date.getMonth() + 1
  const d = date.getDate()
  const h = date.getHours()
  const min = date.getMinutes()
  const s = date.getSeconds()
  return `${y}年${m}月${d}日 ${h}時${min}分${s}秒`
}

window.onload = () => {
  showTime()
  setInterval('showTime()', 500)
}
const justTime = 1609426800000 // 0時0分
const subtraction = 180000 // 3分
const funmae = justTime - subtraction

const shouldStartTime = justTime - haiTime

function showTime() {
  document.getElementById("timer").innerHTML = formatDate(displayTime())
}

function displayTime() {
  let now = new Date().getTime()
  return new Date(funmae + (now % subtraction))
}

// IFrame Player API の読み込み
const tag = document.createElement('script')
tag.src = "https://www.youtube.com/iframe_api"
const firstScriptTag = document.getElementsByTagName('script')[0]
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

// YouTubeの埋め込み
let player = ""
function onYouTubeIframeAPIReady() {
  player = new YT.Player('movie_area', {
    width: 640, // プレーヤーの幅
    height: 390, // プレーヤーの高さ
    videoId: ultraId, // YouTubeのID
    playerVars: {
      rel: 0, // 関連動画非表示
      showinfo: 0, // 動画情報非表示
      showinfo: 0, // 動画情報を表示しない
      disablekb: 1 // キーボードでの操作をさせない
    },
    events: {
      'onStateChange': onPlayerStateChange
    }
  })
}

const playButton = document.getElementById('play_button')
const MovieArea = document.getElementById("movie_area")
playButton.addEventListener('click', function () {
  showMovie()
  player.playVideo() // onPlayerStateChangeに飛ぶ
})

const showMovie = function () {
  document.getElementById("movie_area").style.display = 'block'
  playButton.style.display = 'none'
}

var started = false
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !started) {
    startCount()
  } else if (event.data == YT.PlayerState.ENDED) {
    document.getElementById("movie_area").style.display = 'none'
    playButton.style.display = 'block'
    started = false
  } else if (event.data == YT.PlayerState.PAUSED) {
    alert('止めたな！！')
  }
}

function startCount() {
  setStartTime(displayTime())
  setTimeout(showUltraSoul, haiTime)
  setTimeout(resetTime, sa)
  started = true
}

let startTime = null
let sa = null
function setStartTime(time) {
  startTime = time
  sa = startTime - shouldStartTime // 正のとき遅れている
}

function resetTime() {
  
}

function showUltraSoul() {
  alert("ULTRA SOUL")
}

// class Counter {
//   constructor() {
//     this.
//   }

//   start(displayTime) {
//     const sinnen = new Date(1609426800000)
//     this.lastDisplayTime = sinnen - displayTime // あと何秒？
//   }

//   reset() {
//     this.lastDisplayTime = sinnen - now
//   }
// }


// class Counter {
//   constructor(time) {
//     let now = new Date()
//     this.time = time
//     this.joyaTime = new Date(1609426500000 + (now.getTime() % 300000))  // 5分
//     this.showTime = 
//   }

//   text(now) {
//     const diff = Math.abs(difference(now))
//     if (diff < 100) {
//       return "いい感じ"
//     } else {
//       return "ずれてる"
//     }
//   }

//   difference(now) {
//     return now - shouldStartTime()
//   }

//   shouldStartTime() {
//     return 5分 - this.time
//   }

// // timeに対して基本は5分おき
// // リセットすると55からになる
// // タイマーは「現在時刻」を管理する。
// // タイマーは内部で「この時間」を保持する。
// // start時点で「この時間」と比較する。start時点でfinish時のフックは起動させる。

// }
  // counter = (difference) => {
  //   const stop_time = joyaTime
  //   document.getElementById("result").innerHTML = joyaTime.toLocaleTimeString() + "でした。"
  // }

// const play_time =
// setTimeout(処理内容, 実行タイミング)

