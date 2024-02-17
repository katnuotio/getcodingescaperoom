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
    question: "In the enchanted library, fiction books lead to make-believe worlds, while non-fiction books guide the path to the real way to escape. ",
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
{
    question: "In the mysterious library, you uncover a potion recipe that requires mixing various ingredients. The recipe calls for 1/2 cup of ghostly mist, 1/4 cup of enchanted essence, and 1/4 cup of spectral brew. The total amount of potion is 3/4 cup.",

    answers: [
        {text: "True", correct: true},
        {text: "False", correct: false},
    ],
    isTrueFalse: true,
},


{  question: "In the magical library, you discover a hidden scroll labeled 'The Mystic Multiples.' The sequence inside is generated by multiplying each term by a consistent factor. The initial term is 4, and the sequence is as follows: 4, 8, 16, 32, ___.",
answers: [
    { text: "40", correct:false},
    { text: "48", correct:true},
    { text: "56", correct:false},
    { text: "64", correct:false},
]

},
{
    question: "You find yourself in the history section, on the wall you are drawn to a book. The History of Newfoundland and Labrador. Another step closer! Find the answer with these three clues!",
    clues: ["My name starts with A.", "I am the second largest in the world.", "Sailors and fisherman navigate me to reach distant shores."],
    correctAnswer: "Atlantic Ocean",
},
{
    question: "In the ancient library of enchantments, there are 789 enchanted crystals on one shelf and 423 mystical scrolls on another. The total number of magical items on both shelves is 1,512. Is this statement true or false?",
    answers: [
        {text: "True", correct: true},
        {text: "False", correct: false},
    ],
    isTrueFalse: false,
},
{
    question: "Unscramble the letters",
    scrambledWord: "STIHYRO",
    correctAnswer: "HISTORY",
    isTrueFalse: false,
    },

   { question: "In the eerie corridors of the haunted library, a mysterious shape lurks among the dusty tomes. Can you unveil its identity with these spine-chilling clues?",
    clues: ["This mysterious shape has 4 sides, quietly holding ancient secrets.", "It casts shadows of right angles, reminiscent of the creaking bookshelves.", "The ghostly whispers reveal that opposite sides of this shape share the same spectral length."],
    correctAnswer: "Rectangle",
},



];
const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton= document.getElementById("next-btn");
const messageContainer = document.getElementById("message-container");


let currentQuestionIndex= 0;
let score = 0; 

function startQuiz(){
    currentQuestionIndex = 0;
    score= parseInt(localStorage.getItem("score")) || 0;

    const timeLimitInSeconds = 1200; 
    startTimer(timeLimitInSeconds, document.getElementById("timer-display"));
    
    nextButton.innerHTML = "Next";
    showQuestion ();
}
function loadQuiz(){
    currentQuestionIndex = parseInt(localStorage.getItem("currentQuestionIndex")) || 0;
    score= parseInt(localStorage.getItem("score")) || 0;
    
    nextButton.innerHTML = "Next";
    showQuestion ();
}

let timerInterval;

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    timerInterval=setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = 0;
                clearInterval(timerInterval); 
                display.textContent = "Time's up!";
                showGameOver();
           
        }
    }, 1000);
}

function showGameOver() {
    stopGame ();
    questionElement.innerHTML = "Game Over! You could not escape the Library Maze. ";
    answerButton.innerHTML = ''; 
    nextButton.style.display = 'none'; }

window.onload = function () {
    var time = 20 * 60, 
        display = document.querySelector('#TimerDisplay');
    startTimer(time, display);
};


function stopGame() {

   
    const answerButtons = document.querySelectorAll('.btn');
    clearInterval(timerInterval);
    answerButtons.forEach(button => {
        button.removeEventListener('click', selectAnswer);
        button.disabled = true;
    });

    
    nextButton.removeEventListener('click', nextQuestion);
    nextButton.disabled = true;
}



function resetState(){
         nextButton.style.display ="none";
         while(answerButton.firstChild){
            answerButton.removeChild(answerButton.firstChild);

}
}

let strikes = 0;

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (!isCorrect) {
        selectedBtn.classList.add("incorrect");
        strikes++;
        document.getElementById('strike-number').textContent = strikes;
        
        
        if (strikes === 3) {
            showGameOver();
            return;
        }
    } else {
        selectedBtn.classList.add("correct");
        nextButton.style.display = "block";
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
localStorage.setItem("currentQuestionIndex", currentQuestionIndex);

    resetState();

    if(strikes ===3) {
        showGameOver();
        return;
    }

   
    if (currentQuestionIndex < questions.length) {
      
        showQuestion();
    } else {
        showCongratulations();
    }

    
    nextButton.addEventListener('click', nextQuestion);

    
}

