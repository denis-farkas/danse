import express from "express";
import jwt from "../middlewares/jwt.mdlwr.js";
import checkAdmin from "../middlewares/check-admin.mdlwr.js";
import { MessageController } from "../controllers/message.controller.js";

// Fonction pour initialiser les routes liées aux messages dans l'application Express
const initMessageRoutes = (app) => {
    // Création d'un routeur Express dédié aux routes des messages
    const router = express.Router();

    // Définition des routes avec les méthodes associées du contrôleur
    router.post("/create", jwt, checkAdmin, MessageController.createMessage);
    router.get("/read", MessageController.readMessages);
    router.get("/:messageId", MessageController.readOneMessage);
    router.put("/:messageId", jwt, checkAdmin, MessageController.updateMessage);
    router.delete("/:messageId", jwt, checkAdmin, MessageController.deleteOneMessage);

    // Utilisation du routeur dans l'application avec le préfixe "/message"
    app.use("/message", router);
};

export default initMessageRoutes;
