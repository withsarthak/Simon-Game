//Different Variables during the js code
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

//Start a new Game
$("#start").click(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// $(document).click(function () {
//     if (!started) {
//     $("#level-title").text("Level " + level);
//       nextSequence();
//       started = true;
//     }
//   });

//User selected choice in game

$(".btn").click(function () {
  if (started) {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
  }
});

// check the answer of system and user
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 500);
    }
  } else {
    $("body").addClass("game-over");
    var scream = new Audio("sounds/" + "scream" + ".mp3");
    scream.play();

    $("#level-title").text("Game Over, Waana improve click start!");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 800);

    setTimeout(function () {
      var audio = new Audio("sounds/" + "wrong" + ".mp3");
      audio.play();
    }, 800);
    startOver();
  }
}

//nextSequence by system
function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  level++;
  $("#level-title").text("LeveL " + level);
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

//Simple fuction to set animation to the keys
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
