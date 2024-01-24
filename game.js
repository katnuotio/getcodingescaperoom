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
{ else { 
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
        nextButton.style.display = "block";
    } else {
        selectedBtn.classList.add("incorrect");
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

function showQuestion() {
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
        scrambledLettersContainer.classList.add("btn");
        answerButton.appendChild(scrambledLettersContainer);

        const messageContainer = document.getElementById("message-container");


        const inputField = document.createElement("input");
        inputField.type = "text";
        inputField.id = "answer-input";
        answerButton.appendChild(inputField);

        const submitButton = document.createElement("button");
        submitButton.innerHTML = "I know the secret word!";
        submitButton.classList.add("btn");
        answerButton.appendChild(submitButton);

        submitButton.addEventListener('click', () => {
            const userAnswer = inputField.value.trim().toLowerCase();
            checkScrambledAnswer(userAnswer);
        });

        function checkScrambledAnswer(userAnswer) {
            const currentQuestion = questions[currentQuestionIndex];
            if (userAnswer === currentQuestion.correctAnswer.toLowerCase()) {
                nextButton.style.display = "block";
                messageContainer.innerHTML = "";
            } else {
                messageContainer.innerHTML = "<p style='color: red;'>Incorrect! Try Again!</p>";
            }
        }
    }else if (currentQuestion.clues) {
        const cluesContainer = document.createElement("div");
        cluesContainer.id = "clues-container";
        cluesContainer.classList.add("clues-container");
        answerButton.appendChild(cluesContainer);
    
        const inputField = document.createElement("input");
        inputField.type = "text";
        inputField.id = "clue-input";
        inputField.placeholder = "Type your answer";
        cluesContainer.appendChild(inputField);
    
        const cluesButton = document.createElement("button");
        cluesButton.innerHTML = "Show Clues";
        cluesButton.classList.add("btn");
        cluesContainer.appendChild(cluesButton);
    
        const cluesList = document.createElement("ul");
        cluesList.classList.add("clues-list");
        cluesContainer.appendChild(cluesList);
    
        cluesButton.addEventListener("click", () => {
            console.log
            currentQuestion.clues.forEach(clue => {
                const clueItem = document.createElement("li");
                clueItem.innerHTML = clue;
                cluesList.appendChild(clueItem);
            });
            cluesButton.disabled = true;
        });
    

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


    
    
    

startQuiz();
