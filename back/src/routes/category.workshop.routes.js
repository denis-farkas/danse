import express from "express";
import jwt from "../middlewares/jwt.mdlwr.js";
import checkAdmin from "../middlewares/check-admin.mdlwr.js";
import { CategoryWorkshopController } from "../controllers/category.workshop.controller.js";

// Fonction pour initialiser les routes liées aux ateliers de catégories dans l'application Express
const initCategoryWorkshopRoutes = (app) => {
    // Création d'un routeur Express dédié aux routes des ateliers de catégories
    const router = express.Router();

    // Définition des routes avec les méthodes associées du contrôleur
    router.post("/create", jwt, checkAdmin, CategoryWorkshopController.createCategoryWorkshop);
    router.get("/read", CategoryWorkshopController.readCategoryWorkshops);
    router.get("/:categoryWorkshopId", CategoryWorkshopController.readOneCategoryWorkshop);
    router.put("/:categoryWorkshopId", jwt, checkAdmin, CategoryWorkshopController.updateCategoryWorkshop);
    router.delete("/:categoryWorkshopId", CategoryWorkshopController.deleteOneCategoryWorkshop);

    // Utilisation du routeur dans l'application avec le préfixe "/category_workshop"
    app.use("/category_workshop", router);
};

export default initCategoryWorkshopRoutes;
