const gameContainer = document.getElementById('game-container');

function backToPortfolio(){
    window.location.href = "index.html";
}

function startGame(game){
    gameContainer.innerHTML = ''; // Clear old game
    if(game === 'rps') startRPS();
    else if(game === 'number') startNumberGuess();
    else if(game === 'quiz') startMiniQuiz();
    else if(game === 'typing') startTypingTest();
}

// ====================
// Rock Paper Scissors
// ====================
function startRPS(){
    gameContainer.innerHTML = `<h2>Rock Paper Scissors</h2>
    <p>Choose your move:</p>`;
    const moves = ['✊ Rock','🤚 Paper','✌️ Scissors'];
    moves.forEach(move => {
        const btn = document.createElement('button');
        btn.textContent = move;
        btn.classList.add('option-btn'); // styled buttons
        btn.onclick = () => playRPS(move.split(' ')[1]); // only use text without emoji for logic
        gameContainer.appendChild(btn);
    });
    const result = document.createElement('p');
    result.id = 'rps-result';
    gameContainer.appendChild(result);
}


function playRPS(player){
    const moves = ['Rock','Paper','Scissors'];
    const computer = moves[Math.floor(Math.random()*3)];
    let res = '';
    if(player === computer) res = `Tie! Both chose ${player}`;
    else if((player==='Rock' && computer==='Scissors') ||
            (player==='Paper' && computer==='Rock') ||
            (player==='Scissors' && computer==='Paper')) res = `You win! Computer chose ${computer}`;
    else res = `You lose! Computer chose ${computer}`;
    document.getElementById('rps-result').textContent = res;
}

// ====================
// Number Guess
// ====================
function startNumberGuess(){
    const target = Math.floor(Math.random()*20)+1;
    let attempts = 0;
    gameContainer.innerHTML = `<h2>Number Guess</h2>
    <p>Guess a number between 1 and 20</p>
    <input type="number" id="guessInput" min="1" max="20">
    <button id="guess-btn">Guess</button>
    <p id="guessResult"></p>`;

    document.getElementById('guess-btn').classList.add('option-btn');
    document.getElementById('guess-btn').addEventListener('click', () => {
        const val = Number(document.getElementById('guessInput').value);
        attempts++;
        let msg = '';
        if(val === target) msg = `Correct! You guessed in ${attempts} tries.`;
        else if(val < target) msg = 'Too low!';
        else msg = 'Too high!';
        document.getElementById('guessResult').textContent = msg;
    });
}

// ====================
// Mini Quiz (5 questions)
// ====================
function startMiniQuiz(){
    const questions = [
        {q:"Which language is for web?", a:"JavaScript", options:["Python","C++","JavaScript","C"]},
        {q:"2+2=?", a:"4", options:["2","3","4","5"]},
        {q:"HTML stands for?", a:"Hyper Text Markup Language", options:["High Text","Hyper Text","Hyper Text Markup Language","Hyper Tool"]},
        {q:"Python is:", a:"Interpreted", options:["Compiled","Interpreted","Markup","Assembly"]},
        {q:"CSS is for?", a:"Styling", options:["Logic","Styling","Data","Loops"]},
    ];
    let index = 0, score = 0;

    function showQuestion(){
        if(index >= questions.length){
            gameContainer.innerHTML = `<h2>Quiz Finished</h2><p>Score: ${score}/${questions.length}</p>`;
            return;
        }
        const q = questions[index];
        gameContainer.innerHTML = `<h3>${q.q}</h3>`;
        q.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.textContent = opt;
        btn.classList.add('option-btn'); // now animated
        btn.onclick = () => {
            if(opt === q.a) score++;
            index++;
            showQuestion();
        };
        gameContainer.appendChild(btn);
    });

    }
    showQuestion();
}

// ====================
// Typing Speed Test
// ====================
function startTypingTest() {
    const words = ["javascript","python","c++","html","css","coding","game","developer","function","variable","loop","array","object","keyboard","program"];
    let text = [];
    for (let i = 0; i < 20; i++) text.push(words[Math.floor(Math.random() * words.length)]);

    let startTime = null;
    let currentWordIndex = 0;
    let totalTypedChars = 0; // all keystrokes including mistakes
    let mistakes = 0;         // mistakes typed

    gameContainer.innerHTML = `<h2>Typing Speed Test</h2>
        <p>Type the words as fast and accurately as you can!</p>
        <p id="typing-text"></p>
        <input type="text" id="typing-input" placeholder="Start typing..." autofocus>
        <p id="typing-status">Word 1 of ${text.length}</p>
        <div id="typing-result" style="margin-top:15px;"></div>`;

    const input = document.getElementById('typing-input');
    const status = document.getElementById('typing-status');
    const display = document.getElementById('typing-text');
    const result = document.getElementById('typing-result');

    function renderText() {
        display.innerHTML = '';
        text.forEach((word, i) => {
            const span = document.createElement('span');
            span.textContent = word + ' ';
            if (i === currentWordIndex) span.style.textDecoration = 'underline';
            display.appendChild(span);
        });
    }

    renderText();

    input.addEventListener('input', (e) => {
        if (!startTime) startTime = new Date().getTime();

        const typed = input.value;
        const currentWord = text[currentWordIndex];

        // Track keystrokes and mistakes live
        totalTypedChars = totalTypedChars + 1; // count every keypress

        // Count mistake if typed char doesn't match
        const lastCharIndex = typed.length - 1;
        if (lastCharIndex >= 0) {
            if (typed[lastCharIndex] !== currentWord[lastCharIndex]) mistakes++;
        }

        // Highlight mistakes in red
        let highlighted = '';
        for (let i = 0; i < typed.length; i++) {
            if (typed[i] === currentWord[i]) highlighted += typed[i];
            else highlighted += `<span style="color:red">${typed[i]}</span>`;
        }
        const spans = display.getElementsByTagName('span');
        spans[currentWordIndex].innerHTML = highlighted + currentWord.slice(typed.length) + ' ';

        // Move to next word if space pressed
        if (typed.endsWith(' ')) {
            input.value = '';
            currentWordIndex++;
            if (currentWordIndex < text.length) {
                status.textContent = `Word ${currentWordIndex + 1} of ${text.length}`;
                renderText();
            } else {
                const endTime = new Date().getTime();
                const timeElapsedMinutes = (endTime - startTime) / 60000;

                const correctChars = totalTypedChars - mistakes;
                const wpm = Math.round((correctChars / 5) / timeElapsedMinutes);
                const accuracy = (correctChars / totalTypedChars) * 100;

                input.disabled = true;
                display.innerHTML = `<span>🎉 Test Finished! 🎉</span>`;
                result.innerHTML = `Time: ${(timeElapsedMinutes*60).toFixed(2)}s<br>
                    WPM: ${wpm}<br>
                    Accuracy: ${accuracy.toFixed(2)}%<br>
                    <button class="option-btn" onclick="startTypingTest()">Restart</button>`;
            }
        }
    });
}