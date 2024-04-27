import { Link } from 'react-router-dom';
import './footer.scss';
import Mailto from '../Mailto';

const Footer = () => {
    return (
        <div className="footer">
            <h1>Contactez-nous</h1>
            <div className="contact">
                <Mailto className="email" label="Email: instantdanse@hotmail.fr" mailto="mailto:instantdanse@hotmail.fr" aria-label="Envoyer un email à Instant Danse" />
                <Link className="phone" to="tel:0557432658" aria-label="Appeler Instant Danse au 0557432658">Tél : 0557432658</Link>
            </div>
            <div className="privacy-terms">
                <Link to="/privacy" className="privacy" aria-label="Consulter la politique de confidentialité d'Instant Danse">
                    Politique de confidentialité -
                </Link>
                <Link to="/terms" className="terms" aria-label="Consulter les conditions d'utilisation d'Instant Danse">
                    Conditions d&apos;utilisation
                </Link>
            </div>
            <p>&copy; 2024 Instant Danse. Tous droits réservés.</p>
        </div>


    );
}

export default Footer;
