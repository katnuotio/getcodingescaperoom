const questions =[
{
        question: "In the enchanting library, amidst secrets so wide, a hidden message you found, a treasure to guide; a story, a tale, or something sweet, which word's the key? Let the adventure greet!   ",
    answers: [
        { text: "lantern", correct:false},
        { text: "staircase", correct:false},
        { text: "tale", correct:true},
        { text: "whisper", correct:false},

    ]
  },
  {
  question: "Weaving through the castles charm, you see a number flight. Just through the passageway you see the numbers 8x9+7, leading you into a magical light.",
  answers: [
      { text: "79", correct:true},
      { text: "80", correct:false},
      { text: "92", correct:false},
      { text: "71", correct:false},
  ]
  },
  {
    question: "In the enchanted library, fiction books lead to make-believe worlds, while non-fiction books guide the way to waking up from the dream. ",
    answers: [
        {text: "True", correct: true},
        {text: "False", correct: false},
    ],
    isTrueFalse: true,
},

{
    question: "Unscramble the letters",
    scrambledWord: "MGICA",
    correctAnswer: "MAGIC",
    isTrueFalse: false,
},



];
const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton= document.getElementById("next-btn");

let currentQuestionIndex= 0;
let score = 0; 

function startQuiz(){
    currentQuestionIndex = 0
    nextButton.innerHTML = "Next";
    showQuestion ();
}

function showQuestion () {
    resetState();
    let currentQuestion =questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex +1;
    questionElement.innerHTML =questionNo + "." +currentQuestion.
    question;

    if(currentQuestion.isTrueFalse) {
        const trueButton = document.createElement("button");
        trueButton.innerHTML = "True";
        trueButton.classList.add("btn");
        answerButton.appendChild(trueButton);
        trueButton.dataset.correct =true; 

        const falseButton = document.createElement("button")
        falseButton.innerHTML = "False";
        falseButton.classList.add("btn");
        answerButton.appendChild (falseButton);
        falseButton.dataset.correct = false; 

        trueButton.addEventListener ('click', selectAnswer);
        falseButton.addEventListener ('click,', selectAnswer);

    } else if (currentQuestion.scrambledWord) {
        const scrambledLettersContainer = document.createElement("div");
        scrambledLettersContainer.innerHTML = currentQuestion.scrambledWord;
        scrambledLettersContainer.id ="scrambled-letters-container";
        scrambledLettersContainer.classList.add("scrambled-container");
        scrambledLettersContainer.classList.add("btn");
        answerButton.appendChild(scrambledLettersContainer);

        const inputField = document.createElement("input");
        inputField.type = "text";
        inputField.id = "answer-input";
        answerButton.appendChild(inputField);

        const submitButton = document.createElement("button");
    submitButton.innerHTML = "What is the secret message?";
    submitButton.classList.add("btn");
    answerButton.appendChild(submitButton);

    submitButton.addEventListener('click', () => {
        const userAnswer = inputField.value.trim().toLowerCase();
        checkScrambledAnswer(userAnswer);

    })

    function checkScrambledAnswer(userAnswer){
        const currentQuestion = questions[currentQuestionIndex];
        if (userAnswer === currentQuestion.correctAnswer.toLowerCase()) {
            
            nextButton.style.display ="block";
        
        } else {

        alert ("Try Again!");
        }
        
    }


currentQuestion.answers.forEach (answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButton.appendChild(button);
    if(answer.correct){
        button.dataset.correct = answer.correct;
    }
    button.addEventListener ('click', selectAnswer);
});
}else { 
    currentQuestion.answers.forEach(answer => {
        const button =document.createElement ("button");
        button.innerHTML =answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct= answer.correct;
        }
        button.addEventListener ('click', selectAnswer);
});
    }
}
function resetState(){
         nextButton.style.display ="none";
         while(answerButton.firstChild){
            answerButton.removeChild(answerButton.firstChild);

}
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        // Display the next button only if the answer is correct
        nextButton.style.display = "block";
    } else {
        selectedBtn.classList.add("incorrect");
        // Allow the user to continue making selections even if the answer is incorrect
    }

    const answerButtons = document.querySelectorAll('.btn');
    answerButtons.forEach(button => {
        button.removeEventListener('click', selectAnswer);
        button.addEventListener('click', selectAnswer);
    });


    nextButton.addEventListener('click', nextQuestion);
}




function nextQuestion() {
   
    currentQuestionIndex++;

    resetState();

   
    if (currentQuestionIndex < questions.length) {
      
        showQuestion();
    } else {
        
        showResult();
    }

    
    nextButton.addEventListener('click', nextQuestion);
}




  

startQuiz();
