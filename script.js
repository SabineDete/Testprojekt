function getId(id) {
    return document.getElementById(id);
}
////////////////////////////////////////////////////////

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

function renderNextButton(index) {
    let button = getId("next-button");
    if (index < numberOfQuestions - 1) {
        button.setAttribute("onclick", `renderCard(${index + 1})`);
    }
    else {
        button.innerHTML = 'Ergebnis';
        button.setAttribute("onclick", 'showResult()');
    }
    button.disabled = true;
}

function renderQuestion(index) {
    //show question
    getId("card-title").innerHTML = questions[index]['question'];
    //randomize order of answer possibilities
    let shuffledOrder = fisherYatesShuffle();
    //show answer possibilities
    for (let i = 0; i < numberOfAnswers; i++) {
        const answer = questions[index].answers[shuffledOrder[i]];
        const correctAnswerIndex = shuffledOrder.indexOf(questions[index].correctIndex);
        // show answer
        getId(`answer-${i}`).innerHTML = `${answer}`;
        //define onclick with actual answer index and correct answer index
        getId(`answer-card-${i}`).setAttribute("onclick", `checkAnswer(${i},${correctAnswerIndex})`);
    }
}

function updateProgressBar() {
    let donePct = Math.round(numberOfQuestionsAnswered / numberOfQuestions * 10000) / 100;
    console.log(donePct);
    const progress = getId("progress-bar");
    progress.style.width = `${donePct}%`;
    progress.setAttribute("aria-valuenow", `${donePct}`);
    progress.innerHTML = `${donePct}%`;
}

function updateCounter(index) {
    const counter = getId("counter");
    counter.innerHTML = `Frage <b>${index+1}</b> von <b>${numberOfQuestions}</b>`;
}

function renderFooter(index) {
    updateProgressBar();
    updateCounter(index);
    renderNextButton(index);
}

function renderCard(index) {
    renderQuestion(index);
    renderFooter(index);
}


function init() {
    renderCard(0);
}
/////////////////////////////////////////////////////////////

function checkAnswer(clickedIndex, correctIndex) {
    let clickedAnswer = getId(`answer-card-${clickedIndex}`);
    let correctAnswer = getId(`answer-card-${correctIndex}`);
    //wrong answer
    if (clickedIndex != correctIndex) {
        console.log('falsch');
        clickedAnswer.style.backgroundColor = "red!important";
        correctAnswer.style.backgroundColor = "var(--bs-teal-300)!important";
    } else {//correct answer
        console.log('richtig');
        clickedAnswer.style.backgroundColor = "var(--bs-teal-300)!important";
        numberOfCorrectAnswers++;
    }
    numberOfQuestionsAnswered++;
    updateProgressBar();
    getId("next-button").disabled=false;
}
function showResult() { }