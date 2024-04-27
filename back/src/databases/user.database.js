import query from "./init.database.js";

// Fonction pour vérifier l'existence d'un email dans la base de données
const emailExist = async (email) => {
    const sql = ` SELECT COUNT(*) as count from users where email= ?`;
    let result = await query(sql, [email]);

    result = result[0].count;

    return { result };
};

// Fonction pour créer un nouvel utilisateur dans la base de données
const signUp = async (firstName, lastName, birthday, address, postCode, city, phoneNumber, danceLevel, email, hashedPassword, role) => {
    const sql = `
   INSERT INTO users (first_name, last_name, birthday, address, postcode, city, phone_number, dance_level, email, password, role) 
   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )`;

    let error = null;
    let result = null;

    try {
        // Exécution de la requête SQL pour créer un nouvel utilisateur
        result = await query(sql, [firstName, lastName, birthday, address, postCode, city, phoneNumber, danceLevel, email, hashedPassword, role]);
    }
    catch (e) {
        // Capture de l'erreur en cas d'échec de l'exécution de la requête
        error = e.message;
    }
    finally {
        // Retour d'un objet contenant l'erreur (le cas échéant) et le résultat de la requête
        return { error, result };
    }
};

// Fonction asynchrone pour lire les informations de certains champs des utilisateurs depuis la base de données
const read = async () => {
    // Requête SQL pour sélectionner les champs spécifiés de la table "users"
    const sql = `
        SELECT user_id, first_name, last_name, dance_level, email
        FROM users
        ORDER BY last_name DESC
    `;

    // Initialisation des variables d'erreur et de résultat
    let error = null;
    let result = null;

    try {
        // Exécution de la requête SQL pour récupérer les informations de tous les utilisateurs
        result = await query(sql);
    } catch (e) {
        // Capture de l'erreur en cas d'échec de l'exécution de la requête
        error = e.message;
    } finally {
        // Retour d'un objet contenant l'erreur (le cas échéant) et le résultat de la requête
        return { error, result };
    }
};


// Requête pour sélectionner les informations personnelles du compte de l'utilisateur à afficher lorsqu'il est connecté
const readOneUser = async (id) => {
    const sql = `
        SELECT first_name, last_name, birthday, address, postcode, city, phone_number, dance_level, email
        FROM users
        WHERE user_id = ?
    `;

    let error = null;
    let result = null;

    try {
        // Exécution de la requête SQL pour récupérer les informations d'un utilisateur
        result = await query(sql, [id]);
    } catch (e) {
        // Capture de l'erreur en cas d'échec de l'exécution de la requête
        error = e.message;
    } finally {
        // Retour d'un objet contenant l'erreur (le cas échéant) et le résultat de la requête
        return { error, result };
    }
};

// Requête pour récupérer les informations d'authentification d'un utilisateur lors de la connexion
const signIn = async (email) => {
    const sql = `
  SELECT user_id, email, password, role
  FROM users
  WHERE email = ?`;

    let error = null;
    let result = null;

    try {
        // Exécution de la requête SQL pour récupérer les informations d'authentification
        result = await query(sql, [email]);
    }
    catch (e) {
        // Capture de l'erreur en cas d'échec de l'exécution de la requête
        error = e.message;
    }
    finally {
        // Retour d'un objet contenant l'erreur (le cas échéant) et le résultat de la requête
        return { error, result };
    }
};
const updateUser = async (
    address,
    postCode,
    city,
    phoneNumber,
    danceLevel,
    email,
    hashedPassword,
    userId
) => {
    const sql = `
     UPDATE users SET address=?, postcode=?, city=?, phone_number=?, dance_level=?, email=?, password=? 
     WHERE user_id=?`;

    let error = null;
    let result = null;

    try {
        // Exécution de la requête SQL pour créer un nouvel utilisateur
        result = await query(sql, [
            address,
            postCode,
            city,
            phoneNumber,
            danceLevel,
            email,
            hashedPassword,
            userId,
        ]);
    } catch (e) {
        // Capture de l'erreur en cas d'échec de l'exécution de la requête
        error = e.message;
    } finally {
        // Retour d'un objet contenant l'erreur (le cas échéant) et le résultat de la requête
        return { error, result };
    }
};
// Requête pour enregistrer un utilisateur à un atelier de danse
const signUpWorkshop = async (userId, workshopId) => {
    const sql = `INSERT INTO user_dancer_workshop (user_id, dancer_workshop_id) VALUES (?,?)`;
    let error = null;
    let result = null;

    try {
        // Exécution de la requête SQL pour enregistrer un utilisateur à un atelier de danse
        result = await query(sql, [userId, workshopId]);
    }
    catch (e) {
        // Capture de l'erreur en cas d'échec de l'exécution de la requête
        error = e.message;
    }
    finally {
        // Retour d'un objet contenant l'erreur (le cas échéant) et le résultat de la requête
        return { error, result };
    }
}

// Requête pour vérifier si un utilisateur est déjà enregistré à un atelier de danse
const isRegistered = async (userId, workshopId) => {
    const sql = `SELECT COUNT(*) AS count FROM user_dancer_workshop WHERE user_id=? AND dancer_workshop_id=?`;

    let result = await query(sql, [userId, workshopId]);
    result = result[0].count;

    return { result };
}

// Requête pour récupérer les informations des ateliers auxquels un utilisateur est inscrit
const registeredWorkshop = async (userId) => {
    const sql = `
        SELECT dancer_workshop.dancer_workshop_id, title, description, date, hour, duration, city, price, required_dance_level, person_max, category_workshop_id
        FROM dancer_workshop
        INNER JOIN user_dancer_workshop ON dancer_workshop.dancer_workshop_id = user_dancer_workshop.dancer_workshop_id
        WHERE user_id = ?
        ORDER BY date DESC
    `;

    let error = null;
    let result = null;

    try {
        result = await query(sql, [userId]);
    } catch (e) {
        error = e.message;
    } finally {
        return { error, result };
    }
};


// Exportation des fonctions dans user.controller
export const UserDB = {
    emailExist,
    signUp,
    read,
    readOneUser,
    signIn,
    signUpWorkshop,
    isRegistered,
    registeredWorkshop,
    updateUser
};
