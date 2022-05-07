// helper functions////////////////////////////////////////////////////////
function getId(id) {
    return document.getElementById(id);
}


/** Random shuffle of numbers in an array *  
 * @returns {array} with shuffled numbers
 */
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

/**
 * switch between muted and not muted sounds
 * sounds are played only if soundOn=true
 */
function toggleVolume() {
    soundOn = !soundOn;
    volume = getId('volume');
    if (soundOn) {
        volume.src = "img/volume-off.png";
        volume.alt = "Ton aus";
        volume.title = "Ton aus";
    } else {
        volume.src = "img/volume-on.png";
        volume.alt = "Ton an";
        volume.title = "Ton an";
    }
}


/**
 * returns true if the current question is the last one
 * @param {integer} index 
 * @returns {boolean}
 */
function lastQuestion(index) {
    return index == numberOfQuestions - 1;
}


/**
 * Adjusts text and onclick of next-button 
 * disables the button
 * @param {integer} index 
 */
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


/**
 * Randomly shuffles answer possibilities and shows them in the quiz card
 * defines onclick-function for answers
 * resets answer styles
 * @param {integer} - index of question
 */
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
        // answerCard.setAttribute("onclick", `checkAnswer(${i},${correctAnswerIndex})`);
        getId(`answer-card-${i}`).onclick = function () { checkAnswer(i, correctAnswerIndex) };
        //(re)set card color and hover effect
        answerCard.style.backgroundColor = "white";
        answerCard.classList.add("answer-card-hover");
    }
}


/**
 * is true if the selected answer is correct
 * @param {integer} clickedIndex 
 * @param {integer} correctIndex 
 * @returns {boolean}
 */
function selectionCorrect(clickedIndex, correctIndex) {
    return clickedIndex == correctIndex;
}


/**
 * updates progress bar
 * disables onclick and hover on answers
 * enables next-button
 */
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


/**
 * marks correct and wrong answers with background colors and plays sound
 * increases numberOfQuestionsAnswered and eventually numberOfCorrectAnswers
 * uses setAfterSelectionCardStyle()
 * @param {integer} clickedIndex 
 * @param {integer} correctIndex 
 */
function checkAnswer(clickedIndex, correctIndex) {
    let clickedAnswer = getId(`answer-card-${clickedIndex}`);
    let correctAnswer = getId(`answer-card-${correctIndex}`);

    if (selectionCorrect(clickedIndex, correctIndex)) {//correct answer
        if (soundOn) { audioSuccess.play(); }
        clickedAnswer.style.backgroundColor = "#B4D639";//green
        numberOfCorrectAnswers++;
    } else {//wrong answer
        if (soundOn) { audioFail.play(); }
        clickedAnswer.style.backgroundColor = "#FF5C00";//red
        correctAnswer.style.backgroundColor = "#B4D639";//green
    }
    numberOfQuestionsAnswered++;
    setAfterSelectionCardStyle();
}


/**
 * calculates and shows progress in progress bar
 */
function updateProgressBar() {
    let donePct = Math.round(numberOfQuestionsAnswered / numberOfQuestions * 10000) / 100;
    const progress = getId("progress-bar");
    progress.style.width = `${donePct}%`;
    progress.setAttribute("aria-valuenow", `${donePct}`);
    progress.innerHTML = `${donePct}%`;
}


/**
 * shows progress in text form
 * @param {integer} index 
 */
function updateCounter(index) {
    const counter = getId("counter");
    counter.innerHTML = `Frage <b>${index + 1}</b> von <b>${numberOfQuestions}</b>`;
}


/**
 * true if all questions were answered correctly
 * @returns {boolean}
 */
function allAnswersCorrect() {
    return numberOfCorrectAnswers == numberOfQuestions;
}


/**
 * shows result screen with number of correct answers and sound
 * if all answers correct -> confetti
 */
function showResult() {
    if (soundOn) { audioFinal.play(); }
    //show result screen
    getId('game').classList.add('d-none');
    getId('result').classList.remove('d-none');

    getId('result-text').innerHTML = `Du hast <b>${numberOfCorrectAnswers}</b> von <b>${numberOfQuestions}</b> Fragen richtig beantwortet.`;

    if (allAnswersCorrect()) {
        confetti.start();
        setTimeout(confetti.stop, 4000);
    }
}


/**
 * renders complete quiz card for question with index
 * @param {integer} index 
 */
function renderCard(index) {
    renderQuestion(index);
    renderAnswers(index);
    updateProgressBar();
    updateCounter(index);
    renderNextButton(index);
}


/**
 * resets variables for restarted game
 * shows first quiz card
 */
function startGame() {
    numberOfQuestionsAnswered = 0;
    numberOfCorrectAnswers = 0;
    // show game screen
    getId('startScreen').classList.add('d-none');
    getId('game').classList.remove('d-none');
    getId('result').classList.add('d-none');
    renderCard(0);
}