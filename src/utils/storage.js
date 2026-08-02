const SESSION_KEY = "quizSessionCode";

export function saveSessionCode(sessionCode) {
  localStorage.setItem(SESSION_KEY, sessionCode);
}

export function getSessionCode() {
  return localStorage.getItem(SESSION_KEY);
}

export function removeSessionCode() {
  localStorage.removeItem(SESSION_KEY);
}