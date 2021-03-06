var username = document.getElementById("username");
var saveScoreBtn = document.getElementById("saveScoreBtn");
var finalScore = document.getElementById("finalScore");
var mostRecentScore = localStorage.getItem("mostRecentScore");
var highScores = JSON.parse(localStorage.getItem('highScores')) || [];
var MAX_HIGH_SCORES = 5;

finalScore.innerText = mostRecentScore;

username.addEventListener("keyup",() => {
    saveScoreBtn.disabled = !username.value;

})

//Function to save scores and order them on descendent order 


function saveHighScore (e) {
    e.preventDefault();

    var score = {
        score: mostRecentScore,
        name: username.value,
    };
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5);

    localStorage.setItem("highScores",JSON.stringify(highScores));
    window.location.assign("/index.html");
};