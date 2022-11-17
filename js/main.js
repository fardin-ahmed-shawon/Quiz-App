const quizApp = document.querySelector(".my-quiz-app");
const rulesBox = document.querySelector(".rules-box");
const questionBox = document.querySelector(".question-box");
const resultBox = document.querySelector(".result-page");

const option_Area = document.querySelector(".my-options");
const timecount = document.querySelector(".time-count .seconds");
const timeline = document.querySelector(".question-header .time-line");
const nxt_btn = document.querySelector(".next-btn");
const scoreText = document.querySelector(".score-text");


function quizBtn() {
    quizApp.style.display = "none";
    rulesBox.style.display = "block";
}

function exitBtn() {
    rulesBox.style.display = "none";
    quizApp.style.display = "block";
}

function continueBtn() {
    rulesBox.style.display = "none";
    questionBox.style.display = "block"; 
    showQuestion(0);
    startTimer(15);
    startTimerLine(0);
}

let queCount = 0;
let counter;
let timeValue = 15;

let counterLine;
let widthValue = 0;

let userScore = 0;

function nextBtn() {
    if (queCount < questions.length - 1) {
        queCount++;
        showQuestion(queCount);
        clearInterval(counter);
        startTimer(timeValue);

        clearInterval(counterLine);
        startTimerLine(widthValue);

        nxt_btn.style.display = "none"; 
    } else {
        queCount = -1;
        showResultBox()
        console.log("You Have Complete Your Task..");
    }
}

function showQuestion(index) {

    // Add Questions
    const que_Area = document.querySelector(".question");
    que_Area.innerHTML = questions[index].question;

    // Add Options
    let optionList = '<div class="option"><span>' + questions[index].options[0] + '</span></div>'  
    + '<div class="option"><span>' + questions[index].options[1] + '</span></div>' 
    + '<div class="option"><span>' + questions[index].options[2] + '</span></div>' 
    + '<div class="option"><span>' + questions[index].options[3] + '</span></div>';
    option_Area.innerHTML = optionList;

    // Count Question Number
    const total_Que = document.querySelector(".total-que");
    let queNum = '<p>' + questions[index].num  + " of 5 Questions</p>";
    total_Que.innerHTML = queNum;

    // Option Select
    const QueOption = option_Area.querySelectorAll(".option");
    for (let i = 0; i <QueOption.length; i++) {
        QueOption[i].setAttribute("onclick", "optionSelected(this)");
    }
} 

let tickIcon = '<div class="tick icon"><i class="fas fa-check"></i></div>';
let crossIcon = '<div class="cross icon"><i class="fas fa-times"></i></div>';


function optionSelected(answer) {
    clearInterval(counter);
    clearInterval(counterLine);

    let userAns = answer.textContent;
    let correntAns = questions[queCount].answer;
    let all_Options = option_Area.children.length;


    if (userAns == correntAns) {
        userScore += 1;
        console.log(userScore);
        answer.classList.add("correct")
        console.log("Answer is correct");
        answer.insertAdjacentHTML("beforeend", tickIcon);
    } else {
        answer.classList.add("wrong")
        console.log("Answer is wrong");
        answer.insertAdjacentHTML("beforeend", crossIcon);

        for (let i = 0; i < all_Options; i++) {
            if (option_Area.children[i].textContent == correntAns) {
                option_Area.children[i].setAttribute("class", "option correct");
                option_Area.children[i].insertAdjacentHTML("beforeend", tickIcon);
            }
        }

    }

    for(let i=0; i<all_Options; i++){
        option_Area.children[i].classList.add("disabled");
    }

    nxt_btn.style.display = "block"; 
}

function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timecount.textContent = time;
        time--;
        if (time<0) {
             clearInterval(counter);

             nxt_btn.style.display = "block";

             let correctAns = questions[queCount].answer; 
             let alloptions = option_Area.children.length;  

             for(let i =0; i<alloptions; i++){
                if(option_Area.children[i].textContent == correctAns ){
                 option_Area.children[i].setAttribute("class", "option correct"); 
                 option_Area.children[i].insertAdjacentHTML("beforeend", tickIcon); 
                }
            }
            
            for(let i=0; i<alloptions; i++){
                option_Area.children[i].classList.add("disabled"); 
                }
        }
    } 
}

function startTimerLine(time) {
    counterLine = setInterval(timer, 42);
    function timer() {
        time += 1;
        timeline.style.width = time + "px";
        if (time > 379) {
            clearInterval(counterLine);
        }
    }
}

function showResultBox() {
    questionBox.style.display = "none";
    resultBox.style.display = "block";

    if (userScore < 2) {
        let score_Area = 'Very Bad😟... You Got <p>' + userScore + '</p> Out Of <p>' + questions.length + '</p>';
        scoreText.innerHTML = score_Area;
    } else if ( userScore < 4 ) {
        let score_Area = 'Carry On👍... You Got <p>' + userScore + '</p> Out Of <p>' + questions.length + '</p>';
        scoreText.innerHTML = score_Area;
    } else {
        let score_Area = 'Congratulations🥰... You Got <p>' + userScore + '</p> Out Of <p>' + questions.length + '</p>';
        scoreText.innerHTML = score_Area;
    }
}

function restartQuiz() {
    resultBox.style.display = "none";
    questionBox.style.display = "block";
    showQuestion(0);
    startTimer(15);
    startTimerLine(0);
    nextBtn();
    userScore = 0;
}

function quitQuiz() {
    window.location.reload();
}

  