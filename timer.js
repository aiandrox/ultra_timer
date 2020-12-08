'use strict'

// const haiTime = 67120
const haiTime = 67000
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
  showTime(displayTime)
  setInterval('countUp()', 1000)
}
const justTime = new Date('2021-1-1 0:00:00').getTime() //1609426800000 // 0時0分
const subtraction = 180000 // 3分
const funmae = new Date(justTime - subtraction)
let displayTime = funmae

const shouldStartTime = justTime - haiTime

function showTime(time) {
  document.getElementById("timer").innerHTML = formatDate(time)
}

function countUp() {
  if (displayTime >= new Date('2021-1-1 0:00:30')) {
    resetDisplayTime()
  } else {
    displayTime = new Date(displayTime.getTime() + 1000)
  }
  showTime(displayTime)
}

function resetDisplayTime() {
  displayTime = funmae
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
  setStartTime(displayTime)
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
  displayTime = funmae
}

function showUltraSoul() {
  alert("ULTRA SOUL")
}
