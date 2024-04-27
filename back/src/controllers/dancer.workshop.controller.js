import { DancerWorkshopDB } from "../databases/dancer.workshop.database.js";

// Fonction pour créer un atelier de danse
const createDancerWorkshop = async (req, res) => {
  // Extraction des données de la requête
  const {
    title,
    description,
    date,
    hour,
    duration,
    city,
    price,
    requiredDanceLevel,
    personMax,
    category_workshop_id,
  } = req.body;

  // Appel à la fonction de la base de données pour créer un atelier de danse
  const response = await DancerWorkshopDB.createDancerWorkshop(
    title,
    description,
    date,
    hour,
    duration,
    city,
    price,
    requiredDanceLevel,
    personMax,
    category_workshop_id
  );
  const result = response.result;

  // Retour d'une réponse avec le statut 201 (Créé) et les données de l'atelier de danse créé
  return res.status(201).json({ message: "OK", dancerWorkshops: result });
};

// Fonction pour récupérer tous les ateliers de danse
const readDancerWorkshops = async (req, res) => {
  // Appel à la fonction de la base de données pour récupérer tous les ateliers de danse
  const response = await DancerWorkshopDB.readDancerWorkshops();
  const result = response.result;

  // Retour d'une réponse avec le statut 200 (OK) et les données des ateliers de danse
  return res
    .status(200)
    .json({ message: "Requête OK", dancerWorkshops: result });
};

const readThreeWorkshops = async (req, res) => {
  // Appel à la fonction de la base de données pour récupérer tous les 4  prochains ateliers de danse à venir
  const response = await DancerWorkshopDB.readThreeWorkshops();
  const result = response.result;

  // Retour d'une réponse avec le statut 200 (OK) et les données des ateliers de danse
  return res
    .status(200)
    .json({ message: "Requête OK", dancerWorkshops: result });
};

const readWorkshopsDates = async (req, res) => {
  // Appel à la fonction de la base de données pour récupérer tous les ateliers de danse
  const response = await DancerWorkshopDB.readWorkshopsDates();
  const result = response.result;
  const dates = result.map((obj) => obj.date);

  // Retour d'une réponse avec le statut 200 (OK) et les données des ateliers de danse
  return res.status(200).json({ message: "Requête OK", dates: dates });
};

const readWorkshopsCities = async (req, res) => {
  // Appel à la fonction de la base de données pour récupérer tous les ateliers de danse
  const response = await DancerWorkshopDB.readWorkshopsCities();
  const result = response.result;
  const cities = result.map((obj) => obj.city);
  // Retour d'une réponse avec le statut 200 (OK) et les données des ateliers de danse
  return res.status(200).json({ message: "Requête OK", cities: cities });
};

// Fonction pour récupérer un atelier de danse spécifique par son identifiant
const readOneDancerWorkshop = async (req, res) => {
  // Appel à la fonction de la base de données pour récupérer un atelier de danse spécifique par son identifiant
  const response = await DancerWorkshopDB.readOneDancerWorkshop(req.query.id);
  const result = response.result;

  // Création d'un objet représentant l'atelier de danse avec des propriétés spécifiques
  const dancerWorkshop = {
    title: result[0].title,
    description: result[0].description,
    date: result[0].date,
    hour: result[0].hour,
    duration: result[0].duration,
    city: result[0].city,
    price: result[0].price,
    requiredDanceLevel: result[0].required_dance_level,
    personMax: result[0].person_max,
    categoryWorkshopId: result[0].category_workshop_id,
    name: result[0].name,
  };

  // Retour d'une réponse avec le statut 200 (OK) et les données de l'atelier de danse spécifié
  return res.status(200).json({ message: "Requête OK", dancerWorkshop });
};

// Fonction pour mettre à jour un atelier de danse
const updateDancerWorkshop = async (req, res) => {
  // Extraction des données de la requête
  const { workshop } = req.body;
  const title = workshop.title;
  const description = workshop.description;
  const date = workshop.date;
  const hour = workshop.hour;
  const duration = workshop.duration;
  const city = workshop.city;
  const price = workshop.price;
  const required_dance_level = workshop.requiredDanceLevel;
  const person_max = workshop.personMax;
  const dancer_workshop_id = workshop.dancerWorkshopId;
  const category_workshop_id = workshop.categoryWorkshopId;

  // Appel à la fonction de la base de données pour mettre à jour un atelier de danse
  const response = await DancerWorkshopDB.updateDancerWorkshop(
    title,
    description,
    date,
    hour,
    duration,
    city,
    price,
    required_dance_level,
    person_max,
    category_workshop_id,
    dancer_workshop_id
  );

  // Vérification des erreurs lors de la mise à jour
  if (response.error) {
    // En cas d'erreur, retour d'une réponse avec le statut 500 (Erreur interne du serveur)
    return res.status(500).json({ message: response.error });
  }

  // En cas de succès, retour d'une réponse avec le statut 200 (OK) et un message indiquant la mise à jour réussie
  return res.status(200).json({
    message: `L'atelier de danse a été modifié`,
  });
};

// Fonction pour supprimer un atelier de danse par son identifiant
const deleteOneDancerWorkshop = async (req, res) => {
  // Extraction de l'identifiant de l'atelier de danse à partir des paramètres de la requête
  const dancerWorkshopId = req.params.dancerWorkshopId;

  // Appel à la fonction de la base de données pour supprimer un atelier de danse
  const response = await DancerWorkshopDB.deleteOneDancerWorkshop(
    dancerWorkshopId
  );

  // Récupération d'une éventuelle erreur
  const error = response.error; // soit une chaîne de caractères, soit null

  // Vérification de la présence d'une erreur
  if (error) {
    // En cas d'erreur, retour d'une réponse avec le statut 500 (Erreur interne du serveur)
    return res.status(500).json({ message: error });
  } else {
    // En cas de succès, retour d'une réponse avec le statut 200 (OK) et un message indiquant la suppression réussie
    return res.status(200).json({ message: "Atelier de danse supprimé" });
  }
};

// Exportation de l'objet contenant toutes les fonctions du contrôleur des ateliers de danse
export const DancerWorkshopController = {
  createDancerWorkshop,
  readDancerWorkshops,
  readOneDancerWorkshop,
  updateDancerWorkshop,
  deleteOneDancerWorkshop,
  readWorkshopsCities,
  readWorkshopsDates,
  readThreeWorkshops,
};
