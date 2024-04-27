// Fonction pour vérifier si la valeur est une chaîne de caractères
export const isString = (string) => {
    return typeof string === "string";
};

// Fonction pour vérifier si une chaîne de caractères est non vide après suppression des espaces
export const stringIsFilled = (string) => {
    return isString(string) && string.trim().length > 0;
};

// Fonction pour vérifier si toutes les chaînes de caractères d'un tableau sont non vides
export const stringAreFilled = (strings) => {
    let areFilled = true;

    for (let string of strings) {
        const filled = stringIsFilled(string);

        if (!filled) {
            areFilled = false;
        }
    }

    return areFilled;
};


// every applique la fonction stringIsFilled pour chaque element de strings
// si tous les éléments renvois true a la fonction stringIsFilled
// alors l'ensemble du resultat sera true
// const stringAreFilled_ = (strings) => strings.every(stringIsFilled);
