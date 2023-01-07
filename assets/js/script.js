const startBtnEl = document.querySelector('.start-quiz-btn');
const contentEl = document.querySelector('.content');
const welcomeEl = document.querySelector('.welcome');
// const quizSectionEl = document.querySelector('.quiz-section');


startBtnEl.addEventListener('click',startQuiz);

function startQuiz() {
    console.log('start');
    // welcomeEl.style.display = 'none';
    contentEl.innerHTML = `<div class="quiz-section">
    <div class="question">
        <h2>asdasdsdvfvdfbdfbdflkjfgsdkljvldklkfsdlkfjdflksjlksbdfdfgvdfsvgsdvfds</h2>
    </div>
    <ol class="options">
        <li><button class="quiz-options-btn btn">aslkdaslkdsdvgsd</button></li>
        <li><button class="quiz-options-btn btn">aslkddvgsd</button></li>
        <li><button class="quiz-options-btn btn">aslkd asdasd asd ada dasd asdasdas</button></li>
        <li><button class="quiz-options-btn btn">vgsd</button></li>
    </ol>
</div>`
}