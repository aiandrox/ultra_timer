'use strict'

const url = 'https://aiandrox.github.io/ultra_timer/'
const haiTime = 66700
const ultraId = 'Ujb-ZeX7Mo8'

window.onload = () => {
  showTime(displayTime)
  setInterval('countUp()', 100)
}

const formatDate = (date) => {
  const y = date.getFullYear()
  const m = zeroPadding(date.getMonth() + 1)
  const h = zeroPadding(date.getHours())
  const d = zeroPadding(date.getDate())
  const min = zeroPadding(date.getMinutes())
  const s = zeroPadding(date.getSeconds())
  return `${y}年${m}月${d}日 <br class="sp">${h}時${min}分${s}秒`
}

function zeroPadding(num) {
  return num.toString().padStart(2, '0')
}

// タイマー
const timer = setInterval('timerUp()', 10)
const justTime = new Date('2021-1-1 0:00:00').getTime() //1609426800000
const subtraction = 180000
const funmae = new Date(justTime - subtraction)
let displayTime = funmae
const shouldStartTime = justTime - haiTime
let startTime = null
let sa = 0
const timerArea = document.getElementById("timer")

function timerUp() {
  const resetTime = new Date(justTime + sa + 11000)
  if (resetTime < displayTime) {
    resetDisplayTime()
  } else {
    displayTime = new Date(displayTime.getTime() + 10)
  }
}

function countUp() {
  if(justTime <= displayTime.getTime() && displayTime.getTime() < justTime + 1000) {
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
  clearInterval(timer)
}

const dialog = document.querySelector('dialog')
const closeDialogBtn = document.getElementById("close-dialog-btn")
const result = document.getElementById("result")
const registerArea = document.getElementById("register-area")
const descZone = document.getElementById('desc')
const playButton = document.getElementById('play_button')
const movieArea = document.getElementById("movie_area")
const haiArea = document.getElementById("hai_area")
const rankBtns = document.querySelectorAll('.rank-btn')
const registerBtn = document.getElementById("register-btn")

// IFrame Player API の読み込み
const tag = document.createElement('script')
tag.src = "https://www.youtube.com/iframe_api"
const firstScriptTag = document.getElementsByTagName('script')[0]
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

// YouTubeの埋め込み
let player = ""
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
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

playButton.addEventListener('click', function () {
  player.playVideo() // onPlayerStateChangeに飛ぶ
})

var started = false
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !started) {
    show(movieArea)
    hide(desc)
    hide(playButton)
    startCount()
  } else if (event.data == YT.PlayerState.ENDED) {
    finishMovie()
  } else if (event.data == YT.PlayerState.PAUSED) {
    alert("動画を操作しましたね！！\nもう一度最初からです！！")
    document.location.reload()
  }
}

function showUltraSoul() {
  stopTimer()
  show(haiArea)
  haiArea.classList.remove("hide")
}

function finishMovie() {
  started = false
  const resultArea = document.getElementById("result-area")

  hide(movieArea)
  haiArea.classList.remove('cut')
  haiArea.classList.add('hide')
  show(resultArea)
}

// 表示非表示関数
function hide(element) {
  element.style.display = 'none'
}

function show(element) {
  element.style.display = 'block'
}

rankBtns.forEach(function(btn) {
  btn.addEventListener('click', function() {
    dialog.showModal()
  })
})

dialog.addEventListener('click', (event) => {
  if (event.target === dialog) {
    dialog.close('cancelled')
  }
})
closeDialogBtn.addEventListener('click', function() {
  dialog.close()
})

