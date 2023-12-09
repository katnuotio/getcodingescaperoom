const quizContainer = document.getElementById('quiz-container');
const questionContainer = document.getElementById('question-container');
const submitButton = document.getElementById('submit-btn');
const resultsContainer = document.getElementById('results-container');

// Quiz data
const quizData = 
    {
        type: 'multiple-choice',
        question: 'What is the capital of France?',
        options: ['Berlin', 'Paris', 'Madrid', 'Rome'],
        correctAnswer: 'Paris'
    }

    let steps = 0;
    const maxSteps = 10;
    function increaseSteps() {}

