var question = document.getElementById("question");
var choices = Array.from(document.getElementsByClassName("choice-text"));
var progressText = document.getElementById("progressText");
var scoreText = document.getElementById("score");
var progressBarFull = document.getElementById("progressBarFull");
var timerEl = document.getElementById('countdown');

var currentQuestion = {};
var acceptingAnswers = false;
var score = 0;
var totalSeconds = 45;
var timeRemining = totalSeconds;
var questionCounter = 0;
var availableQuestions =[];

var questions= [
  {
      question: "How do you declare a variable named 'name' in javaScript?",
      choice1: "declare.var name",
      choice2: "name var",
      choice3: "var name",
      choice4: "variable name declare",
      answer: "3",
  },
  {
      question: "How do you link a javaScript file to an HTML file?",
      choice1: "<js></js>",
      choice2: "<javascript></javascript>",
      choice3: "<script></script>",
      choice4: "<link src=javaScript />",
      answer: "3",
  },
  {
      question: "How to write an IF statement in JavaScript?",
      choice1: "if i==5",
      choice2: "if(i==5)",
      choice3: "if(i==5)then",
      choice4: "if(i==5)then",
      answer: "2",
  },
  {
      question: "How do you declare a function named 'countdown' in javaScript?",
      choice1: "declare.function countdown",
      choice2: "countdown function",
      choice3: "function countdown.declare",
      choice4: "function countdown()",
      answer: "4",
  },
  {
      question: "What type of data can you store in a variable?",
      choice1: "numbers",
      choice2: "strings",
      choice3: "booleans",
      choice4: "all of the above",
      answer: "4",
  }
];


var INCORRECT_PENALTY = -3;
var MAX_QUESTIONS = 5;

function startGame () {
  questionCounter = 0;
  score = 0;
  availableQuestions = [... questions];
  console.log(availableQuestions);
  totalSeconds = 45;
  timeRemining = totalSeconds;
  getNewQuestion();

};

function countdown() {
  
  var totalSeconds = 45;
  

  // TODO: Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
  var timeInterval = setInterval(function () {
    totalSeconds--;
    timerEl.textContent = totalSeconds + " seconds!";

    if(totalSeconds === 0) {
      document.getElementById("countdown").textContent="Time's Up!";
      // Stops execution of action at set interval
      clearInterval(timeInterval);
    }
  }, 1000);
}

countdown();

//Function to loop the question array and get 1 question at random and the choices and populate them in the HTML format



function getNewQuestion () {
  // Sets score in local Storage
  if(availableQuestions.length === 0 || questionCounter>= MAX_QUESTIONS){
    localStorage.setItem("mostRecentScore", (score+totalSeconds));
    return window.location.assign("/end.html");
  };

  // Creates progress Bar that moves with each question
  questionCounter++;
  progressText.innerText = "Question "+ questionCounter + "/"+ MAX_QUESTIONS;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
  // Gets a random question from the Array
  var questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;
  
  choices.forEach( choice => {
  var number = choice.dataset["number"];
  choice.innerText = currentQuestion["choice" + number];
})
//Remove a question from the array to not be reused 
availableQuestions.splice(questionIndex, 1);

acceptingAnswers = true;

};
// Function with event listener that evaluates which answer was clicked

choices.forEach( choice =>{
  choice.addEventListener("click", e =>{
    if(!acceptingAnswers) return;

    acceptingAnswers = false;
    var selectedChoice = e.target;
    var selectedAnswer = selectedChoice.dataset["number"];

  // test to see if evaluation of answers is correct. It applies a class to the selected div for visual feedback

    var classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if(classToApply==="incorrect"){
      incrementScore(INCORRECT_PENALTY);
    }

    console.log(classToApply);

    selectedChoice.parentElement.classList.add(classToApply);
    setTimeout(() =>{
      selectedChoice.parentElement.classList.remove(classToApply);
    getNewQuestion();

    }, 500);
  });
});

function incrementScore (timerEl) {
  score+=timerEl;
  scoreText.innerText = score;
};

startGame();

