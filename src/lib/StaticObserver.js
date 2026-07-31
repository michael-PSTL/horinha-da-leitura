let questionElements = [];

function handleIntersection(entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    }

    const element = entry.target;
    const eventName = element.dataset.qEvent;

    if (window.qEvent && eventName) {
        
      if (eventName === "VIEW_QUESTION") {
        const index = questionElements.indexOf(element);

        if (index !== -1) {
          window.qEvent(eventName, index + 1);
        }

      } else {
        window.qEvent(eventName);
      }
    }

    observer.unobserve(element);
  });
}

export function initializeStaticObserver() {
  const elements = document.querySelectorAll("[data-q-event]");

  if (!elements.length) {
    return;
  }

  questionElements = [
    ...document.querySelectorAll('[data-q-event="VIEW_QUESTION"]'),
  ];

  const observer = new IntersectionObserver(handleIntersection, {
    threshold: 0.3,
  });

  elements.forEach((element) => {
    observer.observe(element);
  });
}
