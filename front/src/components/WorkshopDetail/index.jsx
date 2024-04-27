import convertDate from "../../utils/convertDate";
import "./workshopDetail.scss";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";


const WorkshopDetail = ({ workshop }) => {
    const { title, city, hour, date, dancer_workshop_id } = workshop;

    const extractedDate = convertDate(date);
    const { day, month, year } = extractedDate;

    return (
        <div className="workshopCard">
            <div className="cardHeader">
                <h3>{title}</h3>
            </div>
            <div className="cardBody">
                <p>{" à " + city}</p>
                <p>{" à " + hour + " le " + day + "/" + month + "/" + year}</p>
            </div>
            <div className="cardFooter">
                <Link to={`/workshop/${dancer_workshop_id}`}><button className="button">Plus de détails</button></Link>
            </div>
        </div>

    )
};

WorkshopDetail.propTypes = {
    workshop: PropTypes.object.isRequired,
};

export default WorkshopDetail;

