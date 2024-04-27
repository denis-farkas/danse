import { CategoryWorkshopDB } from "../databases/category.workshop.database.js";

// Fonction pour créer une catégorie d'atelier
const createCategoryWorkshop = async (req, res) => {
    // Extraction des données de la requête
    const { name, description } = req.body;

    // Appel à la fonction de la base de données pour créer une catégorie d'atelier
    const response = await CategoryWorkshopDB.createCategoryWorkshop(name, description);
    const result = response.result;

    // Retour d'une réponse avec le statut 201 et les données de la catégorie d'atelier créée
    return res.status(201).json({ message: "OK", categoryWorkshops: result });
};

// Fonction pour récupérer toutes les catégories d'atelier
const readCategoryWorkshops = async (req, res) => {
    // Appel à la fonction de la base de données pour récupérer toutes les catégories d'atelier
    const response = await CategoryWorkshopDB.readCategoryWorkshops();
    const result = response.result;

    // Retour d'une réponse avec le statut 200 (OK) et les données des catégories d'atelier
    return res.status(200).json({ message: "Requête OK", categoryWorkshops: result });
};

// Fonction pour récupérer une seule catégorie d'atelier par son identifiant
const readOneCategoryWorkshop = async (req, res) => {
    // Extraction de l'identifiant de la catégorie d'atelier à partir des paramètres de la requête
    const categoryWorkshopId = req.params.categoryWorkshopId;

    // Appel à la fonction de la base de données pour récupérer une seule catégorie d'atelier
    const response = await CategoryWorkshopDB.readOneCategoryWorkshop(categoryWorkshopId);
    const result = response.result;

    // Création d'un objet représentant la catégorie d'atelier avec des propriétés spécifiques
    const categoryWorkshop = {
        categoryWorkshopId,
        name: result[0].name,
        description: result[0].description,
    };

    // Retour d'une réponse avec le statut 200 (OK) et les données de la catégorie d'atelier spécifiée
    return res.status(200).json({ message: "Requête OK", categoryWorkshop });
};

// Fonction pour mettre à jour une catégorie d'atelier
const updateCategoryWorkshop = async (req, res) => {
    // Extraction des données de la requête
    const { name, description, categoryWorkshopId } = req.body;

    // Appel à la fonction de la base de données pour mettre à jour une catégorie d'atelier
    const response = await CategoryWorkshopDB.updateCategoryWorkshop(name, description, categoryWorkshopId);

    // Vérification des erreurs lors de la mise à jour
    if (response.error) {
        // En cas d'erreur, retour d'une réponse avec le statut 500 (Erreur interne du serveur)
        return res.status(500).json({ message: response.error });
    }

    // En cas de succès, retour d'une réponse avec le statut 200 (OK) et un message indiquant la mise à jour réussie
    return res.status(200).json({ message: `La catégorie d'atelier numéro ${categoryWorkshopId} a été modifiée` });
};

// Fonction pour supprimer une catégorie d'atelier par son identifiant
const deleteOneCategoryWorkshop = async (req, res) => {
    // Extraction de l'identifiant de la catégorie d'atelier à partir des paramètres de la requête
    const categoryWorkshopId = req.params.categoryWorkshopId;

    // Appel à la fonction de la base de données pour supprimer une catégorie d'atelier
    const response = await CategoryWorkshopDB.deleteOneCategoryWorkshop(categoryWorkshopId);

    // Récupération d'une éventuelle erreur
    const error = response.error; // soit une chaîne de caractères, soit null

    // Vérification de la présence d'une erreur
    if (error) {
        // En cas d'erreur, retour d'une réponse avec le statut 500 (Erreur interne du serveur)
        return res.status(500).json({ message: error });
    } else {
        // En cas de succès, retour d'une réponse avec le statut 200 (OK) et un message indiquant la suppression réussie
        return res.status(200).json({ message: "Catégorie d'atelier supprimée" });
    }
};

// Exportation de l'objet contenant toutes les fonctions du contrôleur des catégories d'atelier
export const CategoryWorkshopController = {
    createCategoryWorkshop,
    readCategoryWorkshops,
    readOneCategoryWorkshop,
    updateCategoryWorkshop,
    deleteOneCategoryWorkshop,
};
