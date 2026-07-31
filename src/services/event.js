import { sendEvent } from "../core/api.js";

export function initializeEvents() {
  window.qEvent = async function (eventName, questionNumber = null) {

    try {
      await sendEvent(eventName, questionNumber);
    } catch (error) {
      console.error("Erro ao enviar evento:", error);
    }

  };
}
