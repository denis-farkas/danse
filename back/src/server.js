import express from "express";
import initRoutes from "./routes/init.routes.js";
import initMiddlewares from "./middlewares/init.middleware.js";
import cors from "cors";

// Port sur lequel le serveur écoutera les connexions
const PORT = process.env.PORT || 3000;
console.log("PORT:", process.env.PORT);

// Création de l'application Express
const app = express();

// Initialisation des middlewares (gestionnaires intermédiaires)
initMiddlewares(app);

// Initialisation des routes de l'application
initRoutes(app);

// Écoute du serveur sur le port spécifié
app.listen(PORT, () => {
  console.log("Le serveur écoute sur le PORT:", PORT);
});
