/* 

AS A coding boot camp student
I WANT to take a timed quiz on JavaScript fundamentals that stores high scores
SO THAT I can gauge my progress compared to my peers

GIVEN I am taking a code quiz
WHEN I click the start button
THEN a timer starts and I am presented with a question
WHEN I answer a question
THEN I am presented with another question
WHEN I answer a question incorrectly
THEN time is subtracted from the clock
WHEN all questions are answered or the timer reaches 0
THEN the game is over
WHEN the game is over
THEN I can save my initials and score

Initial Setup
* Start Button
* View High Scores
* Go Back
* Clear High Scores

*/

var timer = 75;
var questionCount = 0;
var questions = [
    {id: 0, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua?", options: {a: "Option 1", b: "Option 2", c: "Option 3", d: "Option 4"}, answer: "a" },
    {id: 1, text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.?", options: {a: "Option A", b: "Option B", c: "Option C", d: "Option D"}, answer: "b" },
    {id: 2, text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur?", options: {a: "Option 1", b: "Option 2", c: "Option 3", d: "Option 4"}, answer: "c" },
    {id: 3, text: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum?", options: {a: "Option A", b: "Option B", c: "Option C", d: "Option D"}, answer: "d" }
]
var bodyEl = document.getElementById("body");
var pageContentEl = document.getElementById("page-content");

function clickHandler(e) {
    // get target element from event
    var targetEl = e.target;

    if (targetEl.matches(".start-btn")) {
        // Remove Start Content
        var startEl = document.getElementById("quiz-start");
        startEl.remove();
        // Render Quiz
        renderQuiz();
    } else if (targetEl.matches(".option")) {
        // Advance Quiz
        provideFeedbackAndTransition(targetEl.id);
    } else if (targetEl.matches(".history-btn")) {
        // Go To Scores
    } else if (targetEl.matches(".back-btn")) {
        // Go Back to Start
    } else if (targetEl.matches(".clear-btn")) {
        // Clear Scores And Go Back to Start
    }
}

function submitHandler(e) {

}

function buildStartContent() {
    var divEl = document.createElement("div");
    divEl.className = "quiz quiz-start";
    divEl.id = "quiz-start";

    var h1El = document.createElement("h1");
    h1El.textContent = "Coding Quiz Challenge";

    var pEl = document.createElement("p");
    pEl.textContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua";

    var buttonEl = document.createElement("button");
    buttonEl.textContent = "Start Quiz";
    buttonEl.className = "btn start-btn";

    divEl.append(h1El, pEl, buttonEl);
    return divEl;
}

function buildQuizContent() {
    var divEl = document.createElement("div");
    divEl.className = "quiz quiz-question";
    divEl.id = "quiz-question";

    var h2El = document.createElement("h2");
    h2El.id = "quiz-text"

    var ulEl = document.createElement("ul");
    ulEl.id = "quiz-options";
    
    var liAEl = document.createElement("li");
    liAEl.id = "option-a";
    liAEl.className = "option";

    var liBEl = document.createElement("li");
    liBEl.id = "option-b";
    liBEl.className = "option";

    var liCEl = document.createElement("li");
    liCEl.id = "option-c";
    liCEl.className = "option";

    var liDEl = document.createElement("li");
    liDEl.id = "option-d";
    liDEl.className = "option";

    ulEl.append(liAEl, liBEl, liCEl, liDEl);
    divEl.append(h2El, ulEl);

    return divEl;
}

function buildQuestionContent() {
    var q = questions[questionCount];
    var h2El = document.getElementById("quiz-text");
    h2El.textContent = q.text;

    var ulEl = document.getElementById("quiz-options");
    ulEl.setAttribute("data-question-id", q.id);

    var optionAEl = document.getElementById("option-a");
    optionAEl.textContent = q.options.a;

    var optionBEl = document.getElementById("option-b");
    optionBEl.textContent = q.options.b;

    var optionCEl = document.getElementById("option-c");
    optionCEl.textContent = q.options.c;

    var optionDEl = document.getElementById("option-d");
    optionDEl.textContent = q.options.d;
}

function buildHistoryContent() {

}

function buildFormContent() {

}

function renderStart() {
    var startEl = buildStartContent();
    pageContentEl.appendChild(startEl);
}

function renderQuiz() {
    var quizEl = buildQuizContent();
    pageContentEl.appendChild(quizEl);
    renderQuestion();
}

function renderQuestion() {    
    buildQuestionContent();
    questionCount++;
}

function renderHistory() {

}

function renderScoreForm() {
    // var formContentEl = buildFormContent();
    // formContentEl.addEventListener("submit", submitHandler);
}

function getAnswerByQuestionId(id) {
    for(var i = 0; i < questions.length; i++) {
        if (questions[i].id == parseInt(id)) {
            return questions[i].answer;
        }
    }
}

function validateAnswer(answerId) {
    var a = answerId.split("-");
    var questionEl = document.getElementById("quiz-options");
    var questionElId = questionEl.getAttribute("data-question-id");
    var questionAnswer = getAnswerByQuestionId(questionElId);

    if (questionAnswer == a[1]) {
        return true;
    } else {
        return false;
    }
}

function renderFeedback(answerId, is_correct) {
    var answerEl = document.getElementById(answerId);
    console.log(answerEl);
    if (is_correct) {
        answerEl.className = "option correct";
    } else {
        answerEl.className = "option wrong";
    }
}

function resetQuestionAnswers() {
    var answerEls = document.querySelectorAll("li[id^='option-']");
    for(var i=0; i<answerEls.length; i++) {
        answerEls[i].className = "option";
    }
}

function provideFeedbackAndTransition(answerId) {
    var is_correct = validateAnswer(answerId);
    renderFeedback(answerId, is_correct);

    setTimeout(function(){
        resetQuestionAnswers();
        advanceQuiz();
    }, 1500);
}

function advanceQuiz() {
    if (questions.length > questionCount) {
        renderQuestion();
    } else {
        renderScoreForm();
    }
}

function quizInit() {
    renderStart();
    bodyEl.addEventListener("click", clickHandler);
}

quizInit();