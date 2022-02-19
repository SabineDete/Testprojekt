// helper functions////////////////////////////////////////////////////////
function getId(id) {
    return document.getElementById(id);
}

function fisherYatesShuffle() {
    let arr = [];
    // fill array with indices of answers
    for (let i = 0; i < numberOfAnswers; i++) {
        arr.push(i);
    }
    //shuffle indices
    for (var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1)); //random index
        [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
    }
    return arr;
}

////////////////////////////////////////////////////////
function lastQuestion(index) {
    return index == numberOfQuestions - 1;
}

function renderNextButton(index) {
    let button = getId("next-button");
    if (lastQuestion(index)) {
        button.innerHTML = 'Ergebnis';
        button.setAttribute("onclick", 'showResult()');
    }
    else {
        button.innerHTML = 'Nächste Frage';
        button.setAttribute("onclick", `renderCard(${index + 1})`);
    }
    // disable button til answer is selected
    button.disabled = true;
}

function renderQuestion(index) {
    let currentQuestion = questions[index];
    //show question text
    getId("card-title").innerHTML = currentQuestion.question;
}

function renderAnswers(index) {
    let currentQuestion = questions[index];
    //randomize order of answer possibilities
    let shuffledOrder = fisherYatesShuffle();
    //render answer possibilities
    for (let i = 0; i < numberOfAnswers; i++) {
        const answer = currentQuestion.answers[shuffledOrder[i]];
        const correctAnswerIndex = shuffledOrder.indexOf(currentQuestion.correctIndex);
        const answerCard = getId(`answer-card-${i}`);
        // show answer text
        getId(`answer-${i}`).innerHTML = `${answer}`;
        //define onclick with actual answer index and correct answer index
        answerCard.setAttribute("onclick", `checkAnswer(${i},${correctAnswerIndex})`);
        // getId(`answer-card-${i}`).onclick =`checkAnswer(${i},${correctAnswerIndex})`;
        //(re)set card color and hover effect
        answerCard.style.backgroundColor = "white";
        answerCard.classList.add("answer-card-hover");
    }
}

function selectionCorrect(clickedIndex, correctIndex) {
    return clickedIndex == correctIndex;
}

function setAfterSelectionCardStyle() {
    updateProgressBar();

    //disable onclick and hover for all answer cards
    for (let i = 0; i < numberOfAnswers; i++) {
        getId(`answer-card-${i}`).onclick = null;
        getId(`answer-card-${i}`).classList.remove("answer-card-hover");
    }
    //enable next-button
    getId("next-button").disabled = false;
}


function checkAnswer(clickedIndex, correctIndex) {
    let clickedAnswer = getId(`answer-card-${clickedIndex}`);
    let correctAnswer = getId(`answer-card-${correctIndex}`);

    if (selectionCorrect(clickedIndex, correctIndex)) {//correct answer
        audioSuccess.play();
        clickedAnswer.style.backgroundColor = "#B4D639";//green
        numberOfCorrectAnswers++;
    } else {//wrong answer
        audioFail.play();
        clickedAnswer.style.backgroundColor = "#FF5C00";//red
        correctAnswer.style.backgroundColor = "#B4D639";//green
    }
    numberOfQuestionsAnswered++;
    setAfterSelectionCardStyle();
}

function updateProgressBar() {
    let donePct = Math.round(numberOfQuestionsAnswered / numberOfQuestions * 10000) / 100;
    const progress = getId("progress-bar");
    progress.style.width = `${donePct}%`;
    progress.setAttribute("aria-valuenow", `${donePct}`);
    progress.innerHTML = `${donePct}%`;
}

function updateCounter(index) {
    const counter = getId("counter");
    counter.innerHTML = `Frage <b>${index + 1}</b> von <b>${numberOfQuestions}</b>`;
}

function allAnswersCorrect() {
    return numberOfCorrectAnswers == numberOfQuestions;
}


function showResult() {
    audioFinal.play();
    //show result screen
    getId('game').classList.add('d-none');
    getId('result').classList.remove('d-none');

    getId('result-text').innerHTML = `Du hast <b>${numberOfCorrectAnswers}</b> von <b>${numberOfQuestions}</b> Fragen richtig beantwortet.`;

    if (allAnswersCorrect()) {
        confetti.start();
        setTimeout(confetti.stop, 4000);
    }
}

function renderCard(index) {
    renderQuestion(index);
    renderAnswers(index);
    updateProgressBar();
    updateCounter(index);
    renderNextButton(index);
}

function startGame() {
    numberOfQuestionsAnswered = 0;
    numberOfCorrectAnswers = 0;
    // show game screen
    getId('startScreen').classList.add('d-none');
    getId('game').classList.remove('d-none');
    getId('result').classList.add('d-none');
    renderCard(0);
}