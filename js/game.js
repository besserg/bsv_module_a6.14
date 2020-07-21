const numDivs = 36;
const maxHits = 10;

let hits = 0;
let firstHitTime = 0;
let prevSelector = 'undefined';
let missClick = 0;


function round() {
    if (typeof prevSelector != 'undefined') {
      $(prevSelector).removeClass("target");
      $(prevSelector).text('');
    }
    if (hits < maxHits) {
    let divSelector = randomDivId();
    $(divSelector).addClass("target");
    $(divSelector).text(hits+1);
    prevSelector = $(divSelector);
  }
    if (hits === 0) {
      firstHitTime = getTimestamp();
    }
    if (hits === maxHits) {
      endGame();
    }
}

function endGame() {
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  $("#missClicked").text(10-missClick);
  $("#win-message").removeClass("d-none");
  $(".cubes").addClass("unvis");
  $("#button-reload").text('Перезагрузка');
}

function handleClick(event) {
  if ($(event.target).hasClass("target")) {
    hits = hits + 1;
    round();
  }
  else {
    $(event.target).addClass("miss");
    missClick = missClick + 1;
  }
}

function init() {
  round();
  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {
    location.reload();
  });
}

$("#button-reload").click(function() {
    $(document).ready(init);
  });
  