
let rightQuestions = 0;
let currentQuestion = 0;
let AUDIO_SUCCESS = new Audio('audio/success.mp3');
let AUDIO_FAIL = new Audio('audio/fail.mp3');

function init() {
    document.getElementById('all-questions').innerHTML = questions.length;

    showQuestion();
}

function showQuestion() {
    if (gameIsOver()) {
        showEndScreen();
    } else {
        updateToNextQuestion();
    }
    updateProgressBar();
}

function gameIsOver() {
    return currentQuestion >= questions.length
}

function showEndScreen() {
    //Show end Screen
    document.getElementById('endScreen').style = '';
    document.getElementById('questionBody').style = "display: none";
    document.getElementById('amount-of-questions').innerHTML = questions.length;
    document.getElementById('amount-of-right-questions').innerHTML = rightQuestions;
    document.getElementById('header-image').src = 'img/win.png';
}

function updateProgressBar() {
    let percent = currentQuestion / questions.length;
    percent = Math.round(percent * 100);

    document.getElementById('progress-bar').innerHTML = `${percent}%`;
    document.getElementById('progress-bar').style = `width: ${percent}%`;
}

function updateToNextQuestion() {
    let question = questions[currentQuestion];

    document.getElementById('question-number').innerHTML = currentQuestion + 1;
    document.getElementById('questiontext').innerHTML = question['question'];
    document.getElementById('answer_1').innerText = question['answer_1'];
    document.getElementById('answer_2').innerText = question['answer_2'];
    document.getElementById('answer_3').innerText = question['answer_3'];
    document.getElementById('answer_4').innerText = question['answer_4'];
}

function answer(selection) {
    let question = questions[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1);

    if (rightAnswerSelected(question, selectedQuestionNumber)) {
        document.getElementById(selection).parentNode.classList.add('bg-success');
        AUDIO_SUCCESS.play();
        rightQuestions++;
    } else {
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById('answer_' + question['right_answer']).parentNode.classList.add('bg-success');
        AUDIO_FAIL.play();
    }
    document.getElementById('next-button').disabled = false;

    disableAnswerButtons();
}

function rightAnswerSelected(question, selectedQuestionNumber) {
    return selectedQuestionNumber == question['right_answer'];
}

function nextQuestion() {
    currentQuestion++;
    document.getElementById('next-button').disabled = true;
    resetAnswerButtons();
    enableAnswerButtons();
    showQuestion();

}

function resetAnswerButtons() {
    for (let i = 1; i < 5; i++) {
        document.getElementById('answer_' + i).parentNode.classList.remove('bg-danger');
        document.getElementById('answer_' + i).parentNode.classList.remove('bg-success');
    }
}

function restartGame() {
    document.getElementById('header-image').src = './img/backgraund.jpg';
    document.getElementById('questionBody').style = '';
    document.getElementById('endScreen').style = "display: none";
    rightQuestions = 0;
    currentQuestion = 0;
    init();
}

function disableAnswerButtons() {
    for (let i = 1; i < 5; i++) {
        document.getElementById('answer_' + i).parentNode.removeAttribute("onclick");
        document.getElementById('answer_' + i).parentNode.classList.remove('cursor-pointer');
    }
}

function enableAnswerButtons() {
    for (let i = 1; i < 5; i++) {
        document.getElementById('answer_' + i).parentNode.setAttribute("onclick", `answer('answer_${i}')`);
        document.getElementById('answer_' + i).parentNode.classList.add('cursor-pointer');
    }
}


