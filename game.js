const questions =[
{
        question: "What is 2+2?",
    answers: [
        { text: "3", correct:false},
        { text: "1", correct:false},
        { text: "4", correct:true},
        { text: "2", correct:false},

    ]
  },
  {
  question: "Which is a primary color",
  answers: [
      { text: "red", correct:true},
      { text: "purple", correct:false},
      { text: "green", correct:false},
      { text: "white", correct:false},
  ]
  }



];
const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton= document.getElementById("next-btn");

let currentQuestionIndex= 0;
let score = 0; 

function startQuiz(){
    currentQuestionIndex = 0
    nextButton.innerHTML = "Next";
    showquestion ();
}

function showQuestion () {
    let currentQuestion =questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex +1;
    questionElement.innerHTML =questionNo + "." +currentQuestion.
    question;
}