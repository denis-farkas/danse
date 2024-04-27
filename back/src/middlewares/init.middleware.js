import cors from "cors";
import helmet from "helmet";
import express from "express";

// Fonction pour initialiser les middlewares dans une application Express
const initMiddlewares = (app) => {
    // Pour parser les données au format JSON
    app.use(express.json());
    // Pour parser les données provenant de formulaires HTML
    app.use(express.urlencoded({ extended: true }));
    // Permet à toutes les URLs d'accéder au serveur (CORS)
    app.use(cors({ origin: "*" }));
    // Utilisation du middleware Helmet pour renforcer la sécurité
    app.use(helmet());
};

export default initMiddlewares;
