'use strict';

const hai_time = 67120;
const formatDate = (date) => {
  const y = date.getFullYear()
  const m = date.getMonth() + 1
  const d = date.getDate();
  const h = date.getHours();
  const min = date.getMinutes();
  const s = date.getSeconds();
  return `${y}年${m}月${d}日 ${h}時${min}分${s}秒`;
}

window.onload = function () {
  show_time();
  setInterval("show_time()", 500);
}
const show_time = function () {
  let now = new Date();
  let joya_time = new Date(1609426500000 + (now.getTime() % 300000));  // 5分
  document.getElementById("timer").innerHTML = formatDate(joya_time);
}

const show_movie = function () {
  document.getElementById("movie_area").style.display = 'block';
}

document.getElementById("play_button").onclick = function () {
  show_movie();
  // player.PlayVideo();
  // setTimeout(function () {
  // const stop_time = joya_time;
  // document.getElementById("result").innerHTML = joya_time.toLocaleTimeString() + "でした。";
  // }, 11111);
}
// const play_time =
// setTimeout(処理内容, 実行タイミング)

// <iframe width="560" height="315" src="https://www.youtube.com/embed/Ujb-ZeX7Mo8?controls=0autoplay=1"
//   frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
//   allowfullscreen></iframe>

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
      controls: 0, // コントロールバーを表示しない
      showinfo: 0, // 動画情報を表示しない
      disablekb: 1 // キーボードでの操作をさせない
    }
  }
  );
}
// function onPlayerReady(event) {
//   event.target.playVideo();
// }

