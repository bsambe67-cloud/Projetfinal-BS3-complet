export function errorHandler(error, req, res, next) {
  console.error(error);
  if (error.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: "Données invalides.",
      errors: Object.values(error.errors).map((item) => item.message)
    });
  }
  if (error.code === 11000) {
    return res.status(409).json({ success: false, message: "Cette valeur existe déjà." });
  }
  res.status(error.status || 500).json({
    success: false,
    message: error.message || "Une erreur serveur est survenue."
  });
}
