import { createSession } from "./core/api.js";
import { setConfig } from "./core/config.js";
import { saveSessionId } from "./utils/storage.js";
import { initializeSession } from "./services/session.js";
import { initializeAnswers } from "./services/answer.js";
import { initializeEvents } from "./services/event.js";
import { initializeStaticObserver } from "./lib/StaticObserver.js";
import { initializeStaticActions } from "./lib/StaticAction.js";
import { initializeStaticOptions } from "./lib/StaticOption.js";

export async function init(options) {
  setConfig(options);

  try {

    console.log("Biblioteca inicializada.");

    const { sessionId } = await createSession();

    saveSessionId(sessionId);

    initializeEvents();
    initializeAnswers();

    initializeStaticObserver();
    initializeStaticActions();
    initializeStaticOptions();

    initializeSession();

  } catch (error) {
    console.error("Erro ao iniciar a sessão do quiz.", error);
  }
}
