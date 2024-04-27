import useWorkshops from "../../hooks/useWorkshops";
import WorkshopDetail from "../WorkshopDetail";
import "./listingWorkshop.scss";

const ListingWorkshop = () => {
    const { threeWorkshops } = useWorkshops();

    //Utilisation de la méthode .map pour parcourir chaque élément(item) du tableau workshops
    return (
        <div className="listWorkshop">
            {threeWorkshops &&
                threeWorkshops.map((item) => (
                    //Renvoie un élément JSX soit le composant nommé Workshop_detail
                    <WorkshopDetail
                        key={item.dancer_workshop_id}
                        workshop={item}
                        aria-label={`Détails de l'atelier ${item.dancer_workshop_id}`}
                    />
                    // key={item.dancer_workshop_id} :attribution d'un key accessoire unique au composant Workshop_detail
                    // workshop={item} :  Cela transmet le courant item(données d'atelier) comme accessoire au Workshop_detailcomposant
                ))}
        </div>
    )
}

export default ListingWorkshop;