// firebase
let myId = ""
const users = []
var firebaseConfig = {
  apiKey: "AIzaSyD36bUpddhzC3zyaN2C6_CwS_6F6OK1PrY",
  authDomain: "ultra-timer-af9ca.firebaseapp.com",
  projectId: "ultra-timer-af9ca",
  storageBucket: "ultra-timer-af9ca.appspot.com",
  messagingSenderId: "747803517653",
  appId: "1:747803517653:web:690d9ff5688022419bf85c",
  measurementId: "G-681KDP968G"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
firebase.analytics()

document.addEventListener('DOMContentLoaded', () => {
  const db = firebase.firestore()
  const usersRef = db.collection("users").orderBy("point", "desc")

  usersRef.get().then(async function(snapshot){
    await snapshot.forEach(function(doc) {
      const user = doc.data()
      users.push({id: doc.id, name: user.name, point: user.point })
    })
    renderRanking()
  })

  function renderRanking() {
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
    const nameForm = document.getElementById("name")
    const name = nameForm.value
    const tweetArea = document.getElementById("tweet-area")
    const rankingMsg = document.getElementById("ranking-msg")

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
    dialog.showModal()
    hide(registerArea)
    show(tweetArea)
    rankingMsg.textContent = `【あなたの順位は${myRank()}位でした】`
  })

  function addUsers(userData) {
    users.push(userData)
    users.sort(function(a,b) {
      if(a.point > b.point) return -1
      if(a.point < b.point) return 1
      return 0
    })
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

function startCount() {
  setStartTime(displayTime)
  setTimeout(showUltraSoul, haiTime)
  started = true
  result.textContent = ""
  const html = `あなたのソウルは<span class="ultra">${point()}点</span>です。ズレは<span class="ultra">${displaySa()}</span>でした。<br>${message()}`
  result.innerHTML = html
}

function setStartTime(time) {
  startTime = time
  sa = startTime - shouldStartTime // 正のとき遅れている
}

function diff() {
  return Math.abs(sa)
}

function displaySa() {
  const m = parseInt(diff()/1000/60)%60 // /100はミリ秒を秒にしている
  const s = parseInt(diff()/1000)%60
  const ms = parseInt(diff())%1000
  const displayMs = zeroPadding(ms/10)
  return `${m}分${s}秒${displayMs}`
}

function point() {
  let p = 0
  if (diff() >= 10000) {
    p =  0
  } else if (diff() >= 5000) { // 5000~10000
    p = (166 - diff()/60) / 2 // 0.33~41.33
  } else if (diff() >= 1000) { // 1000~5000
    p = 100 - diff()/85 + 2 // 43.17~90.23
  } else if (diff() >= 200) { // 200~1000
    p = 100 - diff()/100 + 1 // 91~99
  } else {
    p = 100
  }
  return Math.round(p*100)/100 // 四捨五入
}

function message() {
  if (diff() > 10000) {
    return '魂を感じません。ソウルを名乗らないでください。'
  } else if (diff() > 7000) {
    return 'しょぼしょぼソウルですね。'
  } else if (diff() > 5000) {
    return 'ミニマムソウルですね。'
  } else if (diff() > 1000) {
    return 'ほどほどソウルですね。'
  } else if (diff() > 200) {
    return 'スーパーソウルといったところかな。'
  } else {
    return 'お前が、お前こそがウルトラソウルだ！！！'
  }
}

// ツイート関連
const tweetBtn = document.getElementById("tweet-btn")

tweetBtn.addEventListener('click', function () {
  window.open(tweetUrl(), '_blank')
})

function soul() {
  if (diff() > 10000) {
    return '残念ながら魂はありませんでした。'
  } else if (diff() > 7000) {
    return 'しょぼしょぼソウルでした。'
  } else if (diff() > 5000) {
    return 'ミニマムソウルでした。'
  } else if (diff() > 1000) {
    return 'ほどほどソウルでした。'
  } else if (diff() > 200) {
    return 'スーパーソウルでした！'
  } else {
    return '完璧なウルトラソウルでした！！'
  }
}

function pageUrl() {
  let name = ""
  if (diff() > 10000) {
    name = 'no'
  } else if (diff() > 7000) {
    name = 'syobo'
  } else if (diff() > 5000) {
    name = 'minimum'
  } else if (diff() > 1000) {
    name = 'hodo'
  } else if (diff() > 200) {
    name = 'super'
  } else {
    name = 'ultra'
  }
  return `${url}${name}.html`
}

function tweetMessage() {
  let rank = 0
  if(myRank() <= 3) {
    rank = `暫定${myRank()}位！！！`
  } else {
    rank = `${myRank()}位でした！`
  }
  return `${point()}点で${rank}\n${soul()}`
}

function tweetUrl() {
  return `https://twitter.com/intent/tweet?text=${tweetMessage()}&url=${pageUrl()}&hashtags=ultra_timer,ｳﾙﾄﾗｿｳｯﾊｧｲを練習するアプリ`
}
