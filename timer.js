'use strict';

const hai_time = 67120;
let player = ""
const formatDate = (date) => {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const h = date.getHours();
  const min = date.getMinutes();
  const s = date.getSeconds();
  return `${y}年${m}月${d}日 ${h}時${min}分${s}秒`;
}

window.onload = function () {
  showTime();
  repeatTime = setInterval("showTime()", 500);
}
const showTime = function () {
  let now = new Date();
  let joyaTime = new Date(1609426500000 + (now.getTime() % 300000));  // 5分
  document.getElementById("timer").innerHTML = formatDate(joyaTime);
}

// IFrame Player API の読み込み
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// YouTubeの埋め込み
function onYouTubeIframeAPIReady() {
  player = new YT.Player('movie_area', {
    width: 640, // プレーヤーの幅
    height: 390, // プレーヤーの高さ
    videoId: 'Ujb-ZeX7Mo8', // YouTubeのID
    playerVars: {
      rel: 0, // 関連動画非表示
      showinfo: 0, // 動画情報非表示
      showinfo: 0, // 動画情報を表示しない
      disablekb: 1 // キーボードでの操作をさせない
    },
    events: {
      'onStateChange': onPlayerStateChange
    }
  });
}

const playButton = document.getElementById('play_button');
playButton.addEventListener('click', function () {
  showMovie()
  player.playVideo(); // onPlayerStateChangeに飛んでいい
})

const showMovie = function () {
  document.getElementById("movie_area").style.display = 'block';
}

var started = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !started) {
    setTimeout(showUltraSoul, 66500);
    started = true;
  }
}

function showUltraSoul() {
  alert("ULTRA SOUL")
}


// class Counter {
//   constructor(time) {
//     let now = new Date();
//     this.time = time;
//     this.joyaTime = new Date(1609426500000 + (now.getTime() % 300000));  // 5分
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
//     return now - shouldStartTime();
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
  counter = (difference) => {
    const stop_time = joyaTime;
    document.getElementById("result").innerHTML = joyaTime.toLocaleTimeString() + "でした。";
  }

// const play_time =
// setTimeout(処理内容, 実行タイミング)

// <iframe width="560" height="315" src="https://www.youtube.com/embed/Ujb-ZeX7Mo8?controls=0autoplay=1"
//   frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
//   allowfullscreen></iframe>

