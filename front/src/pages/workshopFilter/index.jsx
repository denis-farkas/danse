import { useState, useEffect } from "react";
import convertDate from "../../utils/convertDate";
import WorkshopDetail from "../../components/WorkshopDetail";
import "./workshopFilter.scss";
import useWorkshops from "../../hooks/useWorkshops";

const WorkshopFilter = () => {
  const { workshops, uniqueDates, uniqueCities } = useWorkshops();
  const [dateFilter, setDateFilter] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [filteredWorkshops, setFilteredWorkshops] = useState([]);

  // Appliquer les filtres
  useEffect(() => {
    if (workshops) {
      let filteredByDate = workshops;
      if (dateFilter) {
        filteredByDate = workshops.filter(
          (workshop) => workshop.date <= dateFilter
        );
      }
      let filteredByCity = filteredByDate;
      if (cityFilter) {
        filteredByCity = filteredByDate.filter(
          (workshop) => workshop.city === cityFilter
        );
      }

      setFilteredWorkshops(filteredByCity);
    }
  }, [dateFilter, cityFilter]);

  return (
    <>
      <div className="main">
        <div className="cardsFilter">
          <div className="card cardFilter">
            <label className="inputLabel" htmlFor="dateFilter">
              Sélectionner une date
            </label>
            <select
              className="inputSelect"
              id="dateFilter"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            >
              <option value="">Dates</option>
              {uniqueDates.map((date) => {
                const formattedDate = convertDate(date);
                return (
                  <option key={date} value={date}>
                    {`${formattedDate.day}/${formattedDate.month}/${formattedDate.year}`}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="card cardFilter">
            <label className="inputLabel" htmlFor="cityFilter">
              Sélectionner une ville
            </label>
            <select
              className="inputSelect"
              id="cityFilter"
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
            >
              <option value="">Ville</option>
              {uniqueCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="listWorkshop" aria-live="polite">
          {" "}
          {/*indique à un lecteur d'écran que les mises à jour du contenu dynamique sur la page sont importantes, mais qu'elles ne nécessitent pas une interruption immédiate de ce que l'utilisateur est en train de faire*/}
          {filteredWorkshops && filteredWorkshops.length > 0 ? (
            filteredWorkshops.map((item) => (
              <WorkshopDetail
                className="workshopCard"
                key={item.dancer_workshop_id}
                workshop={item}
                aria-label="Détail de l'atelier"
              />
            ))
          ) : (
            <p>Workshops loading...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default WorkshopFilter;
