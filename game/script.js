let playerName = "";
let currentQuestion = 0;

// QUESTIONS
const questions = [
  {
    q: "Find the odd one out 🐦 Who is the main love interest of Eun-gyeol in Twinkling Watermelon?",
    options: [
      { img: "images/ans1.jpg" },
      { img: "images/ans2.jpg" },
      { img: "images/ans3.jpg" },
      { img: "images/pic2.png" }
    ]
  },
  {
    q: "Which one is in India 🇮🇳? Who is the main love interest of Zhou Wan in Never Ending Summer?",
    options: [
      { img: "images/ans1.jpg" },
      { img: "images/ans2.jpg" },
      { img: "images/ans3.jpg" },
      { img: "images/pic2.png" }
    ]
  },
  {
    q: "Who is the best friend / support character in Twinkling Watermelon?",
    options: [
      { img: "images/ans1.jpg" },
      { img: "images/ans2.jpg" },
      { img: "images/ans3.jpg" },
      { img: "images/pic2.png" }
    ]
  },
  {
    q: "Find the TOPA 🎩",
    lock: true,
    correctIndex: 3,
    options: [
      { img: "images/cap1.jpg" },
      { img: "images/cap2.jpg" },
      { img: "images/cap3.jpg" },
      { img: "images/pic1.png" }
    ]
  }
];

// SCREEN SWITCH
function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => {
    s.classList.remove("active");
  });
  document.getElementById(id).classList.add("active");
}

function goToName() {
  showScreen("nameScreen");
}

function goToRules() {
  const input = document.getElementById("username").value;

  if (!input.trim()) {
    alert("Enter your name 🙂");
    return;
  }

  playerName = input;
  showScreen("rulesScreen");
}

// START GAME
function startQuiz() {
  currentQuestion = 0;
  showScreen("quizScreen");
  loadQuestion();
}

// LOAD QUESTION
function loadQuestion() {
  let q = questions[currentQuestion];

  document.getElementById("questionText").innerText = q.q;
  document.getElementById("progress").innerText =
    `Question ${currentQuestion + 1} / ${questions.length}`;

  let optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.forEach((opt, index) => {
    let img = document.createElement("img");
    img.src = opt.img;
    img.classList.add("option-img");

    img.onclick = () => handleClick(index);

    optionsDiv.appendChild(img);
  });
}

// CLICK HANDLER
function handleClick(index) {
  let q = questions[currentQuestion];

  // NORMAL QUESTIONS (Q1–Q3)
  if (!q.lock) {
    currentQuestion++;
    loadQuestion();
    return;
  }

  // FINAL QUESTION (TOPA)
  if (index === q.correctIndex) {
    showSuccess();
  } else {
    showFail();
  }
}

// SUCCESS SCREEN
function showSuccess() {
  showScreen("giftScreen");

  const emoji = document.querySelector(".hug-emoji");
  const title = document.querySelector(".hug-title");
  const text = document.querySelector(".final-message");

  // reset
  title.style.opacity = 0;
  text.style.opacity = 0;

  emoji.innerHTML = "🤗";

  setTimeout(() => {
    title.style.transition = "0.5s";
    title.style.opacity = 1;
  }, 600);

  setTimeout(() => {
    text.innerHTML =
`${playerName},<br><br>
It was just my small way of saying — I value you, and I wanted to make you smile 🙂<br><br>
That’s all TOPA LADKI 🤗`;

    text.style.transition = "0.5s";
    text.style.opacity = 1;
  }, 1200);
}