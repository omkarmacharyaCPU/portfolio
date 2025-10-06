// =========================
// Quiz Data
// =========================
const quizData = {
    easy: [
        {question:"Which language is often used in competitive programming?", options:["Python","C++","JavaScript","Ruby"], answer:"C++"},
        {question:"What does 'HTML' stand for?", options:["Hyper Text Markup Language","High Tech Markup Language","Hyperlink Text Model Language","Hyper Tool Multi Language"], answer:"Hyper Text Markup Language"},
        {question:"Which operator adds two numbers in most languages?", options:["+","-","*","/"], answer:"+"},
        {question:"Python is:", options:["Compiled","Interpreted","Markup","Assembly"], answer:"Interpreted"},
        {question:"Which loop is used to iterate fixed number of times?", options:["for","while","do-while","if"], answer:"for"},
        {question:"Which symbol starts a comment in C++?", options:["//","#","/*","<!--"], answer:"//"},
        {question:"Which language uses indentation instead of braces?", options:["C++","Python","Java","JavaScript"], answer:"Python"},
        {question:"What does CSS stand for?", options:["Cascading Style Sheets","Computer Style System","Creative Style Syntax","Coded Style Sheet"], answer:"Cascading Style Sheets"},
        {question:"Which keyword declares a constant in JavaScript?", options:["const","let","var","static"], answer:"const"},
        {question:"Which HTML tag is used for links?", options:["<a>","<link>","<p>","<href>"], answer:"<a>"},
    ],
    medium: [
        {question:"What is a pointer in C++?", options:["Variable that stores address","Variable that stores string","Function","Operator"], answer:"Variable that stores address"},
        {question:"Which Python data type is immutable?", options:["list","tuple","dict","set"], answer:"tuple"},
        {question:"Which of these is a frontend JS framework?", options:["Django","React","Flask","Laravel"], answer:"React"},
        {question:"Big O of binary search?", options:["O(n)","O(log n)","O(n^2)","O(1)"], answer:"O(log n"},
        {question:"Which symbol is used for exponentiation in Python?", options:["^","**","exp","pow"], answer:"**"},
        {question:"Which C++ keyword defines inheritance?", options:["inherits","extends","public/private/protected","super"], answer:"public/private/protected"},
        {question:"What does SQL stand for?", options:["Structured Query Language","Simple Query Language","Sequential Query Language","Styled Query Language"], answer:"Structured Query Language"},
        {question:"Which loop guarantees at least one execution?", options:["for","while","do-while","foreach"], answer:"do-while"},
        {question:"Which JS method selects element by ID?", options:["getElementById","querySelectorAll","getElementsByClassName","selectById"], answer:"getElementById"},
        {question:"Which is used to handle exceptions in Python?", options:["try/except","catch/throw","handle/error","try/catch"], answer:"try/except"},
    ],
    hard: [
        {question:"Time complexity of merge sort?", options:["O(n log n)","O(n^2)","O(log n)","O(n)"], answer:"O(n log n)"},
        {question:"Which sorting algorithm is stable?", options:["Quick sort","Merge sort","Heap sort","Selection sort"], answer:"Merge sort"},
        {question:"Which data structure uses LIFO?", options:["Queue","Stack","Linked List","Tree"], answer:"Stack"},
        {question:"Which Python feature allows decorators?", options:["Functions are first-class objects","Loops","Classes","Lists"], answer:"Functions are first-class objects"},
        {question:"C++ feature for compile-time polymorphism?", options:["Virtual functions","Templates","Inheritance","Encapsulation"], answer:"Templates"},
        {question:"Time complexity of accessing hash table?", options:["O(n)","O(log n)","O(1)","O(n log n)"], answer:"O(1)"},
        {question:"Which is NOT a graph traversal?", options:["DFS","BFS","FIFO","Preorder"], answer:"FIFO"},
        {question:"Which JS method adds element at end of array?", options:["push","pop","shift","unshift"], answer:"push"},
        {question:"Which Python keyword is used for generators?", options:["yield","return","generate","def"], answer:"yield"},
        {question:"Which C++ STL container stores key-value pairs?", options:["vector","map","list","queue"], answer:"map"},
    ]
};

