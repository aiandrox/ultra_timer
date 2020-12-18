'use strict'

const url = 'https://aiandrox.github.io/ultra_timer/'
// const haiTime = 67120
const haiTime = 66700
const ultraId = 'Ujb-ZeX7Mo8'

window.onload = () => {
  showTime(displayTime)
}

const formatDate = (date) => {
  const y = date.getFullYear()
  const m = zeroPadding(date.getMonth() + 1);
  const h = zeroPadding(date.getHours())
  const d = zeroPadding(date.getDate())
  const min = zeroPadding(date.getMinutes())
  const s = zeroPadding(date.getSeconds())
  return `${y}年${m}月${d}日 <br class="br-sp">${h}時${min}分${s}秒`
}

function zeroPadding(num) {
  return num.toString().padStart(2, '0');
}

// タイマー
const timer = setInterval('countUp()', 1000)
const justTime = new Date('2021-1-1 0:00:00').getTime() //1609426800000 // 0時0分
const subtraction = 80000 // 後で変える
const funmae = new Date(justTime - subtraction)
let displayTime = funmae
const shouldStartTime = justTime - haiTime

function countUp() {
  // スタートが遅かったときに、ウルトラソウルを待たずにループするので
  const resetTime = new Date(justTime + sa + 10000)
  if (displayTime >= resetTime) {
    resetDisplayTime()
  } else {
    displayTime = new Date(displayTime.getTime() + 1000)
  }
  showTime(displayTime)
}

function showTime(time) {
  document.getElementById("timer").innerHTML = formatDate(time)
}

function resetDisplayTime() {
  displayTime = funmae
}

function stopTimer(){
  clearInterval(timer);
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

// モーダル
const dialog = document.querySelector('dialog');
const modalHeader = document.getElementById("modal-header")

// firebase
var firebaseConfig = {
  apiKey: "AIzaSyCKNkqGrjSJ5afWXea1Ss669zVEjucjKRk",
  authDomain: "ultra-timer.firebaseapp.com",
  projectId: "ultra-timer",
  storageBucket: "ultra-timer.appspot.com",
  messagingSenderId: "238377844617",
  appId: "1:238377844617:web:5b2873548f118c0cd76b58",
  measurementId: "G-JMEFKVYET8"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

document.addEventListener('DOMContentLoaded', () => {
  const db = firebase.firestore();
  const usersRef = db.collection("users").orderBy("point", "desc").limit(20)
  const rankingArea = document.getElementById("ranking")

  const users = []
  usersRef.get().then(function(snapshot){
    snapshot.forEach(function(doc) {
      const user = doc.data()
      users.push({name: user.name, point: user.point })
    })
    renderRanking()
  }).catch(function(error) {
    console.error(error);
  });

  function renderRanking() {
    users.slice(0, 20).forEach(function(user, index) {
      const html = `<p>${index+1}位　${user.name}　${user.point}点</p>`
      rankingArea.insertAdjacentHTML('beforeend', html);
    })
  }

  // 登録
  const registerBtn = document.getElementById("register-btn")
  const nameForm = document.getElementById("name")

  registerBtn.addEventListener('click', function () {
    const name = nameForm.value
    if (name == "") {
      return
    }
    db.collection("users").add({
      name: name,
      point: point(),
      created_at: new Date()
    })
    .then(function (docRef) {
      debugger
      // docRef.data()で取得したい
      console.log("Document written with ID: ", docRef.id);
    })
  })

  playButton.addEventListener('click', () => {
    db.collection("users").add({
      name: "name",
      point: 1815
    })
    // .then(function (docRef) {
    //   console.log("Document written with ID: ", docRef.id);
    // })
    // .catch(function (error) {
    //   console.error("Error adding document: ", error);
    // });
  })
})

// イベント系
const descZone = document.getElementById('desc')
const playButton = document.getElementById('play_button')
const haiArea = document.getElementById("hai_area")

playButton.addEventListener('click', function () {
  player.playVideo() // onPlayerStateChangeに飛ぶ
})

function showMovie() {
  document.getElementById("movie_area").style.display = 'block'
  desc.style.display = 'none'
}

var started = false
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !started) {
    showMovie()
    startCount()
  } else if (event.data == YT.PlayerState.ENDED) {
    document.getElementById("movie_area").style.display = 'none'
    desc.style.display = 'block'
    started = false
  } else if (event.data == YT.PlayerState.PAUSED) {
    alert('止めたな！！')
  }
}

function startCount() {
  setStartTime(displayTime)
  setTimeout(showUltraSoul, haiTime)
  console.log(displaySa())
  console.log(point())
  started = true
  modalHeader.insertAdjacentHTML('beforeend', `あなたのソウルは<span>${point()}点</span>です。${displaySa()}のズレでした。`);
}

let startTime = null
let sa = 100000 // 初期値を0点ソウルにするため
function setStartTime(time) {
  startTime = time
  sa = startTime - shouldStartTime // 正のとき遅れている
}

function diff() {
  return Math.abs(sa) / 10
}

function displaySa() {
  const m = parseInt(diff()/100/60)%60;// /100はミリ秒を秒にしている
  const s = parseInt(diff()/100)%60;
  const ms = parseInt(diff())%100;
  const displayMs = zeroPadding(ms);
  return `${m}分${s}秒${displayMs}`
}

// 表示系
function showUltraSoul() {
  stopTimer()
  haiArea.style.display = 'block'
}

function point() {
  if (diff() > 1000) {
    return 0
  } else if (diff() > 500) {
    return 50 - diff()/50
  } else if (diff() > 100) {
    return 90 - diff()/40
  } else {
    return 100 - diff()/10
  }
}

function message() {
  if (diff() > 1000) {
    return '<div class="msg-3">魂を感じません</div>'
  } else if (diff() > 500) {
    return '<div class="msg-3">ミニマムソウルですね</div>'
  } else if (diff() > 100) {
    return '<div class="msg-3">ほどほどソウルですね</div>'
  } else if (diff() > 10) {
    return '<div class="msg-2">スーパーソウルといったところかな</div>'
  } else {
    return '<div class="msg-1">お前が、お前こそがウルトラソウルだ</div>'
  }
}

// ツイート関連
const tweetBtn = document.getElementById("tweet-btn")

tweetBtn.addEventListener('click', function () {
  window.open(tweetUrl(), '_blank');
})

function tweetMessage() {
  return `${point()}点のソウルでした。`
}

function tweetUrl() {
  return `https://twitter.com/intent/tweet?text=${tweetMessage()}&url=${url}&hashtags=ultra_timer,ｳﾙﾄﾗｿｳｯﾊｧｲを練習するアプリ`
}
