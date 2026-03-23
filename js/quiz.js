import { QUIZ_QUESTIONS } from "./data.js";

export function initQuiz() {
  const root = document.querySelector("#quiz-container");
  if (!root) return;

  root.innerHTML = "";

  QUIZ_QUESTIONS.forEach((entry, index) => {
    const card = document.createElement("article");
    card.className = "quiz-card";

    const answers = document.createElement("div");
    answers.className = "answers";

    const feedback = document.createElement("p");
    feedback.setAttribute("aria-live", "polite");

    entry.options.forEach((option) => {
      const button = document.createElement("button");
      button.className = "btn answer-btn";
      button.type = "button";
      button.textContent = option;
      button.addEventListener("click", () => {
        const all = answers.querySelectorAll("button");
        all.forEach((btn) => {
          btn.disabled = true;
          btn.classList.remove("correct", "wrong");
          if (btn.textContent === entry.correctAnswer) btn.classList.add("correct");
        });

        if (option !== entry.correctAnswer) {
          button.classList.add("wrong");
          feedback.textContent = `Неверно. ${entry.explanation}`;
        } else {
          feedback.textContent = `Верно! ${entry.explanation}`;
        }
      });
      answers.append(button);
    });

    card.innerHTML = `<h3>Вопрос ${index + 1}</h3><p>${entry.question}</p>`;
    card.append(answers, feedback);
    root.append(card);
  });
}
