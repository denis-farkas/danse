// Import du module pour exécuter les requêtes SQL
import query from "./init.database.js";

// Fonction pour créer un nouvel atelier de danse
const createDancerWorkshop = async (
  title,
  description,
  date,
  hour,
  duration,
  city,
  price,
  requiredDanceLevel,
  personMax,
  categoryWorkshopId
) => {
  const sql = `
        INSERT INTO dancer_workshop (title, description, date, hour, duration, city, price, required_dance_level, person_max, category_workshop_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?)
    `;

  let error = null;
  let result = null;

  try {
    result = await query(sql, [
      title,
      description,
      date,
      hour,
      duration,
      city,
      price,
      requiredDanceLevel,
      personMax,
      categoryWorkshopId,
    ]);
  } catch (e) {
    error = e.message;
  } finally {
    return { error, result };
  }
};

// Fonction pour récupérer les 5 premiers ateliers de danse de la base de données

const readThreeWorkshops = async () => {
  const sql = `
        SELECT dancer_workshop_id, title, description, date, hour, duration, city, price, required_dance_level, person_max, category_workshop_id
        FROM dancer_workshop
        ORDER BY date DESC
        LIMIT 4
    `;

  let error = null;
  let result = null;

  try {
    result = await query(sql);
  } catch (e) {
    error = e.message;
  } finally {
    return { error, result };
  }
};
const readDancerWorkshops = async () => {
  const sql = `
        SELECT dancer_workshop_id, title, description, date, hour, duration, city, price, required_dance_level, person_max, category_workshop_id
        FROM dancer_workshop
        ORDER BY date DESC
    `;

  let error = null;
  let result = null;

  try {
    result = await query(sql);
  } catch (e) {
    error = e.message;
  } finally {
    return { error, result };
  }
};

const readWorkshopsDates = async () => {
  const sql = `
        SELECT DISTINCT date
        FROM dancer_workshop
        ORDER BY date ASC
    `;

  let error = null;
  let result = null;

  try {
    result = await query(sql);
  } catch (e) {
    error = e.message;
  } finally {
    return { error, result };
  }
};

const readWorkshopsCities = async () => {
  const sql = `
        SELECT DISTINCT city
        FROM dancer_workshop
        ORDER BY city ASC
    `;

  let error = null;
  let result = null;

  try {
    result = await query(sql);
  } catch (e) {
    error = e.message;
  } finally {
    return { error, result };
  }
};

// Fonction pour récupérer un seul atelier de danse en fonction de son ID
const readOneDancerWorkshop = async (id) => {
  const sql = `
        SELECT title, dancer_workshop.description, date, hour, duration, city, price, required_dance_level, person_max, name, dancer_workshop.category_workshop_id
        FROM dancer_workshop
        INNER JOIN category_workshop ON dancer_workshop.category_workshop_id = category_workshop.category_workshop_id
        WHERE dancer_workshop_id = ?
    `;

  let error = null;
  let result = null;

  try {
    result = await query(sql, [id]);
  } catch (e) {
    error = e.message;
  } finally {
    return { error, result };
  }
};

// Fonction pour mettre à jour un atelier de danse en fonction de son ID
const updateDancerWorkshop = async (
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
) => {
  const sql = `
       UPDATE dancer_workshop
SET title = ?, 
    description = ?, 
    date = ?, 
    hour = ?, 
    duration = ?, 
    city = ?, 
    price = ?, 
    required_dance_level = ?, 
    person_max = ?, 
    category_workshop_id = ?
WHERE dancer_workshop_id = ?;
    `;

  let error = null;
  let result = null;

  try {
    console.log("Executing SQL query:", sql); // Log the SQL query being executed
    result = await query(sql, [
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
      dancer_workshop_id,
    ]);
    console.log("Query result:", result); // Log the result of the query
  } catch (e) {
    error = e.message;
    console.error("Error executing SQL query:", error); // Log any errors that occur
  } finally {
    return { error, result };
  }
};
// Fonction pour supprimer un atelier de danse en fonction de son ID
const deleteOneDancerWorkshop = async (dancerWorkshopId) => {
  const sql = `
        DELETE FROM dancer_workshop
        WHERE dancer_workshop_id = ?
    `;

  let error = null;
  let result = null;

  try {
    result = await query(sql, [dancerWorkshopId]);
  } catch (e) {
    error = e.message;
  } finally {
    return { error, result };
  }
};

// Exportation des fonctions dans dancer.workshop.controller
export const DancerWorkshopDB = {
  createDancerWorkshop,
  readDancerWorkshops,
  readOneDancerWorkshop,
  updateDancerWorkshop,
  deleteOneDancerWorkshop,
  readWorkshopsCities,
  readWorkshopsDates,
  readThreeWorkshops,
};
