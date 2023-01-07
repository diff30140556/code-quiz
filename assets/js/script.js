const startBtnEl = document.querySelector('.start-quiz-btn');
const contentEl = document.querySelector('.content');
const welcomeEl = document.querySelector('.welcome');
// const quizSectionEl = document.querySelector('.quiz-section');

let quizDataBase = [
    {
        question: 'which fruits below is red color?',
        options: {
            one: 'banana',
            two: 'apple',
            three: 'orange',
            four: 'pear'
        }
    },
    {
        question: 'please repeat number 3',
        options: {
            one: 'one',
            two: 'two',
            three: 'three',
            four: 'four'
        },
    },
    {
        question: "what's the sound dogs bark",
        options: {
            one: 'meow',
            two: 'heehee',
            three: 'ahhh',
            four: 'woof'
        },
    }
]


startBtnEl.addEventListener('click', startQuiz);

function startQuiz() {
    console.log('start');
    // welcomeEl.style.display = 'none';

    let randomNum = Math.floor(Math.random() * quizDataBase.length);

    contentEl.innerHTML = `<div class="quiz-section">
        <div class="question">
            <h2>`+ quizDataBase[randomNum].question + `</h2>
        </div>
        <ol class="options">
            <li><button class="quiz-options-btn btn">`+ quizDataBase[randomNum].options.one + `</button></li>
            <li><button class="quiz-options-btn btn">`+ quizDataBase[randomNum].options.two + `</button></li>
            <li><button class="quiz-options-btn btn">`+ quizDataBase[randomNum].options.three + `</button></li>
            <li><button class="quiz-options-btn btn">`+ quizDataBase[randomNum].options.four + `</button></li>
        </ol>
    </div>`
}