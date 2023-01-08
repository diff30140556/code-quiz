const contentEl = document.querySelector('.content');
const welcomeEl = document.querySelector('.welcome');

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


function startQuiz() {
    console.log('start');
    const randomNum = Math.floor(Math.random() * newQuizDataBase.length);
    contentEl.innerHTML = 
    `<div class="quiz-section">
    <div class="question">
            <h2>`+ newQuizDataBase[randomNum].question + `</h2>
            </div>
            <ol class="options">
            <li><button class="quiz-options-btn btn btn-hover">`+ newQuizDataBase[randomNum].options.one + `</button></li>
            <li><button class="quiz-options-btn btn btn-hover">`+ newQuizDataBase[randomNum].options.two + `</button></li>
            <li><button class="quiz-options-btn btn btn-hover">`+ newQuizDataBase[randomNum].options.three + `</button></li>
            <li><button class="quiz-options-btn btn btn-hover">`+ newQuizDataBase[randomNum].options.four + `</button></li>
            </ol>
            </div>`;

    console.log(newQuizDataBase[randomNum].answer);

    answer = newQuizDataBase[randomNum].answer;
    newQuizDataBase.splice(randomNum, 1);
    console.log(newQuizDataBase);
}

function ans(e){
    console.log(e)
    console.log(e.target.className);

    if (e.target.className.includes('quiz-options-btn')){
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
        } else {
            console.log('wrong');
            e.target.classList.add('incorrect');
    }

    console.log(newQuizDataBase.length)
    if(newQuizDataBase.length == 0){
        console.log('no more')
        setTimeout(init, 1000);
    }else{
        setTimeout(startQuiz, 1000);
    }
}
}

function init(){
    newQuizDataBase = [...quizDataBase];
    contentEl.innerHTML = 
    `<div class="welcome">
    <h1 class="title"> Code Quiz</h1>
    <p class="introduce">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore cumque eligendi recusandae praesentium natus, id quos tenetur, itaque error quidem architecto, quo        deleniti! Eum dignissimos recusandae, vel in eligendi ab beatae, maiores dolores ut ratione quasi excepturi, quia assumenda nihil.</p>
    <button class="start-quiz-btn btn btn-hover" value="Start Quiz">Start Quiz</button>
    </div>`

    const startBtnEl = document.querySelector('.start-quiz-btn');
    startBtnEl.addEventListener('click', startQuiz);
}


contentEl.addEventListener('click', ans)

init();