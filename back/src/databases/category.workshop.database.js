// Import du module pour exécuter les requêtes SQL
import query from "./init.database.js";

// Fonction pour créer une nouvelle catégorie de workshop
const createCategoryWorkshop = async (name, description) => {
    const sql = `
        INSERT INTO category_workshop (name, description)
        VALUES (?, ?)
    `;

    let error = null;
    let result = null;

    try {
        result = await query(sql, [name, description]);
    } catch (e) {
        error = e.message;
    } finally {
        return { error, result };
    }
};

// Fonction pour récupérer toutes les catégories de workshops
const readCategoryWorkshops = async () => {
    const sql = `
        SELECT category_workshop_id, name, CONCAT(LEFT(description, 100), "...") AS description
        FROM category_workshop
        ORDER BY category_workshop_id DESC
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

// Fonction pour récupérer une seule catégorie de workshop en fonction de son ID
const readOneCategoryWorkshop = async (categoryWorkshopId) => {
    const sql = `
        SELECT name, description
        FROM category_workshop
        WHERE category_workshop_id = ?
    `;

    let error = null;
    let result = null;

    try {
        result = await query(sql, [categoryWorkshopId]);
    } catch (e) {
        error = e.message;
    } finally {
        return { error, result };
    }
};


// Fonction pour mettre à jour une catégorie de workshop en fonction de son ID
const updateCategoryWorkshop = async (name, description, categoryWorkshopId) => {
    const sql = `
        UPDATE category_workshop
        SET name = ?, description = ?
        WHERE category_workshop_id = ?
    `;

    let error = null;
    let result = null;

    try {
        result = await query(sql, [name, description, categoryWorkshopId]);
    } catch (e) {
        error = e.message;
    } finally {
        return { error, result };
    }
};

// Fonction pour supprimer une catégorie de workshop en fonction de son ID
const deleteOneCategoryWorkshop = async (categoryWorkshopId) => {
    const sql = `
        DELETE FROM category_workshop
        WHERE category_workshop_id = ?
    `;

    let error = null;
    let result = null;

    try {
        result = await query(sql, [categoryWorkshopId]);
    } catch (e) {
        error = e.message;
    } finally {
        return { error, result };
    }
};


// Exportation des fonctions dans category.workshop.controller
export const CategoryWorkshopDB = {
    createCategoryWorkshop,
    readCategoryWorkshops,
    readOneCategoryWorkshop,
    updateCategoryWorkshop,
    deleteOneCategoryWorkshop
};
