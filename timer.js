'use strict'

const url = 'https://aiandrox.github.io/ultra_timer/'
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
  return `${y}年${m}月${d}日 <br class="sp">${h}時${min}分${s}秒`
}

function zeroPadding(num) {
  return num.toString().padStart(2, '0');
}

// タイマー
const timer = setInterval('countUp()', 1000)
const justTime = new Date('2021-1-1 0:00:00').getTime() //1609426800000 // 0時0分
const subtraction = 18000 // 後で変える
const funmae = new Date(justTime - subtraction)
let displayTime = funmae
const shouldStartTime = justTime - haiTime
let startTime = null
let sa = 0
const timerArea = document.getElementById("timer")

function countUp() {
  // スタートが遅かったときに、ウルトラソウルを待たずにループするので
  const resetTime = new Date(justTime + sa + 10000)
  if (displayTime >= resetTime) {
    resetDisplayTime()
  } else {
    displayTime = new Date(displayTime.getTime() + 1000)
  }
  if(displayTime.getTime() == justTime) {
    timerArea.setAttribute("class", "tosikosi")
  } else {
    timerArea.setAttribute("class", "timer")
  }
  showTime(displayTime)
}

function showTime(time) {
  timerArea.innerHTML = formatDate(time)
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

// 表示非表示関数
function hide(element) {
  element.style.display = 'none'
}

function show(element) {
  element.style.display = 'block'
}

const dialog = document.querySelector('dialog');
const closeDialogBtn = document.getElementById("close-dialog-btn")
const modalHeader = document.getElementById("modal-header")
const modalFooter = document.getElementById("modal-footer")
const descZone = document.getElementById('desc')
const playButton = document.getElementById('play_button')
const haiArea = document.getElementById("hai_area")
const rankBtn = document.getElementById('rank-btn')
const rankingArea = document.getElementById("ranking-area")
const rankingList = document.getElementById("rankingList")
const tweetArea = document.getElementById("tweet-area")
const registerBtn = document.getElementById("register-btn")
const nameForm = document.getElementById("name")

rankBtn.addEventListener('click', function() {
  dialog.showModal();
})
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) {
    dialog.close('cancelled');
  }
})
closeDialogBtn.addEventListener('click', function() {
  dialog.close();
})


function showUltraSoul() {
  stopTimer()
  show(haiArea)
  haiArea.classList.remove("hide")
  show(rankingArea)
}

// firebase
let myId = ""
const users = []
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
  const usersRef = db.collection("users").orderBy("point", "desc")

  usersRef.get().then(async function(snapshot){
    await snapshot.forEach(function(doc) {
      const user = doc.data()
      users.push({id: doc.id, name: user.name, point: user.point })
    })
    renderRanking()
  })

  function renderRanking() {
    // rankingList.textContent = null
    const tableRef = document.getElementById("targetTable")
    tableRef.textContent = null
    users.slice(0, 20).forEach(function(user, index) {
      const newRow   = tableRef.insertRow(index)
      const rankCell  = newRow.insertCell(0)
      const rank  = document.createTextNode(`${index+1}位`)
      rankCell.appendChild(rank)
      const nameCell  = newRow.insertCell(1)
      nameCell.setAttribute("class", "name")
      const name  = document.createTextNode(user.name)
      nameCell.appendChild(name)
      const pointCell  = newRow.insertCell(2)
      const point  = document.createTextNode(`${user.point}点`)
      pointCell.appendChild(point)
    })
  }

  // 登録
  registerBtn.addEventListener('click', async function () {
    const name = nameForm.value
    if (name == "") {
      return
    }
    const doc = await db.collection('users').add({
      name: name,
      point: point(),
      created_at: new Date()
    })
    myId = doc.id
    addUsers({ id: doc.id, name: name, point: point() })
    nameForm.value = ""
    hide(modalFooter)
    show(tweetArea)
    modalHeader.insertAdjacentHTML('beforeend', `順位は${myRank()}位です。`);
  })

  function addUsers(userData) {
    users.push(userData)
    users.sort(function(a,b) {
      if(a.point > b.point) return -1;
      if(a.point < b.point) return 1;
      return 0;
    });
    renderRanking()
  }
})

function myRank() {
  if(myId == "") return null
  const myIndex = users.findIndex(function(user) {
    return user.id == myId
  })
  return myIndex + 1
}

playButton.addEventListener('click', function () {
  player.playVideo() // onPlayerStateChangeに飛ぶ
})

var started = false
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !started) {
    show(document.getElementById("movie_area"))
    hide(desc)
    hide(playButton)
    startCount()
  } else if (event.data == YT.PlayerState.ENDED) {
    hide(document.getElementById("movie_area"))
    show(desc)
    show(playButton)
    started = false
    haiArea.classList.add('hide');
  } else if (event.data == YT.PlayerState.PAUSED) {
    alert("動画を止めましたね！！\nもう一度最初からです！！")
    document.location.reload()
  }
}

function startCount() {
  setStartTime(displayTime)
  setTimeout(showUltraSoul, haiTime)
  console.log(displaySa())
  console.log(point())
  started = true
  modalHeader.textContent = ""
  modalHeader.insertAdjacentHTML('beforeend', `あなたのソウルは<span>${point()}点</span>です。${displaySa()}のズレでした。`);
}

function setStartTime(time) {
  startTime = time
  sa = startTime - shouldStartTime // 正のとき遅れている
}

function diff() {
  return Math.abs(sa)
}

function displaySa() {
  const m = parseInt(diff()/1000/60)%60;// /100はミリ秒を秒にしている
  const s = parseInt(diff()/1000)%60;
  const ms = parseInt(diff())%1000;
  const displayMs = zeroPadding(ms/10);
  return `${m}分${s}秒${displayMs}`
}

function point() {
  if (diff() > 10000) {
    return 0
  } else if (diff() > 5000) {
    return 50 - diff()/500
  } else if (diff() > 1000) {
    return 90 - diff()/400
  } else {
    return 100 - diff()/100
  }
}

function message() {
  if (diff() > 10000) {
    return '<div class="msg-3">魂を感じません。ソウルを名乗らないでください。</div>'
  } else if (diff() > 7000) {
    return '<div class="msg-3">しょぼしょぼソウルですね</div>'
  } else if (diff() > 5000) {
    return '<div class="msg-3">ミニマムソウルですね</div>'
  } else if (diff() > 1000) {
    return '<div class="msg-3">ほどほどソウルですね</div>'
  } else if (diff() > 100) {
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
  return `${myRank()}位：${point()}点のソウルでした。`
}

function tweetUrl() {
  return `https://twitter.com/intent/tweet?text=${tweetMessage()}&url=${url}&hashtags=ultra_timer,ｳﾙﾄﾗｿｳｯﾊｧｲを練習するアプリ`
}
