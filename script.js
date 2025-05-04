document.addEventListener('DOMContentLoaded', function () {
    // Quiz questions
    const quizQuestions = [
        {
            question: "What is the capital of France?",
            options: ["London", "Paris", "Berlin", "Madrid"],
            answer: "Paris"
        },
        {
            question: "Which planet is known as the Red Planet?",
            options: ["Venus", "Mars", "Jupiter", "Saturn"],
            answer: "Mars"
        },
        {
            question: "What is the largest mammal in the world?",
            options: ["Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
            answer: "Blue Whale"
        },
        {
            question: "Which language runs in a web browser?",
            options: ["Java", "C", "Python", "JavaScript"],
            answer: "JavaScript"
        },
        {
            question: "What year was JavaScript launched?",
            options: ["1996", "1995", "1994", "none of the above"],
            answer: "1995"
        }
    ];

    // DOM elements
    const questionElement = document.getElementById('question');
    const optionsContainer = document.getElementById('options-container');
    const progressBar = document.getElementById('progress-bar');
    const questionCounter = document.getElementById('question-counter');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');
    const resultContainer = document.getElementById('result-container');
    const scoreText = document.getElementById('score-text');
    const restartBtn = document.getElementById('restart-btn');
    const emojiResult = document.querySelector('.emoji-result');

    // Quiz state
    let currentQuestionIndex = 0;
    let userAnswers = Array(quizQuestions.length).fill(null);
    let score = 0;

    // Initialize quiz
    function initQuiz() {
        showQuestion();
        updateProgressBar();
        updateNavButtons();
    }

    // Show current question
    function showQuestion() {
        const currentQuestion = quizQuestions[currentQuestionIndex];
        questionElement.textContent = currentQuestion.question;

        optionsContainer.innerHTML = '';
        currentQuestion.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.classList.add('option');
            if (userAnswers[currentQuestionIndex] === option) {
                optionElement.classList.add('selected');
            }
            optionElement.textContent = option;
            optionElement.addEventListener('click', () => selectOption(option));
            optionsContainer.appendChild(optionElement);
        });

        questionCounter.textContent = `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`;
    }

    // Select an option
    function selectOption(selectedOption) {
        userAnswers[currentQuestionIndex] = selectedOption;
        showQuestion();
        updateNavButtons();
    }

    // Update navigation buttons
    function updateNavButtons() {
        prevBtn.disabled = currentQuestionIndex === 0;

        if (currentQuestionIndex === quizQuestions.length - 1) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'block';
        } else {
            nextBtn.style.display = 'block';
            submitBtn.style.display = 'none';
        }

        // Disable next/submit if no answer selected
        if (userAnswers[currentQuestionIndex] === null) {
            nextBtn.disabled = true;
            submitBtn.disabled = true;
        } else {
            nextBtn.disabled = false;
            submitBtn.disabled = false;
        }
    }

    // Update progress bar
    function updateProgressBar() {
        const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
        progressBar.style.width = `${progress}%`;
    }

    // Go to next question
    function nextQuestion() {
        if (currentQuestionIndex < quizQuestions.length - 1) {
            currentQuestionIndex++;
            showQuestion();
            updateProgressBar();
            updateNavButtons();
        }
    }

    // Go to previous question
    function prevQuestion() {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            showQuestion();
            updateProgressBar();
            updateNavButtons();
        }
    }

    // Submit quiz
    function submitQuiz() {
        score = 0;
        userAnswers.forEach((answer, index) => {
            if (answer === quizQuestions[index].answer) {
                score++;
            }
        });

        // Show result
        showResult();
    }

    // Show result
    function showResult() {
        scoreText.textContent = `Your score: ${score}/${quizQuestions.length}`;

        // Set emoji based on score
        const percentage = (score / quizQuestions.length) * 100;
        if (percentage >= 80) {
            emojiResult.textContent = '🎉';
        } else if (percentage >= 50) {
            emojiResult.textContent = '😊';
        } else {
            emojiResult.textContent = '😢';
        }

        resultContainer.style.display = 'flex';
    }

    // Restart quiz
    function restartQuiz() {
        currentQuestionIndex = 0;
        userAnswers = Array(quizQuestions.length).fill(null);
        score = 0;
        resultContainer.style.display = 'none';
        initQuiz();
    }

    // Event listeners
    nextBtn.addEventListener('click', nextQuestion);
    prevBtn.addEventListener('click', prevQuestion);
    submitBtn.addEventListener('click', submitQuiz);
    restartBtn.addEventListener('click', restartQuiz);

    // Initialize the quiz
    initQuiz();
});