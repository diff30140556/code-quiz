// store DOM elements in a variable to reference/change in the functions
const contentEl = document.querySelector('.content');
const wrapEl = document.querySelector('.wrap');
const welcomeEl = document.querySelector('.welcome');
const timerEl = document.querySelector('.timer');
const viewScoresEl = document.querySelector('#view-records-btn')
const modalEl = document.querySelector('.modal');
let targetId = '';
// declare variable to save the data needed
let recordsData = JSON.parse(localStorage.getItem('highRecords')) || [];
console.log(recordsData)
// store all of the questions, options and answer in an array
const quizDataBase = [
    {
        question: 'which fruits below is red color? which fruits below is red color?which fruits below is red color?which fruits below is red color?which fruits below is red color?which fruits below is red color?which fruits below is red color?which fruits below is red color?which fruits below is red color?which fruits below is red color?which fruits below is red color?which fruits below is red color?which fruits below is red color?which fruits below is red color?which fruits below is red color?which fruits below is red color?which fruits below is red color?which fruits below is red color?which fruits below is red color?which fruits below is red color?which fruits below is red color?which fruits below is red color?which fruits below is red color?which fruits below is red color?which fruits below is red color?which fruits below is red color?which fruits below is red color?which fruits below is red color?which fruits below is red color?which fruits below is red color?which fruits below is red color?which fruits below is red color?which fruits below is red color?which fruits below is red color?which fruits below is red color?which fruits below is red color?which fruits below is red color?',
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
};
let isPlaying = false;
let setTimer;
let remainingTime;

// startQuiz function
function startQuiz() {
    // hen quiz start, set up a countdown timer
    // only set up once when the first quiz pops up, prevent setting up multiple timer
    console.log(isPlaying)
    if(!isPlaying){
        isPlaying = true;
        console.log(isPlaying)

        setTimer = setInterval(() => {
            if(remainingTime > 0){
                remainingTime--;
            }
            timerEl.textContent = remainingTime;
            // if timer reaches 0, end quiz
            if (remainingTime == 0){
                quizEnd();
            }
        }, 1000);
    }

    // view records button can't get clicked during the game, add a custom styling as well
    viewScoresEl.disabled = true;
    viewScoresEl.classList.add('disabled');
    viewScoresEl.classList.remove('btn-hover');
    
    // pick a random number to render a question from the quizDataBase
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
            
    //store the answer for the validation then remove the question from the dataBase 
    answer = newQuizDataBase[randomNum].answer;
    newQuizDataBase.splice(randomNum, 1);
}

// answering function
function answering(e) {
    // after answered, select and disabled all of the button
    const optionsBtn = document.querySelectorAll('.quiz-options-btn')
    for (let element of optionsBtn){
        element.disabled = true;
        element.classList.remove('btn-hover')
    }    
    
    // if the button content equal the answer, answer is correct, otherwise is wrong. Adding custom styling to make it different
    if(e.target.textContent === answer){
        e.target.classList.add('correct');
        scoreResult.correct++;
    } else {
        e.target.classList.add('incorrect');
        scoreResult.inCorrect++;
        // subtract the remaining time if it's wrong, if it less than zero, set it as zero then end the quiz
        remainingTime -= 30;
        // if( remainingTime <= 0 ){
        //     remainingTime = 0;
        // }
    }
    
    // if there is no quiz in the dataBase or the time
    if(newQuizDataBase.length == 0 || !isPlaying){
        console.log('no more')
        setTimeout(function() {
            scoreResult.timeLeft = remainingTime;
            quizEnd();
        }, 1000);
    }else if(remainingTime <= 0){
        remainingTime = 0;
        scoreResult.timeLeft = remainingTime;
    }else{
        console.log('ss')
        setTimeout(startQuiz, 1000);
    }
}

function quizEnd() {
    console.log('end')
    // if (remainingTime < 0) {
    //     timerEl.textContent = 0;
    // }
    isPlaying = false;
    clearInterval(setTimer);
    calculateResult();
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
    let highScoresStyling = '';
    let modalZoomEffect = '';
    let scoreModalStyling = '';

    if(recordsData.length !== 0){
            // recordsStr = '';
            highScoresStyling = 'scores-list-styling';
            scoreModalStyling = 'high-records';
            for ( i = 0 ; i < recordsData.length ; i++) {
                recordsStr += `<li>`+ (i+1) +`. `+ recordsData[i].initials +` - `+ recordsData[i].score +`</li>`
            }
    }

    console.log(targetId)
    console.log(targetId === 'view-records-btn')
    console.log(targetId === 'clear-records-btn')
    if (targetId === 'view-records-btn' || targetId === 'clearModal-records-btn'){
        console.log('ptin')
        if (targetId === 'view-records-btn'){
            modalZoomEffect = 'modal-zoom-in';
        }

        modalEl.innerHTML = 
        `<div class="modal-body `+ modalZoomEffect +`">
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
    
    
    function calculateResult() {
        let correct = scoreResult.correct;
        let inCorrect = scoreResult.inCorrect;
        let timeLeft = scoreResult.timeLeft;
        scoreResult.accuracy = ((correct / quizDataBase.length * 100)).toFixed(1);
        scoreResult.score = correct * 3 - inCorrect * 1 + timeLeft * 1.5;
        if(scoreResult.score < 0){
            scoreResult.score = 0;
        }
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
        console.log(modalEl.children[0]);        
        modalEl.children[0].classList.add('modal-zoom-out');
        setTimeout( () => modalEl.innerHTML = '' , 500);
    }

    // when a button got clicked, analyze which btn it is and run the corresponding function
    function detectBtn(e){
        e.preventDefault();
        if (e.target.nodeName !== 'BUTTON') {
            return;
        }

        targetId = e.target.id;
        switch (targetId) {
            // click the start button to start the quiz
            case ('start-quiz-btn'): 
            startQuiz();
            break;
            // click the options button to answer the question
            case ('quiz-options-btn'): 
            answering(e);
            break;
            // click the submit button to save your records with your initials
            case ('submit-initials-btn'): 
                validateInitials();
                break;
            // click the go back button to navigate to the main page
            case ('go-back-btn'): 
                init();
                break;
            // click the clear button to clear the data in local storage
            case ('clear-records-btn'):
                clearRecordsData();
                break;
            case ('clearModal-records-btn'):
                clearRecordsData();
            // click the button to view records with a modal window
                break;
            case ('view-records-btn'):
                renderHighScores(recordsData);
            // click the button to close the modal window
                break;
            case ('close-modal-btn'):
                closeModal();
        }
}

// initial function
function init(){
    // reset all of the data to use first
    remainingTime = 60;
    timerEl.textContent = remainingTime;
    scoreResult.correct = 0;
    scoreResult.inCorrect = 0;
    // view high scores button is able to click only when the client is on the first page
    viewScoresEl.disabled = false;
    viewScoresEl.classList.remove('disabled');
    viewScoresEl.classList.add('btn-hover');
    // deep copy from original quiz data to reset the questions without re-declare the whole content
    newQuizDataBase = [...quizDataBase];

    // render the main page to the browser
    contentEl.innerHTML = 
    `<div class="welcome">
    <h1 class="title"> Code Quiz</h1>
    <p class="introduce">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore cumque eligendi recusandae praesentium natus, id quos tenetur, itaque error quidem architecto, quo        deleniti! Eum dignissimos recusandae, vel in eligendi ab beatae, maiores dolores ut ratione quasi excepturi, quia assumenda nihil.</p>
    <button id="start-quiz-btn" class="start-quiz-btn btn btn-hover" value="Start Quiz">Start Quiz</button>
    </div>`
}

// add event listener on the .wrap element
wrapEl.addEventListener('click', detectBtn)

// run initial function when the page loaded
init();