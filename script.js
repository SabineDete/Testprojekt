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
    if (index < questions.length - 1) {
        button.setAttribute("onclick", `renderQuestion(${index + 1})`);
    }
    else {
        button.innerHTML = 'Ergebnis';
        button.setAttribute("onclick", 'showResult()');
    }
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
    renderNextButton(index);
}



function renderQuiz() {
    renderQuestion(0);
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
}
function updateProgressBar(){}
function showResult() { }