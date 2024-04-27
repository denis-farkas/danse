import { useContext } from "react";
import { WorkshopsContext } from "../context/WorkshopsProvider";

const useWorkshops = () => {
  return useContext(WorkshopsContext);
};

export default useWorkshops;
