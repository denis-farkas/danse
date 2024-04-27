import jwt from "jsonwebtoken";

// Options pour la création du token JWT (expiration après 8 heures)
const jwtOptions = { expiresIn: `28800000` }; // 8h

// Clé secrète pour la signature du token, avec une valeur par défaut si non définie dans les variables d'environnement
const secret = process.env.JWT_SECRET || "T0P_S3CRet";

// Middleware pour la vérification du token JWT dans les requêtes
const jwtMdlwr = (req, res, next) => {
    // Récupération du token depuis l'en-tête Authorization de la requête
    const token = req.headers.authorization.split(" ")[1];

    // Vérification et décryptage du token
    const userId = jwtVerify(token);

    // Si le token est invalide, renvoie d'une réponse avec un statut 401 (Non autorisé)
    if (!userId) return res.status(401).json({ message: "Token invalide" });

    // Ajout de l'identifiant de l'utilisateur dans le corps de la requête
    req.body.userId = userId;

    // Poursuite de l'exécution de la requête suivante (middleware suivant)
    next();
};

// Fonction pour vérifier et décrypter un token JWT
const jwtVerify = (token) => {
    try {
        // Décryptage du token avec la clé secrète
        const decoded = jwt.verify(token, secret);
        // Récupération de l'identifiant de l'utilisateur depuis le token décrypté
        const userId = decoded.data;
        return userId;
    }
    catch (err) {
        // En cas d'erreur, affichage dans la console et retour de la valeur null
        console.error(`jwt.mdlwr.js - jwtVerify - erreur => `, err.message);
        return null;
    }
};

// Fonction pour créer un nouveau token JWT
export const jwtSign = (data) => jwt.sign({ data }, secret, jwtOptions);

// Exportation du middleware et de la fonction de création de token
export default jwtMdlwr;
