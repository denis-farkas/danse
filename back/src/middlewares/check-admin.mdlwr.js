import query from "../databases/init.database.js";

// Middleware pour vérifier le statut d'administrateur de l'utilisateur
const checkAdmin = async (req, res, next) => {
  // Récupération de l'identifiant de l'utilisateur depuis la requête
  const userId = req.body.userId;

  // Requête SQL pour obtenir le rôle de l'utilisateur
  const userSql = `
    SELECT user_id, role
    FROM users
    WHERE user_id = ?
  `;

  // Exécution de la requête SQL
  const userRes = await query(userSql, [userId]);
  const user = userRes[0];
  const role = user.role;

  // Vérification si l'utilisateur a le rôle d'administrateur
  if (role !== "admin") {
    return res
      .status(403)
      .json({ message: `Vous n'avez pas les droits d'administrateur` });
  }

  // Poursuite de l'exécution de la requête suivante (middleware suivant)
  next();
};

export default checkAdmin;
