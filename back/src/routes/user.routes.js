import express from "express";
import jwt from "../middlewares/jwt.mdlwr.js";
import { UserController } from "../controllers/user.controller.js";

// Fonction pour initialiser les routes liées aux utilisateurs dans l'application Express
const initUserRoutes = (app) => {
    // Création d'un routeur Express dédié aux routes des utilisateurs
    const router = express.Router();

    // Définition des routes avec les méthodes associées du contrôleur
    router.post("/signUp", UserController.signUp);
    router.post("/signIn", UserController.signIn);
    router.get("/read", UserController.read);
    router.get("/readOneUser", UserController.readOneUser);
    router.post("/sign-up-workshop", UserController.signUpWorkshop);
    router.post("/isRegistered", UserController.isRegistered);
    router.get("/registeredWorkshop", UserController.registeredWorkshop);
    router.put("/updateUser", jwt, UserController.updateUser);

    // Utilisation du routeur dans l'application avec le préfixe "/users"
    app.use("/users", router);
};

export default initUserRoutes;
