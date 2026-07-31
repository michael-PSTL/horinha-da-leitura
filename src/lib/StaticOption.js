function handleOption(event) {
  const element = event.currentTarget;

  const option = element.dataset.qOption;

  if (!option) {
    return;
  }

  const [questionNumber, optionSelected] = option.split(":");

  qAnswer(Number(questionNumber), optionSelected);
}

export function initializeStaticOptions() {
  const optionElements = document.querySelectorAll("[data-q-option]");

  if (!optionElements.length) {
    return;
  }

  optionElements.forEach((element) => {
    element.addEventListener("click", handleOption);
  });
}
