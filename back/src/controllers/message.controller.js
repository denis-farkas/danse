import { MessageDB } from "../databases/message.database.js";

// Fonction pour créer un message
const createMessage = async (req, res) => {
    // Extraction des données de la requête
    const { sender, receiver, content, date } = req.body;

    // Appel à la fonction de la base de données pour créer un message
    const response = await MessageDB.createMessage(sender, receiver, content, date);
    const result = response.result;

    // Retour d'une réponse avec le statut 201 (Créé) et les données du message créé
    return res.status(201).json({ message: "OK", messages: result });
};

// Fonction pour récupérer tous les messages
const readMessages = async (req, res) => {
    // Appel à la fonction de la base de données pour récupérer tous les messages
    const messageResponse = await MessageDB.readMessages();
    const messages = messageResponse.result;

    // Retour d'une réponse avec le statut 200 (OK) et les données des messages
    return res.status(200).json({ message: "OK", messages });
};

// Fonction pour récupérer un message spécifique par son identifiant
const readOneMessage = async (req, res) => {
    // Extraction de l'identifiant du message à partir des paramètres de la requête
    const messageId = req.params.messageId;

    // Appel à la fonction de la base de données pour récupérer un message spécifique par son identifiant
    const response = await MessageDB.readOneMessage(messageId);
    const result = response.result;

    // Création d'un objet représentant le message avec des propriétés spécifiques
    const message = {
        messageId,
        sender: result[0].sender,
        receiver: result[0].receiver,
        content: result[0].content,
        date: result[0].date,
    };

    // Retour d'une réponse avec le statut 200 (OK) et les données du message spécifié
    return res.status(200).json({ message: "Requête OK", message });
};

// Fonction pour modifier un message ???
const updateMessage = async (req, res) => {
    // Extraction des données de la requête
    const { sender, receiver, content, messageId } = req.body;

    // Appel à la fonction de la base de données pour mettre à jour un message
    const response = await MessageDB.updateMessage(sender, receiver, content, messageId);

    // Vérification des erreurs lors de la mise à jour
    if (response.error) {
        // En cas d'erreur, retour d'une réponse avec le statut 500 (Erreur interne du serveur)
        return res.status(500).json({ message: response.error });
    }

    // En cas de succès, retour d'une réponse avec le statut 200 (OK) et un message indiquant la mise à jour réussie
    return res.status(200).json({ message: `Le message numéro ${messageId} a été modifié` });
};

// Fonction pour supprimer un message par son identifiant
const deleteOneMessage = async (req, res) => {
    // Extraction de l'identifiant du message à partir des paramètres de la requête
    const messageId = req.params.messageId;

    // Appel à la fonction de la base de données pour supprimer un message
    const response = await MessageDB.deleteOneMessage(messageId);

    // Récupération d'une éventuelle erreur
    const error = response.error; // soit une chaîne de caractères, soit null

    // Vérification de la présence d'une erreur
    if (error) {
        // En cas d'erreur, retour d'une réponse avec le statut 500 (Erreur interne du serveur)
        return res.status(500).json({ message: error });
    } else {
        // En cas de succès, retour d'une réponse avec le statut 200 (OK) et un message indiquant la suppression réussie
        return res.status(200).json({ message: "Message supprimé" });
    }
};

// Exportation de l'objet contenant toutes les fonctions du contrôleur des messages
export const MessageController = {
    createMessage,
    readMessages,
    readOneMessage,
    updateMessage,
    deleteOneMessage,
};
