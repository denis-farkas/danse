import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from "react-toastify";
import useWorkshops from '../../hooks/useWorkshops';
import "./formWorkshop.scss";

const FormWorkshop = () => {
    //const { title, description, date, hour, duration, city, price, requiredDanceLevel, personMax } = req.body;

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [hour, setHour] = useState("");
    const [duration, setDuration] = useState("");
    const [city, setCity] = useState("");
    const [price, setPrice] = useState("");
    const [requiredDanceLevel, setRequiredDanceLevel] = useState("");
    const [personMax, setPersonMax] = useState("");
    const [category_workshop_id, setCategory] = useState("");
    const [listCategory, setListcategory] = useState("");

    const { fetchWorkshops } = useWorkshops();

    let navigate = useNavigate();

    useEffect(() => {
        let data;

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:3000/category_workshop/read',
            headers: {
                'Content-Type': 'application/json',
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                setListcategory(response.data.categoryWorkshops);
                //console.log(listCategory);

            })
            .catch((error) => {
                console.log(error);
            });

    }, [listCategory])


    const handleSubmit = (e) => {
        e.preventDefault();

        let data = { title, description, date, hour, duration, city, price, requiredDanceLevel, personMax, category_workshop_id }
        data = JSON.stringify(data);
        let user = JSON.parse(localStorage.getItem("user"));
        const token = user.token;

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:3000/dancer_workshop/create',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                if (response.status === 201) {
                    console.log("Response succeeded!");
                    fetchWorkshops();
                    setTitle("");
                    setDescription("");
                    setDate("");
                    setHour("");
                    setDuration("");
                    setCity("");
                    setPrice("");
                    setRequiredDanceLevel("");
                    setPersonMax("");
                    setCategory("");
                    toast.success("Stage/atelier crée");
                    setTimeout(() => {
                        navigate("/");
                    }, 3000);
                }
            })
            .catch((error) => {
                const errorMessage = error.response?.data?.message || 'An error occurred';
                toast.error(errorMessage);
            }
            )
    }
    return (

        <div className="main">
            <h2>Formulaire de création de stage ou d&apos;atelier</h2>

            <form className="formGroup" onSubmit={handleSubmit}>
                <div className="inputGroup">
                    <label className="inputLabel" id="title" htmlFor="title">Titre du stage ou de l&apos;atelier</label>
                    <input
                        aria-label="Titre de l'atelier"
                        className="inputField"
                        type="text"
                        name="title"
                        placeholder="Précisez s'il s'agit d'un stage ou un atelier"
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                        required="required"
                    />
                </div>
                <div className="inputGroup">
                    <label className="inputLabel" htmlFor="workshopSelect">Sélectionner une catégorie de danse</label>
                    <select
                        aria-label="Sélectionner une catégorie de danse"
                        className="inputSelect"
                        id="workshopSelect"
                        onChange={(e) => {
                            setCategory(e.target.value);
                        }}>
                        {listCategory && listCategory.length > 0 ? (
                            <> <option value="0">Sélectionner une catégorie</option>
                                {listCategory.map(category => (
                                    <option key={category.category_workshop_id} value={category.category_workshop_id}>
                                        {category.name}
                                    </option>
                                ))}
                            </>
                        ) : (
                            <option value="">Aucune catégorie disponible</option>
                        )}
                    </select>
                </div>
                <div className="inputGroup">
                    <label className="inputLabel" id="description" htmlFor="description">Description du stage ou de l&apos;atelier</label>
                    <textarea
                        aria-label="Description de l'atelier"
                        className="inputTextarea"
                        type="text"
                        name="description"
                        placeholder="Décrivez brièvement le contenu du stage ou de l'atelier"
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}
                        required="required"
                    />
                </div>
                <div className="inputGroup">
                    <label className="inputLabel" id="date" htmlFor="date">Date</label>
                    <input
                        aria-label="Date de l'atelier"
                        className="inputField"
                        type="date"
                        name="date"
                        placeholder="Entrez la date"
                        onChange={(e) => {
                            setDate(e.target.value);
                        }}
                        required="required"
                    />
                </div>
                <div className="inputGroup">
                    <label className="inputLabel" id="hour" htmlFor="hour">Heure du stage ou de l&apos;atelier</label>
                    <input
                        aria-label="Heure de l'atelier"
                        className="inputField"
                        type="time"
                        name="hour"
                        placeholder="Entrer l'heure du stage ou de l'atelier"
                        onChange={(e) => {
                            setHour(e.target.value);
                        }}
                        required="required"
                    />
                </div>
                <div className="inputGroup">
                    <label className="inputLabel" id="duration" htmlFor="duration">Durée du stage ou de l&apos;atelier</label>
                    <input
                        aria-label="Durée de l'atelier"
                        className="inputField"
                        type="number"
                        name="duration"
                        placeholder="Indiquez la durée du stage ou de l'atelier"
                        onChange={(e) => {
                            setDuration(e.target.value);
                        }}
                        required="required"
                    />
                </div>
                <div className="inputGroup">
                    <label className="inputLabel" id="city" htmlFor="city">Ville</label>
                    <input
                        aria-label="Lieu de l'atelier"
                        className="inputField"
                        type="text"
                        name="city"
                        placeholder="Indiquez le lieu du stage ou de l'atelier"
                        onChange={(e) => {
                            setCity(e.target.value);
                        }}
                        required="required"
                    />
                </div>
                <div className="inputGroup">
                    <label className="inputLabel" id="price" htmlFor="price">Prix</label>
                    <input
                        aria-label="Prix de l'atelier"
                        className="inputField"
                        type="number"
                        step="any"
                        name="price"
                        placeholder="Indiquez le coût du stage ou de l'atelier"
                        onChange={(e) => {
                            setPrice(e.target.value);
                        }}
                        required="required"
                    />
                </div>
                <div className="inputGroup">
                    <label className="inputLabel" id="requiredDanceLevel" htmlFor="requiredDanceLevel">Niveau de danse</label>
                    <select
                        aria-label="Niveau de danse demandé pour l'atelier"
                        className="inputSelect"
                        type="text"
                        name="requiredDanceLevel"
                        onChange={(e) => {
                            setRequiredDanceLevel(e.target.value);
                        }}
                        required>
                        <option value="defaultValue">Choisissez un niveau</option>
                        <option value="débutant">Débutant</option>
                        <option value="intermédiaire">Intermédiaire</option>
                        <option value="avancé">Avancé</option>
                    </select>
                </div>
                <div className="inputGroup">
                    <label className="inputLabel" id="personMax" htmlFor="personMax">Nombre de personnes maximum</label>
                    <input
                        aria-label="Nombre de personnes maximum pour l'atelier"
                        className="inputField"
                        type="number"
                        name="text"
                        placeholder="Indiquez le nombre maximum de participants au stage ou à l'atelier"
                        onChange={(e) => {
                            setPersonMax(e.target.value);
                        }}
                        required="required"
                    />
                </div>
                <div className="inputGroup">
                    <input className="submitButton" type="submit" aria-label="Soumettre le formulaire" />
                </div>
            </form>
        </div>
    )
}

export default FormWorkshop;