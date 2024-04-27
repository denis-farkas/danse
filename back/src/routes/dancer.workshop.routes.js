import express from "express";
import jwt from "../middlewares/jwt.mdlwr.js";
import checkAdmin from "../middlewares/check-admin.mdlwr.js";
import { DancerWorkshopController } from "../controllers/dancer.workshop.controller.js";

// Fonction pour initialiser les routes liées aux ateliers de danseurs dans l'application Express
const initDancerWorkshopRoutes = (app) => {
  // Création d'un routeur Express dédié aux routes des ateliers de danseurs
  const router = express.Router();

  // Définition des routes avec les méthodes associées du contrôleur
  router.post(
    "/create",
    jwt,
    checkAdmin,
    DancerWorkshopController.createDancerWorkshop
  );
  router.get("/read", DancerWorkshopController.readDancerWorkshops);
  router.get("/readThree", DancerWorkshopController.readThreeWorkshops);
  router.get("/readDates", DancerWorkshopController.readWorkshopsDates);
  router.get("/readCities", DancerWorkshopController.readWorkshopsCities);
  router.get("/readOne", DancerWorkshopController.readOneDancerWorkshop);
  router.put(
    "/updateWorkshop",
    jwt,
    DancerWorkshopController.updateDancerWorkshop
  );
  router.delete(
    "/delete/:dancerWorkshopId",
    jwt,
    checkAdmin,
    DancerWorkshopController.deleteOneDancerWorkshop
  );

  // Utilisation du routeur dans l'application avec le préfixe "/dancer_workshop"
  app.use("/dancer_workshop", router);
};

export default initDancerWorkshopRoutes;
