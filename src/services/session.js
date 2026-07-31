import { createSession, finishSession } from "../core/api.js";
import { saveSessionId } from "../utils/storage.js";

const TIMEOUT = 5 * 60 * 1000; // 5 minutos

let inactivityTimer;
let sessionFinished = false;

const EVENTS = ["mousedown", "keydown", "pointermove", "scroll", "input"];

export function initializeSession() {
  resetInactivityTimer();

  EVENTS.forEach((event) => {
    window.addEventListener(event, resetInactivityTimer);
  });

  window.addEventListener("click", restartSession);
  window.addEventListener("pagehide", finish);
}

function resetInactivityTimer() {
  if (sessionFinished) {
    return;
  }

  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(finish, TIMEOUT);
}

async function finish() {
  if (sessionFinished) {
    return;
  }

  sessionFinished = true;

  clearTimeout(inactivityTimer);

  try {
    await finishSession();
  } catch (error) {
    console.error(error);
  }
}

async function restartSession() {
  if (!sessionFinished) {
    return;
  }

  try {
    const { sessionId } = await createSession();

    saveSessionId(sessionId);

    sessionFinished = false;

    resetInactivityTimer();
  } catch (error) {
    console.error(error);
  }
}
