import { getConfig } from "./config.js";
import {
  getSessionCode,
  saveSessionCode,
  removeSessionCode,
} from "../utils/storage.js";

const API_URL = "https://quiz-api-production-3617.up.railway.app";

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

  const data = await response.json();

  if (data.sessionCode) {
    saveSessionCode(data.sessionCode);
  }

  return data;
}

export async function sendAnswer(questionNumber, optionSelected, answeredAt) {
  const sessionCode = getSessionCode();

  if (!sessionCode) {
    throw new Error("Sessão não encontrada.");
  }

  const response = await fetch(`${API_URL}/answer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sessionCode,
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
  const sessionCode = getSessionCode();

  if (!sessionCode) {
    return;
  }

  const response = await fetch(`${API_URL}/event`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sessionCode,
      eventName,
      questionNumber,
    }),
  });

  if (!response.ok) {
    throw new Error("Erro ao enviar evento.");
  }
}

export async function finishSession() {
  const sessionCode = getSessionCode();

  if (!sessionCode) {
    return;
  }

  const response = await fetch(`${API_URL}/session/finish/${sessionCode}`, {
    method: "POST",
    keepalive: true,
  });

  if (!response.ok) {
    throw new Error("Erro ao finalizar sessão.");
  }

  removeSessionCode();
}
