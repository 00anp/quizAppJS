var highscoresList = document.getElementById("highScoresList");
var highScores = JSON.parse(localStorage.getItem("highScores")) || [];

// function that creates a list tag with the user initials and score 

highscoresList.innerHTML = highScores

    .map(score => {
        return `<li class ="high-scores">${score.name} - ${score.score}</li>`
    })
    .join("")