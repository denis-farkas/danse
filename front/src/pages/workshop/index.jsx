import { useParams } from "react-router-dom";
import convertDate from "../../utils/convertDate";
import { useState, useEffect } from "react";
import axios from "axios";
import "./workshop.scss";

const Workshop = () => {
    const { dancer_workshop_id } = useParams();
    const [userId, setUserId] = useState(null);
    const [workshop, setWorkshop] = useState(null);
    const [isRegistered, setIsRegistered] = useState(false);
    const formattedDate = workshop ? convertDate(workshop.date) : null;

    useEffect(() => {
        const actualUser = JSON.parse(localStorage.getItem("user"));
        if (actualUser && actualUser !== undefined) {
            setUserId(actualUser.userId);
            console.log(actualUser);
        }

    }, []);

    useEffect(() => {
        axios
            .get(
                `http://localhost:3000/dancer_workshop/readOne?id=${dancer_workshop_id}`
            )
            .then((response) => {
                setWorkshop(response.data.dancerWorkshop);
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [dancer_workshop_id]);

    useEffect(() => {
        if (userId && dancer_workshop_id) {
            axios
                .post(
                    `http://localhost:3000/users/isRegistered?userId=${userId}&workshopId=${dancer_workshop_id}`
                )
                .then((response) => {
                    console.log(response);
                    setIsRegistered(response.data.isRegistered); // Assuming your response contains a field indicating registration status
                })
                .catch((error) => {
                    console.log(error);
                    setIsRegistered(true); // Assuming you want to set isRegistered to true by default in case of an error
                });
        }
    }, [userId, dancer_workshop_id]);

    const handleRegister = () => {
        axios
            .post(
                `http://localhost:3000/users/sign-up-workshop?userId=${userId}&workshopId=${dancer_workshop_id}`
            )
            .then((response) => {
                console.log(response);
                setIsRegistered(true);
            })
            .catch((error) => {
                console.log(error);
            });
    };


    return (
        <div className="main">
            <div className="workshopCard workshopCardRow" aria-label="Détails de l'atelier">
                {workshop ? (
                    <>
                        <div className="cardTitle">
                            <h2>{workshop.title}</h2>
                        </div>
                        <div className="cardDescribe">
                            <div className="cardText">
                                <h3 aria-label="Description de l'atelier">Description</h3>
                                <p>{workshop.description}</p>
                            </div>
                            <div className="cardInfos">
                                <h3 aria-label="Date de l'atelier">Date</h3>
                                <p>{formattedDate ? `${formattedDate.day}/${formattedDate.month}/${formattedDate.year}` : 'Invalid Date'}</p>
                                <h3 aria-label="Heure de l'atelier">Heure</h3>
                                <p>{workshop.hour}</p>
                                <h3 aria-label="Durée de l'atelier">Durée</h3>
                                <p>{workshop.duration}</p>
                                <h3 aria-label="Ville de l'atelier">Ville</h3>
                                <p>{workshop.city}</p>
                                <h3 aria-label="Prix de l'atelier">Prix</h3>
                                <p>{workshop.price}</p>
                                <h3 aria-label="Niveau de danse">Niveau de danse</h3>
                                <p>{workshop.requiredDanceLevel}</p>
                                <h3 aria-label="Nombre de personnes maximum">Nombre de personnes maximum</h3>
                                <p>{workshop.personMax}</p>
                            </div>
                        </div>
                    </>
                ) : (
                    <p>Loading workshop details...</p>
                )}
                {userId && userId > 0 && !isRegistered && (
                    <button className="button" onClick={handleRegister} aria-label="Inscrivez-vous à cet atelier">
                        Inscrivez-vous
                    </button>
                )}
                {userId && userId > 0 && isRegistered && (
                    <button className="button" aria-label="Vous êtes déjà inscrit(e)">Vous êtes déjà inscrit(e)</button>
                )}
            </div>
        </div >
    );
};

export default Workshop;