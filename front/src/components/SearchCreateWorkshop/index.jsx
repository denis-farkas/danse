import "./searchCreateWorkshop.scss";
import "../Button";
import { Link } from "react-router-dom";

const Workshop = () => {
    return (
        <div className="cards">
            <div className="card" role="group" aria-label="Proposer un atelier">
                <h2>Je propose un atelier ou un stage ?</h2>

                <Link to={`/formWorkshop`}><button className="button">Proposer</button></Link>
            </div>
            <div className="card" role="group" aria-label="Chercher un atelier">
                <h2>Je cherche un atelier ou un stage ?</h2>

                <Link to={`/workshopFilter`}><button className="button">Rechercher</button></Link>
            </div>
        </div>
    )
}

export default Workshop;