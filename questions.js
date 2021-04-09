// Query Selectors
var timerEl = document.querySelector("#timer");
var question = document.querySelector("#question");
var choice = document.querySelectorAll("#choice")

// Declare variables

var currentQuestion = {};
var acceptingAnswers = true;
var score = 0;
var questionCounter = 0;
var availableQuestions = [];

// Array of questions

var quizArray = [
  {
      question: "How do you declare a variable named 'name' in javaScript?",
      choice1: "declare.var name",
      choice2: "name var",
      choice3: "var name",
      choice4: "variable name declare",
      correctAnswer: "3",
  },
  {
      question: "How do you link a javaScript file to an HTML file?",
      choice1: "<js></js>",
      choice2: "<javascript></javascript>",
      choice3: "<script></script>",
      choice4: "<link src=javaScript />",
      correctAnswer: "3",
  },
  {
      question: "How to write an IF statement in JavaScript?",
      choice1: "if i==5",
      choice2: "if(i==5)",
      choice3: "if(i==5)then",
      choice4: "if(i==5)then",
      correctAnswer: "2",
  },
  {
      question: "How do you declare a function named 'countdown' in javaScript?",
      choice1: "declare.function countdown",
      choice2: "countdown function",
      choice3: "function countdown.declare",
      choice4: "function countdown()",
      correctAnswer: "4",
  },
  {
      question: "What type of data can you store in a variable?",
      choice1: "numbers",
      choice2: "strings",
      choice3: "booleans",
      choice4: "all of the above",
      correctAnswer: "4",
  }
]

var SCORE_POINTS = 100;
var MAX_QUESTIONS = 5;



// Functions

function startQuiz(){
  questionCounter = 0;
  score = 0;
  availableQuestions =[... quizArray];
  getNewQuestion();
}

function getNewQuestion(){
  if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
    .localstorage.setItem("mostRecentScore", score);

    return window.location.assign("highscores.html");
  }

  questionCounter++

  var questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  question.InnerText = currentQuestion.question;

  choices.array.forEach(element => {
    var number = choice.dataset["number"];
    choice.InnerText = currentQuestion["choice"+ number];
  });

  availableQuestions.splice(questionsIndex, 1);

  acceptingAnswers = true
}

choices.forEach(choice => {
  choice.addEventListener("click", e =>{
    if(!acceptingAnswers) return

    acceptingAnswers = false;
    var selectedChoice = e.target;
    var selectedAnswer = selectedChoice.dataset ["number"];

    var classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect"

    if(classToApply === correct){
      incrementScore(SCORE_POINTS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply)
      getNewQuestion()
    },1000)

  })
})





function countdown() {
    var timeleft = 180;
    var downloadTimer = setInterval(function(){
      if(timeleft <= 0){
        clearInterval(downloadTimer);
        document.getElementById("timer").innerHTML = "Finished";
      } else {
        document.getElementById("timer").innerHTML = timeleft + " seconds!";
      }
      timeleft -= 1;
    }, 1000);
}
  countdown();
