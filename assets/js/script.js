const contentEl = document.querySelector('.content');
const wrapEl = document.querySelector('.wrap');
const welcomeEl = document.querySelector('.welcome');
const timerEl = document.querySelector('.timer');
const viewScoresEl = document.querySelector('#view-records-btn')
const modalEl = document.querySelector('.modal');
let targetId = '';
// let initialsEl;
// let initialsAlertEl;
let recordsData = JSON.parse(localStorage.getItem('highRecords')) || [];
console.log(recordsData)

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
let scoreResult = {};


function startQuiz() {
    viewScoresEl.disabled = true;
    viewScoresEl.classList.add('disabled');
    viewScoresEl.classList.remove('btn-hover');
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
}

function renderHighScores(recordsData) {
    console.log(recordsData);
    let recordsStr = '';
    let highScoresStyling = 'scores-list-styling';
    let scoreModalStyling = 'high-records';

    if(recordsData.length === 0){
            recordsStr = '';
            highScoresStyling = '';
            scoreModalStyling = ''
    }else {
        for ( i = 0 ; i < recordsData.length ; i++) {
            recordsStr += `<li>`+ (i+1) +`. `+ recordsData[i].initials +` - `+ recordsData[i].score +`</li>`
        }
    }
    console.log(targetId)
    console.log(targetId === 'view-records-btn')
    console.log(targetId === 'clear-records-btn')
    if (targetId === 'view-records-btn' || targetId === 'clearModal-records-btn'){
        console.log('ptin')
        modalEl.innerHTML = 
        `<div class="modal-body">
            <header>
                <h2>High Scores:</h2>
            </header>
            <div class="body">
                <ul class="`+ scoreModalStyling +` scores-list">`+ recordsStr +`</ul>
            </div>
            <footer>
                <button id="clearModal-records-btn" class="clearModal-records-btn btn btn-hover">Clear Records</button>
                <button id="close-modal-btn" class="close-modal-btn btn btn-hover">Close</button>
            </footer>
        </div>
        <div class="overlay"></div>`
    }else {
        contentEl.innerHTML = 
            `<div class="high-scores">
            <h2>High Scores:</h2>
            <ul class="scores-list `+ highScoresStyling +`">`+ recordsStr +`</ul>
            <div class="high-scores-btn">
            <button id="go-back-btn" class="go-back-btn btn btn-hover">Go Back</button>
            <button id="clear-records-btn" class="clear-records-btn btn btn-hover">Clear Records</button>
            </div>
            </div>`
    }

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
    
    function validateInitials() {
        const initialsEl = document.querySelector('.initials');
        const initialsAlertEl = document.querySelector('.initials-input-alert');
        let highScoresObj = {};
        if(initialsEl.value ==='') {
            initialsAlertEl.textContent = "Please enter your initials!"
        } else {
            highScoresObj.initials = initialsEl.value;
            highScoresObj.score = scoreResult.score;
            console.log(highScoresObj)
            recordsData.push(highScoresObj);
            saveRecordsToLocal();
        } ;
    }
    
    function saveRecordsToLocal() {
        recordsData.sort( (a, b) => b.score - a.score );
        localStorage.setItem('highRecords', JSON.stringify(recordsData));
        renderHighScores(recordsData);
    }
    
    function clearRecordsData() {
        recordsData = [];
        saveRecordsToLocal();
    }
    
    function closeModal() {
        console.log('clos')
        modalEl.innerHTML = '';
    }

    function detectBtn(e){
        e.preventDefault();
        if (e.target.nodeName !== 'BUTTON') {
            return;
        }
        console.log(e)
        console.log(e.target.nodeName);
        targetId = e.target.id;
        console.log(targetId);

        switch (targetId) {
            case ('start-quiz-btn'): 
                startQuiz();
                break;

            case ('quiz-options-btn'): 
                answering(e);
                break;

            case ('submit-initials-btn'): 
                validateInitials();
                break;

            case ('go-back-btn'): 
                init();
                break;
        
            case ('clear-records-btn'):
                clearRecordsData();
                break;

            case ('clearModal-records-btn'):
                clearRecordsData();
                break;
        
            case ('view-records-btn'):
                renderHighScores(recordsData);
                break;

            case ('close-modal-btn'):
                closeModal();
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
    scoreResult = {
        correct: 0,
        inCorrect: 0,
        timeLeft: 0,
        accuracy: 0,
        score: 0
    }
    viewScoresEl.disabled = false;
    viewScoresEl.classList.remove('disabled');
    viewScoresEl.classList.add('btn-hover');
    contentEl.innerHTML = 
    `<div class="welcome">
    <h1 class="title"> Code Quiz</h1>
    <p class="introduce">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore cumque eligendi recusandae praesentium natus, id quos tenetur, itaque error quidem architecto, quo        deleniti! Eum dignissimos recusandae, vel in eligendi ab beatae, maiores dolores ut ratione quasi excepturi, quia assumenda nihil.</p>
    <button id="start-quiz-btn" class="start-quiz-btn btn btn-hover" value="Start Quiz">Start Quiz</button>
    </div>`
}

wrapEl.addEventListener('click', detectBtn)

init();