// =========================
// Quiz Logic
// =========================
let levelOrder = ["easy","medium","hard"];
let currentLevelIndex = 0;
let questionIndex = 0;
let score = 0;

const quizContainer = document.getElementById('quiz-container');
const liveScore = document.getElementById('live-score');
const levelProgress = document.getElementById('level-progress');

function updateLevelProgress() {
    const progress = ((currentLevelIndex + questionIndex/10) / levelOrder.length) * 100;
    levelProgress.style.width = progress + '%';
}

function loadQuestion() {
    if(currentLevelIndex >= levelOrder.length){
        quizContainer.innerHTML = `<h2>Quiz Completed!</h2><p>Your total score: ${score}/${levelOrder.length*10}</p>`;
        updateLevelProgress();
        return;
    }

    const level = levelOrder[currentLevelIndex];
    const q = quizData[level][questionIndex];

    quizContainer.style.opacity = 0;
    setTimeout(() => {
        quizContainer.innerHTML = `<h3>Difficulty: ${level.toUpperCase()}</h3><p>${q.question}</p>`;
        q.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.textContent = opt;
            btn.classList.add('option-btn');
            btn.addEventListener('click', () => checkAnswer(opt, q.answer));
            quizContainer.appendChild(btn);
        });
        quizContainer.style.opacity = 1;
        updateLevelProgress();
    }, 300);
}

function checkAnswer(selected, correct){
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach(b => b.disabled = true);

    if(selected === correct){
        score++;
        launchConfetti();
        buttons.forEach(b => { if(b.textContent === correct) b.classList.add('correct'); });
        sparkleEffect(5, "#fff");
    } else {
        buttons.forEach(b => { if(b.textContent === correct) b.classList.add('correct'); });
        buttons.forEach(b => { if(b.textContent === selected && selected !== correct) b.classList.add('wrong'); });
        sparkleEffect(3, "#ff0000");
    }

    liveScore.textContent = `Score: ${score}`;
    updateLevelProgress();

    questionIndex++;
    if(questionIndex >= 10){
        questionIndex = 0;
        currentLevelIndex++;
        if(currentLevelIndex < levelOrder.length){
            quizContainer.innerHTML = `<h2>Get ready for ${levelOrder[currentLevelIndex].toUpperCase()} level!</h2>`;
            setTimeout(loadQuestion, 1500);
        } else {
            setTimeout(loadQuestion, 1000);
        }
    } else {
        setTimeout(loadQuestion, 500);
    }
}

function backToPortfolio(){ window.location.href = "index.html"; }

// Confetti
function launchConfetti() {
    const colors = ["#f15bb5","#9b5de5","#00bbf9","#00f5d4","#ffac41"];
    const duration = 1000;
    const end = Date.now() + duration;
    (function frame() {
        const confetti = document.createElement('div');
        confetti.textContent = "🎉";
        confetti.style.position = "fixed";
        confetti.style.fontSize = Math.random()*30 + 20 + "px";
        confetti.style.top = Math.random() * window.innerHeight + "px";
        confetti.style.left = Math.random() * window.innerWidth + "px";
        confetti.style.opacity = 0.8;
        confetti.style.transform = `rotate(${Math.random()*360}deg)`;
        confetti.style.color = colors[Math.floor(Math.random()*colors.length)];
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 1200);
        if (Date.now() < end) requestAnimationFrame(frame);
    })();
}

// Sparkle effect
function sparkleEffect(count, color){
    for(let i=0;i<count;i++){
        const sparkleEl = document.createElement('div');
        sparkleEl.textContent = "✨";
        sparkleEl.style.position = "fixed";
        sparkleEl.style.left = Math.random()*window.innerWidth + "px";
        sparkleEl.style.top = Math.random()*window.innerHeight + "px";
        sparkleEl.style.fontSize = Math.random()*20 + 10 + "px";
        sparkleEl.style.color = color;
        document.body.appendChild(sparkleEl);
        setTimeout(() => sparkleEl.remove(), 800);
    }
}

// Start
loadQuestion();