function showCongratulations() {
    questionElement.innerHTML = "Congratulations! You've escaped the library!";
    answerButton.innerHTML = ''; 
    nextButton.style.display = 'none'; 
    localStorage.clear(); 
}

function submitName () {
    var name=document.getElementById("name-input").value;
    var submittedNameElement = document.getElementById("submitted-name");
    submittedNameElement.textContent = "Submitted Name: " +name;
}

function checkScrambledAnswer(userAnswer) {
    const currentQuestion = questions[currentQuestionIndex];
    const messageContainer = document.getElementById("message-container");
    if (userAnswer === currentQuestion.correctAnswer.toLowerCase()) {
        nextButton.style.display = "block";
        messageContainer.innerHTML = "";
    } else {
        messageContainer.innerHTML = "<p style='color: red;'>Incorrect! Try Again!</p>";
    }

    
}

function checkClueAnswer(userAnswer) {
    const currentQuestion = questions[currentQuestionIndex];
    const messageContainer = document.getElementById("message-container");

    if (userAnswer === currentQuestion.correctAnswer.toLowerCase()) {
        nextButton.style.display = "block";
        messageContainer.innerHTML = "";
    } else {
        messageContainer.innerHTML = "<p style='color: red;'>Incorrect!</p>";
    }
}



function showQuestion() {
    console.log("Entering showQuestion function");
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    if (currentQuestion.isTrueFalse) {
        
        const trueButton = document.createElement("button");
        trueButton.innerHTML = "True";
        trueButton.classList.add("btn");
        answerButton.appendChild(trueButton);
        trueButton.dataset.correct = true;

        const falseButton = document.createElement("button");
        falseButton.innerHTML = "False";
        falseButton.classList.add("btn");
        answerButton.appendChild(falseButton);
        falseButton.dataset.correct = false;

        trueButton.addEventListener('click', selectAnswer);
        falseButton.addEventListener('click', selectAnswer);
    } else if (currentQuestion.scrambledWord) {
     
        const scrambledLettersContainer = document.createElement("div");
        scrambledLettersContainer.innerHTML = currentQuestion.scrambledWord;
        scrambledLettersContainer.id = "scrambled-letters-container";
        scrambledLettersContainer.classList.add("scrambled-container");
        answerButton.appendChild(scrambledLettersContainer);




        const inputField = document.createElement("input");
        inputField.type = "text";
        inputField.id = "answer-input";
        answerButton.appendChild(inputField);

        const submitButton = document.createElement("button");
        submitButton.innerHTML = "I know the secret word!";
        submitButton.classList.add("btn");
        answerButton.appendChild(submitButton);

        submitButton.addEventListener("click", () => {
            const userAnswer = inputField.value.trim().toLowerCase();
            checkScrambledAnswer(userAnswer);
        });
        

        
    }else if (currentQuestion.clues) {
        const cluesContainer = document.createElement("div");
        cluesContainer.id = "clues-container";
        cluesContainer.classList.add("clues-container");
        answerButton.appendChild(cluesContainer);

        const inputField = document.createElement("input");
        inputField.type = "text";
        inputField.id = "clue-input";
        inputField.placeholder = "Type your answer";
        answerButton.appendChild(inputField);

        const cluesButton = document.createElement("button");
        cluesButton.innerHTML = "Show Clues";
        cluesButton.classList.add("btn");
    

        const cluesList = document.createElement("ul");
        cluesList.classList.add("clues-list");
        cluesContainer.appendChild(cluesList);

        cluesButton.addEventListener("click", () => {
            cluesContainer.classList.add("show");

            currentQuestion.clues.forEach((clue, index) => {
                setTimeout(() => {
                    const clueItem = document.createElement("li");
                    clueItem.innerHTML = clue;
                    cluesList.appendChild(clueItem);
                }, (index + 1) * 1000);
            });
            cluesButton.disabled = true;
        });

        const submitButton = document.createElement("button");
        submitButton.innerHTML = "Submit Answer";
        submitButton.classList.add("btn");
        answerButton.appendChild(submitButton);

        submitButton.addEventListener("click", () => {
            const userAnswer = inputField.value.trim().toLowerCase();
            checkClueAnswer(userAnswer);
        });

        
        
        answerButton.appendChild(inputField);
        answerButton.appendChild(cluesButton);
        answerButton.appendChild(submitButton);
        answerButton.appendChild(cluesContainer);
    

    } else {
        currentQuestion.answers.forEach(answer => {
            const button = document.createElement("button");
            button.innerHTML = answer.text;
            button.classList.add("btn");
            answerButton.appendChild(button);
            if (answer.correct) {
                button.dataset.correct = answer.correct;
                
            }
            button.addEventListener('click', selectAnswer);
            
        });
    }
}
    
      
    
    
    

startQuiz();
