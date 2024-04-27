// Importation des hooks useState et useEffect depuis la bibliothèque React, ainsi que axios pour les requêtes HTTP et le composant WorkshopDetail.
import { useState, useEffect } from 'react';
import axios from 'axios';
import WorkshopDetail from '../../components/WorkshopDetail';
import "./registeredWorkshop.scss"; // Importation du fichier de style CSS pour ce composant.

// Définition du composant RegisteredWorkshop.
const RegisteredWorkshop = () => {
    // Déclaration et initialisation de la variable d'état nommée workshops à l'aide de useState. Elle commence par un tableau vide (null) et fournit un moyen de mettre à jour son contenu ultérieurement à l'aide de la setWorkshops fonction.
    const [workshops, setWorkshops] = useState(null);
    // Récupération des données de l'utilisateur depuis le stockage local (localStorage).
    let user = JSON.parse(localStorage.getItem("user"));
    const userId = user.userId;

    // Utilisation de useEffect pour effectuer des actions après le rendu initial du composant.
    useEffect(() => {
        // Déclaration de variables pour la requête HTTP.
        let data;

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://localhost:3000/users/registeredWorkshop?userId=${userId}`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        // Utilisation d'axios pour effectuer la requête HTTP.
        axios.request(config)
            .then((response) => {
                console.log(response);
                // Mise à jour de la variable d'état workshops avec les données reçues de la requête.
                setWorkshops(response.data.workshop);
            })
            .catch((error) => {
                console.log(error);
            });

    }, []); // Le tableau vide en tant que dépendance signifie que cet effet ne s'exécute qu'une seule fois après le montage du composant.



    // Affichage des ateliers à l'aide de la méthode .map pour parcourir chaque élément du tableau workshops.
    return (
        <div className="main">

            <h2>Mes inscriptions</h2>

            {workshops &&
                workshops.map((item) => (
                    // Renvoie un élément JSX représentant le composant WorkshopDetail.
                    <WorkshopDetail
                        className="workshopCard"
                        key={item.dancer_workshop_id}
                        workshop={item}
                        aria-label="Détail de l'atelier"
                    />
                ))}
        </div>
    )
}


export default RegisteredWorkshop;
