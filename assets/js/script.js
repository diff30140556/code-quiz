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
// store all of the questions, options and answer in an array
const quizDataBase = [
    {
        question: `<img src="https://i.ibb.co/g4LtPKt/question1.png" alt="code-question">
        What's the result of console log?`,
        options: {
            one: 'Hello Mary',
            two: 'Hello Tom',
            three: 'Hello Casper',
            four: 'None of above'
        },
        answer: 'Hello Casper'
    },
    {
        question: `<img src="https://i.ibb.co/2F0HCXx/question2.png" alt="code-question">
        What's the result of console log?`,
        options: {
            one: 'Hello Tomy',
            two: 'Hello Casper',
            three: 'Hello Mary',
            four: 'Hello undefined'
        },
        answer: 'Hello Casper'
    },
    {
        question: `<img src="https://i.ibb.co/XZ9pyqX/question3.png" alt="code-question">
        What's the result of each console log?`,
        options: {
            one: '121, 81',
            two: '110, 90',
            three: '120, 80',
            four: '144, 64'
        },
        answer: '121, 81'
    },
    {
        question: `<img src="https://i.ibb.co/xHHLTbX/question4.png" alt="code-question">
        What's the result of each console log?`,
        options: {
            one: 'true, true',
            two: 'false, false',
            three: 'false, true',
            four: 'true, false'
        },
        answer: 'true, false'
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
    // store the status if the user is playing
    if(!isPlaying){
        isPlaying = true;
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

// set up a countdown timer
function startTimer() {
    setTimer = setInterval(() => {
        if(remainingTime > 0) {
            remainingTime--;
        }
        timerEl.textContent = remainingTime;
        // if timer reaches 0, clear timer and end quiz
        if (remainingTime <= 10) {
            timerEl.classList.add('timer-10');
        }
        if (remainingTime == 0) {
            scoreResult.timeLeft = remainingTime;
            clearTimer();
            quizEnd();
        }
    }, 1000);
}

// clear the timer
function clearTimer() {
    clearInterval(setTimer);
}

// answering function
function answering(e) {
    // after answered, select and disabled all of the option buttons
    const optionsBtn = document.querySelectorAll('.quiz-options-btn')
    for (let element of optionsBtn) {
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
        // subtract the remaining time if answered wrong, remaining time can't less than zero
        remainingTime -= 20;
        if(remainingTime < 0){
            remainingTime = 0;
            timerEl.classList.add('timer-10');
            timerEl.textContent = remainingTime;
        }
    }
    
    // if there is no quiz in the dataBase or the remaining time reaches zero, clear timer and end quiz. Else, keep rendering new question
    if(newQuizDataBase.length == 0 || remainingTime === 0) {
        clearTimer();
        scoreResult.timeLeft = remainingTime;
        setTimeout(quizEnd, 1000);
    }else {
        setTimeout(startQuiz, 1000);
    }
}

// quizEnd function
function quizEnd() {
    isPlaying = false;
    calculateResult();
}

// calculateResult function
function calculateResult() {
    let correct = scoreResult.correct;
    let inCorrect = scoreResult.inCorrect;
    let timeLeft = scoreResult.timeLeft;

    // calculate the accuracy and final score then save into 'scoreResult' object
    scoreResult.accuracy = ((correct / quizDataBase.length * 100)).toFixed(1);
    scoreResult.score = correct * 3 - inCorrect * 1 + timeLeft * 1.5;
    // score can't less than zero
    if(scoreResult.score < 0){
        scoreResult.score = 0;
    }

    renderResults();
}

// renderResults function
function renderResults() {
    // render results to the page
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

// validation function
function validateInitials() {
    // store the dynamic element in a variable
    const initialsEl = document.querySelector('.initials');
    const initialsAlertEl = document.querySelector('.initials-input-alert');
    let highScoresObj = {};
    
    // if input is blank, pop on the message
    if(initialsEl.value ==='') {
        initialsAlertEl.textContent = "Please enter your initials!"
    } else {
        // else, push the data to 'recordsData' for storing in local storage
        highScoresObj.initials = initialsEl.value;
        highScoresObj.score = scoreResult.score;
        recordsData.push(highScoresObj);
        saveRecordsToLocal();
    } ;
}

// saving records to local function
function saveRecordsToLocal() {
    // sort the record by score from high to low before saving
    recordsData.sort( (a, b) => b.score - a.score );
    localStorage.setItem('highRecords', JSON.stringify(recordsData));
    renderHighScores();
}

// render high scores function
function renderHighScores() {
    let recordsStr = '';
    let highScoresStyling = '';
    let modalZoomEffect = '';
    let scoreModalStyling = '';

    // adding the styling and saving the records data with loop if the record is not empty
    if(recordsData.length !== 0){
        highScoresStyling = 'scores-list-styling';
        scoreModalStyling = 'high-records';
        for ( i = 0 ; i < recordsData.length ; i++) {
                recordsStr += `<li>`+ (i+1) +`. `+ recordsData[i].initials +` - `+ recordsData[i].score +`</li>`
            }
    }

    // pop up a modal rendered with high scores if user clicked view records button on the top of main page
    if (targetId === 'view-records-btn' || targetId === 'clearModal-records-btn'){
        //adding an effect when first open the modal 
        if (targetId === 'view-records-btn'){
            modalZoomEffect = 'modal-zoom-in';
        }
        // rendering
        modalEl.innerHTML = 
        `<div class="modal-body `+ modalZoomEffect +`">
            <header>
                <h2>High Scores:</h2>
            </header>
            <div class="body">
                <ul class="`+ scoreModalStyling +` scores-list">`+ recordsStr +`</ul>
            </div>
            <footer>
                <button id="clearModal-records-btn" class="clearModal-records-btn clear-records-btn btn btn-hover">Clear Records</button>
                <button id="close-modal-btn" class="close-modal-btn btn btn-hover">Close</button>
            </footer>
        </div>
        <div class="overlay"></div>`
    }else {
        // else, rendering on the high scores page
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

// clear records function, save and re-render
function clearRecordsData() {
    recordsData = [];
    saveRecordsToLocal();
}

// closeModal function
function closeModal() {
    // adding the closing effect
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
        startTimer();
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
            renderHighScores();
        // click the button to close the modal window
            break;
        case ('close-modal-btn'):
            closeModal();
    }
}

// initial function
function init(){
    // reset all of the data first
    remainingTime = 60;
    timerEl.classList.remove('timer-10');
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
    <p class="introduce">
    Rules:<br>
    1. 60s timer will start after clicking the "start quiz".<br>
    2. Choose 1 correct answer from the options.<br>
    3. Quiz will end either when time's up, or all the questions are completed.<br>
    <br>
    Total scores:<br>
    Remaining seconds * 1.5 as your basic score, then each correct answer +3 pt, each wrong answer -1 pt.</p>
    <button id="start-quiz-btn" class="start-quiz-btn btn btn-hover" value="Start Quiz">Start Quiz</button>
    </div>`
}

// add event listener on the .wrap element
wrapEl.addEventListener('click', detectBtn)

// run initial function when the page loaded
init();