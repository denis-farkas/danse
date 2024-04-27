import bcrypt from "bcrypt";
// Le salt permet d'avoir toujours un resultat différent pour un meme mot de passe.
// Plus le nombre de tours est elevé, plus l'opération est longue
// Nombre de tours pour la génération du sel
const saltRounds = 10;

// Fonction pour hacher un mot de passe
export const hashPass = async (pass) => {
    let error = null;
    let hashed = null;

    try {
        // Utilisation de bcrypt pour générer le hash du mot de passe
        hashed = await bcrypt.hash(pass, saltRounds);
    } catch (e) {
        error = e.message;
    } finally {
        // Renvoie du résultat sous forme d'objet { error, hashed }
        return { error, hashed };
    }
};

// Fonction pour comparer un mot de passe haché avec un mot de passe en clair
export const compareHash = async (pass1, pass2) => {
    let error = null;
    let isSame = false;

    try {
        // Utilisation de bcrypt pour comparer les mots de passe
        isSame = await bcrypt.compare(pass1, pass2);
    } catch (e) {
        error = e.message;
    } finally {
        // Renvoie du résultat sous forme d'objet { isSame, error }
        return { isSame, error };
    }
};
// Utilisation de la bibliothèque bcrypt pour le hachage sécurisé des mots de passe.La fonction hashPass prend un mot de passe en clair en entrée, génère un sel, puis renvoie le mot de passe haché et éventuellement une erreur.La fonction compareHash compare deux mots de passe(un en clair et un haché) et renvoie un booléen indiquant s'ils correspondent, ainsi qu'éventuellement une erreur.Ces fonctions sont utiles pour sécuriser les mots de passe stockés dans la base de données et vérifier les mots de passe lors de l'authentification.