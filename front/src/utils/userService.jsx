import { BehaviorSubject } from "rxjs";

// Création d'un sujet observable (BehaviorSubject) pour suivre l'état de l'utilisateur
const userSubject = new BehaviorSubject(
  typeof window !== "undefined" && JSON.parse(localStorage.getItem("user"))
);

// Fonction pour mettre à jour le userSubject avec les informations de l'utilisateur et pour stocker l'utilisateur dans le localStorage
function login(user) {
  userSubject.next(user);
  // Convertion d'une variable javascript en string JSON
  localStorage.setItem("user", JSON.stringify(user));
}

// Variable pour stocker la fonction de navigation
let navigateFunction;

// Fonction pour définir la fonction de navigation
function setNavigate(navigate) {
  navigateFunction = navigate;
}

// Fonction de déconnexion de l'utilisateur
function logout() {
  localStorage.removeItem("user"); // retrait du user du localStorage
  userSubject.next(null); // le sujet observable redevient null
  navigateFunction("/"); // redirection vers la page de connexion
}

function update() {
  localStorage.removeItem("user"); // retrait du user du localStorage
  userSubject.next(null); // le sujet observable redevient null
}

// Export d'un objet contenant les méthodes et propriétés du service utilisateur
export const userService = {
  // Propriété d'accès pour obtenir la valeur actuelle de l'utilisateur.
  user: userSubject.asObservable(),
  // Méthode pour interagir avec l api et obtenir la valeur actuelle de l'utilisateur
  get userValue() {
    return userSubject.value;
  },
  login,
  logout,
  setNavigate,
  update,
};
