import initUserRoutes from "./user.routes.js";
import initDancerWorkshopRoutes from "./dancer.workshop.routes.js";
import initMessageRoutes from "./message.routes.js";
import initCategoryWorkshopRoutes from "./category.workshop.routes.js";

// Fonction pour initialiser toutes les routes de l'application Express
const initRoutes = (app) => {
    // Appel des fonctions d'initialisation des routes pour chaque domaine
    initUserRoutes(app);
    initDancerWorkshopRoutes(app);
    initMessageRoutes(app);
    initCategoryWorkshopRoutes(app);
};

export default initRoutes;
