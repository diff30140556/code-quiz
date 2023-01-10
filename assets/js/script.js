const contentEl = document.querySelector('.content');
const welcomeEl = document.querySelector('.welcome');
const timerEl = document.querySelector('.timer');
let initialsEl;
let initialsAlertEl;

const quizDataBase = [
    {
        question: 'which fruits below is red color?',
        options: {
            one: 'banana',
            two: 'apple',
            three: 'orange',
            four: 'pear'
        },
        answer: 'apple'
    },
    {
        question: 'please repeat number 3',
        options: {
            one: 'one',
            two: 'two',
            three: 'three',
            four: 'four'
        },
        answer: 'three'
    },
    {
        question: "what's the sound dogs bark",
        options: {
            one: 'meow',
            two: 'heehee',
            three: 'ahhh',
            four: 'woof'
        },
        answer: 'woof'
    }
]
let newQuizDataBase = [];
let answer = '';

let scoreResult = {
    correct: 0,
    inCorrect: 0,
    timeLeft: 0,
    accuracy: 0,
    score: 0
}


function startQuiz() {
    console.log('start');
    const randomNum = Math.floor(Math.random() * newQuizDataBase.length);
    contentEl.innerHTML = 
    `<div class="quiz-section">
    <div class="question">
            <h2>`+ newQuizDataBase[randomNum].question + `</h2>
            </div>
            <ol class="options">
            <li><button id="quiz-options-btn" class="quiz-options-btn btn btn-hover">`+ newQuizDataBase[randomNum].options.one + `</button></li>
            <li><button id="quiz-options-btn" class="quiz-options-btn btn btn-hover">`+ newQuizDataBase[randomNum].options.two + `</button></li>
            <li><button id="quiz-options-btn" class="quiz-options-btn btn btn-hover">`+ newQuizDataBase[randomNum].options.three + `</button></li>
            <li><button id="quiz-options-btn" class="quiz-options-btn btn btn-hover">`+ newQuizDataBase[randomNum].options.four + `</button></li>
            </ol>
            </div>`;

    console.log(newQuizDataBase[randomNum].answer);

    answer = newQuizDataBase[randomNum].answer;
    newQuizDataBase.splice(randomNum, 1);
    console.log(newQuizDataBase);
}

function renderResults() {
    contentEl.innerHTML = 
        `<div class="all-done">
            <h2>Quiz End!</h2>
            <ul>
                <li>Correct: <span>`+ scoreResult.correct +`</span></li>
                <li>Incorrect: <span>`+ scoreResult.inCorrect +`</span></li>
                <li>Time left: <span>`+ scoreResult.timeLeft +`</span></li>
                <li>Accuracy: <span>`+ scoreResult.accuracy +` %</span></li>
                <li>Your final score is: <span>`+ scoreResult.score +`</span></li>
            </ul>
            <form class="submit-initials-form" action="index.html">
                <label for="initials">Please enter your initials:</label>
                <input class="initials" id="initials" type="text">
                <span class="initials-input-alert"></span>
                <button id="submit-initials-btn" class="submit-initials-btn btn btn-hover">Submit</button>
            </form>
        </div>`
        initialsEl = document.querySelector('.initials');
        initialsAlertEl = document.querySelector('.initials-input-alert');
}

function highScores() {
    contentEl.innerHTML = 
    `<div class="high-scores">
        <h2>High Scores:</h2>
        <ul class="scores-list">
            <li>ben - 11</li>
            <li>ben - 11</li>
            <li>ben - 11</li>
            <li>ben - 11</li>
        </ul>
        <div class="high-scores-btn">
            <button id="go-back-btn" class="go-back-btn btn btn-hover">Go Back</button>
            <button class="clear-records-btn btn btn-hover">Clear Records</button>
        </div>
    </div>`
}

function answering(e) {
    const optionsBtn = document.querySelectorAll('.quiz-options-btn')
    for (let element of optionsBtn){
        element.disabled = true;
        element.classList.remove('btn-hover')
    }
    console.log('btn')
    console.log(e.target.textContent)
    
    
    if(e.target.textContent === answer){
        console.log('correct')
        e.target.classList.add('correct');
        scoreResult.correct++;
    } else {
        console.log('wrong');
        e.target.classList.add('incorrect');
        scoreResult.inCorrect++;
    }
    
    console.log(newQuizDataBase.length)
    if(newQuizDataBase.length == 0){
    console.log('no more')
    setTimeout(function() {
        scoreResult.timeLeft = timerEl.textContent;
        calculateResult();
    }, 1000);
}else{
    setTimeout(startQuiz, 1000);
}
}

function calculateResult() {
    let correct = scoreResult.correct;
    let inCorrect = scoreResult.inCorrect;
    let timeLeft = scoreResult.timeLeft;
    scoreResult.accuracy = ((correct / quizDataBase.length * 100)).toFixed(1);
    scoreResult.score = correct * 3 - inCorrect * 1 + timeLeft * 1.5;
    renderResults();
}

function detectBtn(e){
    e.preventDefault();
    console.log(e)
    console.log(e.target.id);
    const targetId = e.target.id;

    switch (targetId) {
        case ('start-quiz-btn'): startQuiz();
        break;
        case ('quiz-options-btn'): answering(e);
        break;
        case ('submit-initials-btn'): if(initialsEl.value ===''){
            initialsAlertEl.textContent = "Please enter your initials!"
        }else{
            highScores()
        } ;
        break;
        case ('go-back-btn'): init();
    }
    
    // if (targetClass.includes('quiz-options-btn')){
    //     answering(e);
    // }
    // if (targetClass.includes('submit-initials-btn') && initialsEl.textContent !== ''){
    //     highScores();
    // }

    // if (targetClass.includes('go-back-btn')){
    //     init();
    // }

    // if (targetClass.includes('start-quiz-btn')){
    //     startQuiz();
    // }
}

function init(){
    newQuizDataBase = [...quizDataBase];
    contentEl.innerHTML = 
    `<div class="welcome">
    <h1 class="title"> Code Quiz</h1>
    <p class="introduce">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore cumque eligendi recusandae praesentium natus, id quos tenetur, itaque error quidem architecto, quo        deleniti! Eum dignissimos recusandae, vel in eligendi ab beatae, maiores dolores ut ratione quasi excepturi, quia assumenda nihil.</p>
    <button id="start-quiz-btn" class="start-quiz-btn btn btn-hover" value="Start Quiz">Start Quiz</button>
    </div>`
}

contentEl.addEventListener('click', detectBtn)

init();