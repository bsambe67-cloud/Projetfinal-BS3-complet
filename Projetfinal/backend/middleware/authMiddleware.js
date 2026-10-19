import jwt from "jsonwebtoken";

export function requireAdmin(req, res, next) {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Connexion administrateur requise."
    });
  }

  const token = authorization.slice(7);

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET n'est pas configuré.");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin" || !decoded.sub) {
      return res.status(403).json({
        success: false,
        message: "Accès réservé à l'administrateur."
      });
    }

    req.admin = {
      id: decoded.sub,
      role: decoded.role
    };

    next();
  } catch {
    return res.status(401).json({
      success: false,
      message: "Session invalide ou expirée. Veuillez vous reconnecter."
    });
  }
}