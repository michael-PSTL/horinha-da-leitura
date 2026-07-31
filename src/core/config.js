const config = {
  slug: "",
  totalQuestions: 0,
};

export function setConfig(options) {
  if (!options?.slug) {
    throw new Error("O slug é obrigatório.");
  }

  if (!options?.totalQuestions) {
    throw new Error("O total de perguntas é obrigatório.");
  }

  config.slug = options.slug;
  config.totalQuestions = options.totalQuestions;
}

export function getConfig() {
  return { ...config };
}