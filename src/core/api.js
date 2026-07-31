import { getConfig } from "./config.js";
import { getSessionId, removeSessionId } from "../utils/storage.js";

const API_URL = "http://localhost:8080";

export async function QuizInfo() {
  const { slug, totalQuestions } = getConfig();

  const response = await fetch(`${API_URL}/quiz/${slug}/info`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      totalQuestions,
      link: window.location.origin,
    }),
  });

  if (!response.ok) {
    throw new Error("Erro ao sincronizar informações do quiz.");
  }

  return await response.json();
}

export async function createSession() {
  const { slug } = getConfig();

  const response = await fetch(`${API_URL}/session/start/${slug}`, {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Erro ao iniciar sessão.");
  }

  return await response.json();
}

export async function sendAnswer(questionNumber, optionSelected, answeredAt) {
  const response = await fetch(`${API_URL}/answer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sessionId: Number(getSessionId()),
      questionNumber,
      optionSelected,
      answeredAt,
    }),
  });

  if (!response.ok) {
    throw new Error("Erro ao enviar resposta.");
  }
}

export async function sendEvent(eventName, questionNumber = null) {
  const sessionId = getSessionId();

  if (!sessionId) return;

  const response = await fetch(`${API_URL}/event`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sessionId: Number(sessionId),
      eventName,
      questionNumber,
    }),
  });

  if (!response.ok) {
    throw new Error("Erro ao enviar evento.");
  }
}

export async function finishSession() {
  const sessionId = getSessionId();

  if (!sessionId) {
    return;
  }

  const response = await fetch(`${API_URL}/session/finish/${sessionId}`, {
    method: "POST",
    keepalive: true,
  });

  if (!response.ok) {
    throw new Error("Erro ao finalizar sessão.");
  }

  removeSessionId();
}