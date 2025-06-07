const questions = [
  {
    question: "Do you use a different password for each of your online accounts?",
    options: ["Yes", "No"],
    correctAnswer: "Yes",
    feedback: {
      Yes: "✅ Great! Using unique passwords reduces the risk of multiple accounts being compromised.",
      No: "❌ It's better to use different passwords to prevent a breach on one account from affecting others."
    }
  },
  {
    question: "Do you use Two-Factor Authentication (2FA) for your important accounts?",
    options: ["Yes", "No"],
    correctAnswer: "Yes",
    feedback: {
      Yes: "✅ Excellent! 2FA adds an extra layer of protection.",
      No: "❌ Consider enabling 2FA to make your accounts more secure."
    }
  },
  {
    question: "Have you ever used public charging ports (USB) for your phone or laptop?",
    options: ["Yes", "No"],
    correctAnswer: "No",
    feedback: {
      Yes: "❌ Avoid public chargers — they can be used to install malware or steal data (juice jacking).",
      No: "✅ Good! Always use your own charger or a portable battery bank."
    }
  },
  {
    question: "Do you check app permissions before installing them?",
    options: ["Yes", "No"],
    correctAnswer: "Yes",
    feedback: {
      Yes: "✅ Smart move! Checking permissions protects your personal data.",
      No: "❌ You should review app permissions to avoid giving unnecessary access."
    }
  },
  {
    question: "Do you log out of accounts on shared/public devices?",
    options: ["Yes", "No"],
    correctAnswer: "Yes",
    feedback: {
      Yes: "✅ Perfect! Logging out prevents unauthorized access.",
      No: "❌ Not logging out can leave your accounts vulnerable."
    }
  },
  {
    question: "Do you back up important data regularly?",
    options: ["Yes", "No"],
    correctAnswer: "Yes",
    feedback: {
      Yes: "✅ Great habit! Backups protect your data in case of loss or attack.",
      No: "❌ Regular backups can save your data from ransomware or crashes."
    }
  },
  {
    question: "Have you ever received a breach alert for your account?",
    options: ["Yes", "No"],
    correctAnswer: "Yes",
    feedback: {
      Yes: "✅ Always change your password immediately if you get such alerts.",
      No: "❌ That’s good! But stay alert — breaches can happen anytime."
    }
  },
  {
    question: "Do you have antivirus software installed and active?",
    options: ["Yes", "No"],
    correctAnswer: "Yes",
    feedback: {
      Yes: "✅ Excellent! Antivirus software helps detect and block threats.",
      No: "❌ Install and update antivirus to defend against malware."
    }
  },
  {
    question: "Do you regularly update your software and apps?",
    options: ["Yes", "No"],
    correctAnswer: "Yes",
    feedback: {
      Yes: "✅ Awesome! Updates fix security holes and improve performance.",
      No: "❌ Outdated software can be an easy target for hackers."
    }
  },
  {
    question: "Do you use public Wi-Fi for banking or shopping?",
    options: ["Yes", "No"],
    correctAnswer: "No",
    feedback: {
      Yes: "❌ Avoid doing sensitive tasks on public Wi-Fi unless using a VPN.",
      No: "✅ Smart! Public Wi-Fi is risky without protection."
    }
  }
];

let currentQuestion = 0;
let score = 0;
let userName = "";

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const quizBox = document.getElementById("quiz-box");
const loginBtn = document.getElementById("login-btn");
const loginForm = document.getElementById("login-form");
const resultBox = document.getElementById("result-box");

function showQuestion() {
  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.classList.add("option-btn");
    btn.addEventListener("click", () => selectAnswer(option, btn));
    optionsEl.appendChild(btn);
  });

  nextBtn.classList.add("hidden");
}

function selectAnswer(selected, clickedBtn) {
  const q = questions[currentQuestion];
  const isCorrect = selected === q.correctAnswer;

  Array.from(optionsEl.children).forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === q.correctAnswer) {
      btn.classList.add("correct");
    }
    if (btn.textContent === selected && !isCorrect) {
      btn.classList.add("wrong");
    }
  });

  const feedbackEl = document.createElement("div");
  feedbackEl.classList.add("feedback");
  feedbackEl.textContent = q.feedback[selected];
  optionsEl.appendChild(feedbackEl);

  if (isCorrect) score++;

  nextBtn.classList.remove("hidden");
}

function showResult() {
  questionEl.textContent = "Completed!";
  const percentage = Math.round((score / questions.length) * 100);
  optionsEl.innerHTML = `🎉 You got ${score} out of ${questions.length} correct.<br><br>Your hygiene is ${percentage}%`;

  const riskLevel = document.getElementById("risk-level");
  const scoreDisplay = document.getElementById("score-display");

  if (score <= 4) {
    riskLevel.textContent = "🔴 High Risk: Please improve your cyber hygiene!";
    riskLevel.style.color = "red";
  } else if (score <= 7) {
    riskLevel.textContent = "🟠 Medium Risk: You need to improve your cyber hygiene.";
    riskLevel.style.color = "orange";
  } else {
    riskLevel.textContent = "🟢 Low Risk: Great job! Your cyber hygiene is good.";
    riskLevel.style.color = "green";
  }

  nextBtn.classList.add("hidden");
  resultBox.classList.remove("hidden");
}

loginBtn.addEventListener("click", () => {
  const userNameInput = document.getElementById("name").value.trim();

  if (!userNameInput) {
    alert("Please enter your name.");
    return;
  }

  userName = userNameInput;
  loginForm.classList.add("hidden");
  quizBox.classList.remove("hidden");
  showQuestion();
});

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
    document.getElementById("user-name").textContent = userName;
  }
});
