import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import './header.css';
import { FaBars } from "react-icons/fa";
import Sign_out from "../Sign_out";

const Header = () => {
    // État pour gérer l'ouverture et la fermeture du menu
    const [isMenuOpen, setMenuOpen] = useState(false);

    // État pour indiquer si l'utilisateur est connecté
    const [connected, setConnected] = useState(false);

    //
    const [role, setRole] = useState("");

    // Fonction pour basculer l'état du menu
    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    // Fonction pour vérifier si l'utilisateur est authentifié
    function isUserAuthenticated() {
        const token = localStorage.getItem('token') !== null;
        setConnected(token);

        const role = localStorage.getItem('role');
        setRole(role);

        if (token && role) {
            setConnected(true);
            setRole(role);
        } else {
            setConnected(false);
            setRole("");
        }
    }

    // UseEffect pour vérifier l'authentification une fois au chargement du composant
    useEffect(() => { isUserAuthenticated() }, [])

    return (
        <div className="nav">
            <div>
                <h1>Instant Danse</h1>
            </div>
            {/* Section de la barre de navigation */}
            <div className={`navbar ${isMenuOpen ? 'active' : ''}`}>
                {/* Icône du menu (barres) qui active/désactive le menu */}
                <div className="menu-icon" onClick={toggleMenu}><FaBars /></div>
                {/* Liste des liens de navigation vers les différentes pages */}
                <nav>
                    <NavLink exact to={"/"} className="active">Accueil</NavLink>
                    <NavLink to={"/ateliers"} className="active">Ateliers</NavLink>
                    <NavLink to={"/inscriptions"} className="active">Mes inscriptions</NavLink>
                    <NavLink to={"/messages"} className="active">Messages</NavLink>
                    <NavLink to={"/account"} className="active">Mon compte</NavLink>
                    {/* Condition affichant le bouton en fonction de l'état d'authentification */}
                    {connected && connected === true ? (
                        <Sign_out />
                    ) : (
                        <>
                            <NavLink to={"/sign_in"} className="active">Connexion</NavLink>
                            <NavLink to={"/sign_up"} className="active">Inscription</NavLink>
                        </>
                    )}
                    {/* Condition affichant le lien "Espace Admin" à la connexion si le user est administrateur */}
                    {role === "admin" && <NavLink to={"/backOffice"} className="active">Espace Admin</NavLink>}
                </nav>
            </div>
        </div>
    );
}

export default Header;
