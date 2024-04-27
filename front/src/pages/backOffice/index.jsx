import { Link } from "react-router-dom";
import "./backOffice.scss";

const BackOffice = () => {
    return (
        <div className="main">
            <div className="jumbotron">
                <Link to={"/backUser"} aria-label="Accéder à la gestion des membres">
                    <button className="button back">Gestion des membres</button>
                </Link>

                <Link to={"/backCategory"} aria-label="Accéder à la gestion des catégories">
                    <button className="button back">Gestion des catégories</button>
                </Link>

                <Link to={"/backWorkshop"} aria-label="Accéder à la gestion des ateliers">
                    <button className="button back">Gestion des ateliers</button>
                </Link>

                <Link to={"/backMessage"} aria-label="Accéder à la gestion des messages">
                    <button className="button back">Gestion des messages</button>
                </Link>
            </div>
        </div>
    );
};

export default BackOffice;
