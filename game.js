let questions = [
  {
    question:
      "In the enchanting library, amidst secrets so wide, a hidden message you found, a treasure to guide; a story, a tale, or something sweet, which word's the key? Let the adventure greet!   ",
    answers: [
      { text: "lantern", correct: false },
      { text: "staircase", correct: false },
      { text: "tale", correct: true },
      { text: "whisper", correct: false },
    ],
  },
  {
    question:
      "Weaving through the castles charm, you see a number flight. Just through the passageway you see the numbers 8x9+7, leading you into a magical light.",
    answers: [
      { text: "79", correct: true },
      { text: "80", correct: false },
      { text: "92", correct: false },
      { text: "71", correct: false },
    ],
  },
  {
    question:
      "In the enchanted library, fiction books lead to make-believe worlds, while non-fiction books guide the path to the real way to escape. ",
    answers: [
      { text: "True", correct: true },
      { text: "False", correct: false },
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
    question:
      "In the mysterious library, you uncover a potion recipe that requires mixing various ingredients. The recipe calls for 1/2 cup of ghostly mist, 1/4 cup of enchanted essence, and 1/4 cup of spectral brew. The total amount of potion is 3/4 cup.",

    answers: [
      { text: "True", correct: true },
      { text: "False", correct: false },
    ],
    isTrueFalse: true,
  },

  {
    question:
      "In the magical library, you discover a hidden scroll labeled 'The Mystic Multiples.' The sequence inside is generated by multiplying each term by a consistent factor. The initial term is 4, and the sequence is as follows: 4, 8, 16, 32, ___.",
    answers: [
      { text: "40", correct: false },
      { text: "48", correct: true },
      { text: "56", correct: false },
      { text: "64", correct: false },
    ],
  },
  {
    question:
      "You find yourself in the history section, on the wall you are drawn to a book. The History of Newfoundland and Labrador. Another step closer! Find the answer with these three clues!",
    clues: [
      "My name starts with A.",
      "I am the second largest in the world.",
      "Sailors and fisherman navigate me to reach distant shores.",
    ],
    correctAnswer: "Atlantic Ocean",
  },
  {
    question:
      "In the ancient library of enchantments, there are 789 enchanted crystals on one shelf and 423 mystical scrolls on another. The total number of magical items on both shelves is 1,512. Is this statement true or false?",
    answers: [
      { text: "True", correct: true },
      { text: "False", correct: false },
    ],
    isTrueFalse: false,
  },
  {
    question: "Unscramble the letters",
    scrambledWord: "STIHYRO",
    correctAnswer: "HISTORY",
    isTrueFalse: false,
  },

  {
    question:
      "In the eerie corridors of the haunted library, a mysterious shape lurks among the dusty tomes. Can you unveil its identity with these spine-chilling clues?",
    clues: [
      "This mysterious shape has 4 sides, quietly holding ancient secrets.",
      "It casts shadows of right angles, reminiscent of the creaking bookshelves.",
      "The ghostly whispers reveal that opposite sides of this shape share the same spectral length.",
    ],
    correctAnswer: "Rectangle",
  },
];
const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const messageContainer = document.getElementById("message-container");

let numberOfQuestions = 10;
let categoryId;

async function fetchQuestions(difficulty) {
  const response = await fetch(
    `https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${categoryId}&difficulty=${difficulty}`
  );
  const data = await response.json();
  const results = data.results;
  console.log("Results: ", results);

  const formattedResults = results.map((result) => {
    if (result.type === "multiple") {
      return {
        question: result.question,
        answers: [
          { text: result.correct_answer, correct: true },
          { text: result.incorrect_answers[0], correct: false },
          { text: result.incorrect_answers[1], correct: false },
          { text: result.incorrect_answers[2], correct: false },
        ].sort(() => Math.random() - 0.5),
      };
    }
    return {
      question: result.question,
      answers: [
        { text: result.correct_answer, correct: true },
        { text: result.incorrect_answers[0], correct: false },
      ].sort(() => Math.random() - 0.5),
    };
  });
  return formattedResults;
}

let currentQuestionIndex = 0;
let score = 0;
let strikes = 0;
let timerInterval;
let display = document.querySelector("#TimerDisplay");
let timeLimitInSeconds;

async function startQuiz() {
  const searchParams = new URLSearchParams(window.location.search);
  const selectedDifficulty = searchParams.get("level");
  categoryId = searchParams.get("categoryId");

  let fetchedQuestions;

  if (selectedDifficulty === "easy") {
    fetchedQuestions = questions;
    timeLimitInSeconds= 20 * 60;
  } else if (selectedDifficulty === "medium") {
    timeLimitInSeconds = 10 * 60;
    numberOfQuestions = 15;
    fetchedQuestions = await fetchQuestions("easy", numberOfQuestions);
  } else if (selectedDifficulty === "hard") {
    timeLimitInSeconds = 5 * 60;
    numberOfQuestions = 10;
    fetchedQuestions = await fetchQuestions("medium", numberOfQuestions);
  }

  if (fetchedQuestions.length > 0) {
    questions = fetchedQuestions;
    questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    score = 0;

    currentQuestionIndex = 0;
    score = parseInt(localStorage.getItem("score")) || 0;

    const url = window.location.href;
    const difficulty = url.split("=")[1];

    
    startTimer(timeLimitInSeconds,);

    nextButton.innerHTML = "Next";
    showQuestion();
  }
}

function loadQuiz() {
  currentQuestionIndex =
    parseInt(localStorage.getItem("currentQuestionIndex")) || 0;
  score = parseInt(localStorage.getItem("score")) || 0;

  nextButton.innerHTML = "Next";
  showQuestion();
}

function startTimer(duration) {
  let timer = duration;
  let minutes;
  let seconds;
  timerInterval = setInterval(function () {
    minutes = parseInt(timer / 60, 10);
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

function incrementStrike() {
  strikes++;
  document.getElementById("strike-number").textContent = strikes;

  if (strikes === 3) {
    showGameOver();
  }
}

function submitName() {
  let name = document.getElementById("player-name-input").value;
  let submittedNameElement = document.getElementById("submitted-name");
  submittedNameElement.textContent = "Explorer: " + name;
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
  }
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

    trueButton.addEventListener("click", selectAnswer);
    falseButton.addEventListener("click", selectAnswer);
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
  } else if (currentQuestion.clues) {
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
    currentQuestion.answers.forEach((answer) => {
      const button = document.createElement("button");
      button.innerHTML = answer.text;
      button.classList.add("btn");
      answerButton.appendChild(button);
      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }
      button.addEventListener("click", selectAnswer);
    });
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";

  if (!isCorrect) {
    selectedBtn.classList.add("incorrect");
    strikes++;
    document.getElementById("strike-number").textContent = strikes;

    if (strikes === 3) {
      showGameOver();
      return;
    }
  } else {
    selectedBtn.classList.add("correct");
    nextButton.style.display = "block";
  }

  const answerButtons = document.querySelectorAll(".btn");
  answerButtons.forEach((button) => {
    button.removeEventListener("click", selectAnswer);
    button.addEventListener("click", selectAnswer);
  });

  nextButton.addEventListener("click", nextQuestion);
}

function checkScrambledAnswer(userAnswer) {
  const currentQuestion = questions[currentQuestionIndex];
  const messageContainer = document.getElementById("message-container");
  if (userAnswer === currentQuestion.correctAnswer.toLowerCase()) {
    nextButton.style.display = "block";
    messageContainer.innerHTML = "";
    nextButton.addEventListener("click", nextQuestion);
  } else {
    messageContainer.innerHTML =
      "<p style='color: red;'>Incorrect! Try Again!</p>";
    incrementStrike();
  }
}

function checkClueAnswer(userAnswer) {
  const currentQuestion = questions[currentQuestionIndex];
  const messageContainer = document.getElementById("message-container");

  if (userAnswer === currentQuestion.correctAnswer.toLowerCase()) {
    nextButton.style.display = "block";
    messageContainer.innerHTML = "";
    nextButton.addEventListener("click", nextQuestion);
  } else {
    messageContainer.innerHTML = "<p style='color: red;'>Incorrect!</p>";
    incrementStrike();
  }
}

function nextQuestion() {
  currentQuestionIndex++;
  localStorage.setItem("currentQuestionIndex", currentQuestionIndex);

  resetState();

  if (strikes === 3) {
    showGameOver();
    return;
  }

  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showCongratulations();
  }

  nextButton.addEventListener("click", nextQuestion);
}

function showCongratulations() {
  questionElement.innerHTML = "Congratulations! You've escaped the library!";
  answerButton.innerHTML = "";
  messageContainer.innerHTML = "";
  nextButton.style.display = "none";
  localStorage.clear();
}

function showGameOver() {
  stopGame();
  questionElement.innerHTML =
    "Game Over! You could not escape the Library Maze. ";
  answerButton.innerHTML = "";
  nextButton.style.display = "none";
}

function stopGame() {
  const answerButtons = document.querySelectorAll(".btn");
  clearInterval(timerInterval);
  answerButtons.forEach((button) => {
    button.removeEventListener("click", selectAnswer);
    button.disabled = true;
  });

  nextButton.removeEventListener("click", nextQuestion);
  nextButton.disabled = true;
}

window.onload = function () {
  let time = 20 * 60;
  if (display) {
  }

  let submitButton = document.getElementById("submit-name");
  submitButton.addEventListener("click", submitName);
};
startQuiz();
