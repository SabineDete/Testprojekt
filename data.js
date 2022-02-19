let questions = [];
let numberOfQuestions;
let numberOfAnswers = 4; //for each question
let numberOfQuestionsAnswered = 0;
let numberOfCorrectAnswers = 0;
let audioSuccess = new Audio('sounds/small-success.mp3');
let audioFail = new Audio('sounds/fail.mp3');
let audioFinal = new Audio('sounds/final-success.mp3');
let soundOn = true;

function loadQuestions() {
    
    function questionMaker(question,answers,correctIndex) {
        return { question, answers, correctIndex}
    }

    questions.push(questionMaker(
        'Wie nennen Fachleute den Schwanz eines Hundes?', ['Rute', 'Peitsche', 'Gerte', 'Bürzel'], 0));
    questions.push(questionMaker(
        'Wie viele Riechzellen hat ein Hund durchschnittlich? (Ein Mensch hat etwa 5 Mio.) ', ['50 Mio.', '80 Mio.', '220 Mio.', '500 Mio.'], 2));
    questions.push(questionMaker(
        'Wie sehen Hunde Farben?', ['genauso wie Menschen', 'in Grau-Abstufungen', 'ähnlich wie jemand, der rot-grün-blind ist', 'wie Menschen, aber zusätzlich infrarot'], 2));
    questions.push(questionMaker(
        'Wie viele Zähne hat ein erwachsener Hund normalerweise?', ['26', '32', '36', '42'], 3));
    questions.push(questionMaker(
        'Wie viele vom FCI anerkannte Hunderassen gibt es?', ['etwa 200', 'etwa 370', 'etwa 600', 'fast 1000'], 1));
    
    numberOfQuestions = questions.length;
}