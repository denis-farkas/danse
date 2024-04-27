import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./backCategory.scss";

const BackCategory = () => {
    const [categories, setCategories] = useState(null);
    useEffect(() => {
        let data;

        let config = {
            method: "get",
            maxBodyLength: Infinity,
            url: "http://localhost:3000/category_workshop/read",
            headers: {
                "Content-Type": "application/json",
            },
            data: data,
        };

        axios
            .request(config)
            .then((response) => {
                setCategories(response.data.categoryWorkshops);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div className="main" >
            <table className="table">
                <thead>
                    <tr>
                        <th style={{ width: "5%" }} aria-label="Identifiant de l'utilisateur">Id</th>
                        <th style={{ width: "15%" }} aria-label="Nom de l'utilisateur">Nom</th>
                        <th style={{ width: "50%" }} aria-label="Description de l'utilisateur">Description</th>
                        <th style={{ width: "30%" }} aria-label="Actions">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories &&
                        categories.map((category) => (
                            <tr key={category.category_workshop_id}>
                                <td>{category.category_workshop_id}</td>
                                <td>{category.name}</td>
                                <td>{category.description}</td>
                                <td>
                                    <Link to={`/editCategory/${category.category_workshop_id}`} className="submitButton" aria-label="Editer la catégorie">
                                        Editer
                                    </Link>
                                </td>
                            </tr>
                        ))}

                    {categories && !categories.length && (
                        <tr>
                            <td>
                                <p>Pas de catégorie à afficher</p>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table >
        </div >
    );
};

export default BackCategory;