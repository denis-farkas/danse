import "./home.scss";
import Gallery from "../../components/Gallery";
import SearchCreateWorkshop from "../../components/SearchCreateWorkshop";
import ListingWorkshop from "../../components/ListingWorkshop";


const Home = () => {
    return (
        <div className="main">
            <Gallery />
            <SearchCreateWorkshop />
            <ListingWorkshop />
        </div>
    );
}

export default Home;