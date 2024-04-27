import { useState, useEffect, createContext } from "react";
import axios from "axios";

const WorkshopsContext = createContext();

const WorkshopsProvider = ({ children }) => {
  const [workshops, setWorkshops] = useState([]);
  const [threeWorkshops, setThreeWorkshops] = useState([]);
  const [uniqueDates, setUniqueDates] = useState([]);
  const [uniqueCities, setUniqueCities] = useState([]);

  const fetchWorkshops = async () => {
    try {
      // Fetch workshops
      const workshopsResponse = await axios.get(
        "http://localhost:3000/dancer_workshop/read"
      );
      setWorkshops(workshopsResponse.data.dancerWorkshops);
      const threeResponse = await axios.get(
        "http://localhost:3000/dancer_workshop/readThree"
      );
      setThreeWorkshops(threeResponse.data.dancerWorkshops);
      // Fetch dates
      const datesResponse = await axios.get(
        "http://localhost:3000/dancer_workshop/readDates"
      );
      // Assuming dates are stored in response.data.dates
      setUniqueDates(datesResponse.data.dates);

      // Fetch cities
      const citiesResponse = await axios.get(
        "http://localhost:3000/dancer_workshop/readCities"
      );
      // Assuming cities are stored in response.data.cities
      setUniqueCities(citiesResponse.data.cities);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchWorkshops();
  }, []);

  return (
    <WorkshopsContext.Provider
      value={{
        threeWorkshops,
        workshops,
        uniqueDates,
        uniqueCities,
        fetchWorkshops,
      }}
    >
      {children}
    </WorkshopsContext.Provider>
  );
};

export { WorkshopsProvider, WorkshopsContext };
