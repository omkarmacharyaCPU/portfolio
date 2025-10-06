// =========================
// Confetti (Simple Version)
// =========================
function launchConfetti() {
    const duration = 2 * 1000;
    const end = Date.now() + duration;

    (function frame() {
        const confetti = document.createElement('div');
        confetti.textContent = "🎉";
        confetti.style.position = "fixed";
        confetti.style.fontSize = "20px";
        confetti.style.top = Math.random() * window.innerHeight + "px";
        confetti.style.left = Math.random() * window.innerWidth + "px";
        confetti.style.opacity = 0.8;
        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 2000);

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}

// =========================
// DOM Ready
// =========================
document.addEventListener('DOMContentLoaded', () => {

    // =========================
    // Theme Toggle
    // =========================
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark');
        });
    }

    // =========================
    // Quiz Game
    // =========================
    const quizQuestions = [
        {
            question: "Which language is fastest for competitive programming?",
            options: ["Python", "C++", "JavaScript", "Ruby"],
            answer: "C++"
        },
        {
            question: "Which engine is used for Unity games?",
            options: ["Unreal", "Godot", "Unity Engine", "CryEngine"],
            answer: "Unity Engine"
        },
        {
            question: "Python is:",
            options: ["Compiled", "Interpreted", "Markup", "Assembly"],
            answer: "Interpreted"
        }
    ];

    const quizContainer = document.getElementById('quiz-container');
    const startQuizBtn = document.getElementById('start-quiz');
    if (quizContainer && startQuizBtn) {
        startQuizBtn.addEventListener('click', () => {
            quizContainer.innerHTML = '';
            let score = 0;
            quizQuestions.forEach((q, index) => {
                const qDiv = document.createElement('div');
                qDiv.classList.add('quiz-question');
                const qTitle = document.createElement('p');
                qTitle.textContent = `${index + 1}. ${q.question}`;
                qDiv.appendChild(qTitle);

                q.options.forEach(opt => {
                    const btn = document.createElement('button');
                    btn.textContent = opt;
                    btn.style.margin = "4px";
                    btn.addEventListener('click', () => {
                        if (opt === q.answer) {
                            score++;
                            launchConfetti();
                            btn.style.background = "#4caf50";
                            btn.style.color = "#fff";
                        } else {
                            btn.style.background = "#f44336";
                            btn.style.color = "#fff";
                        }
                        Array.from(qDiv.querySelectorAll('button')).forEach(b => b.disabled = true);
                        if (index === quizQuestions.length - 1) {
                            setTimeout(() => {
                                alert(`Quiz Finished! Your score: ${score}/${quizQuestions.length}`);
                            }, 500);
                        }
                    });
                    qDiv.appendChild(btn);
                });
                quizContainer.appendChild(qDiv);
            });
        });
    }

    // =========================
    // Rock Paper Scissors
    // =========================
    const rpsContainer = document.getElementById('rps-container');
    const startRpsBtn = document.getElementById('start-rps');
    if (rpsContainer && startRpsBtn) {
        startRpsBtn.addEventListener('click', () => {
            rpsContainer.innerHTML = '';
            const choices = ["Rock", "Paper", "Scissors"];
            let playerScore = 0, aiScore = 0;

            const scoreDisplay = document.createElement('p');
            scoreDisplay.textContent = `Player: ${playerScore} | AI: ${aiScore}`;
            rpsContainer.appendChild(scoreDisplay);

            const buttonsDiv = document.createElement('div');

            choices.forEach(ch => {
                const btn = document.createElement('button');
                btn.textContent = ch;
                btn.style.margin = "5px";
                btn.addEventListener('click', () => {
                    const aiChoice = choices[Math.floor(Math.random() * 3)];
                    let result = "";
                    if (ch === aiChoice) result = "Tie!";
                    else if ((ch === "Rock" && aiChoice === "Scissors") ||
                        (ch === "Paper" && aiChoice === "Rock") ||
                        (ch === "Scissors" && aiChoice === "Paper")) {
                        result = "You Win!";
                        playerScore++;
                        launchConfetti();
                    } else {
                        result = "You Lose!";
                        aiScore++;
                    }
                    alert(`You: ${ch} | AI: ${aiChoice} -> ${result}`);
                    scoreDisplay.textContent = `Player: ${playerScore} | AI: ${aiScore}`;
                });
                buttonsDiv.appendChild(btn);
            });

            rpsContainer.appendChild(buttonsDiv);
        });
    }

    // =========================
    // Easter Egg - Logo Click
    // =========================
    const logo = document.getElementById('logo');
    if (logo) {
        let clickCount = 0;
        logo.addEventListener('click', () => {
            clickCount++;
            if (clickCount === 5) {
                // Show a nicer inline message instead of alert
                const msg = document.createElement('p');
                msg.textContent = "🎉 Surprise! You discovered the hidden easter egg!";
                msg.style.color = "#ff5722";
                msg.style.fontWeight = "bold";
                msg.style.fontSize = "18px";
                msg.style.textAlign = "center";
                document.body.appendChild(msg);

                launchConfetti();
                clickCount = 0;

                // Remove the message after 5 seconds
                setTimeout(() => msg.remove(), 5000);
            }
        });
    }

    // =========================
    // Console Easter Egg
    // =========================
    console.log("%cHey coder! You found the secret console message 😎", "color: orange; font-size:16px; font-weight:bold;");
});
