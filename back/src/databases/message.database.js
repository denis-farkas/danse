// Import du module pour exécuter les requêtes SQL
import query from "./init.database.js";

// Fonction pour créer un nouveau message
const createMessage = async (sender, receiver, content) => {
    const sql = `
        INSERT INTO messages (sender, receiver, content)
        VALUES (?, ?, ?)
    `;

    let error = null;
    let result = null;

    try {
        result = await query(sql, [sender, receiver, content]);
    } catch (e) {
        error = e.message;
    } finally {
        return { error, result };
    }
};

// Fonction pour récupérer les 5 premiers messages de la base de données
const readMessages = async () => {
    const sql = `
        SELECT message_id, sender, receiver, CONCAT(LEFT(content, 100), "...") AS content, date
        FROM messages
        ORDER BY date DESC
        LIMIT 10
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

// Fonction pour récupérer un seul message en fonction de son ID
const readOneMessage = async (messageId) => {
    const sql = `
        SELECT sender, receiver, content
        FROM messages
        WHERE message_id = ?
    `;

    let error = null;
    let result = null;

    try {
        result = await query(sql, [messageId]);
    } catch (e) {
        error = e.message;
    } finally {
        return { error, result };
    }
};

// Fonction pour mettre à jour un message en fonction de son ID
const updateMessage = async (sender, receiver, content, messageId) => {
    const sql = `
        UPDATE messages
        SET sender = ?, receiver = ?, content = ?
        WHERE message_id = ?
    `;

    let error = null;
    let result = null;

    try {
        result = await query(sql, [sender, receiver, content, messageId]);
    } catch (e) {
        error = e.message;
    } finally {
        return { error, result };
    }
};

// Fonction pour supprimer un message en fonction de son ID
const deleteOneMessage = async (messageId) => {
    const sql = `
        DELETE FROM messages
        WHERE message_id = ?
    `;

    let error = null;
    let result = null;

    try {
        result = await query(sql, [messageId]);
    } catch (e) {
        error = e.message;
    } finally {
        return { error, result };
    }
};


// Exportation des fonctions dans message.controller
export const MessageDB = {
    createMessage,
    readMessages,
    readOneMessage,
    updateMessage,
    deleteOneMessage
};
