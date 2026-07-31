const SESSION_KEY = "quizSessionId";

export function saveSessionId(sessionId) {
  localStorage.setItem(SESSION_KEY, sessionId);
}

export function getSessionId() {
  return localStorage.getItem(SESSION_KEY);
}

export function removeSessionId() {
  localStorage.removeItem(SESSION_KEY);
}