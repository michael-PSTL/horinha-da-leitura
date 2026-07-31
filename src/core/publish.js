import { setConfig } from "./config.js";
import { QuizInfo } from "./api.js";

export async function publish(options) {

  setConfig(options);

  await QuizInfo();
}