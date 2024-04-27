import Slideshow from "../Slideshow";
import "./gallery.scss";

const Gallery = () => {
    return (
        <>
            <div className="dancers" role="group" aria-label="Images de danseurs">
                <source srcSet="img\img1.webp" type="image/webp" alt="Quatres femmes qui danse dans un studio de danse" title="4 femmes qui danse dans un studio de danse" />
                <img src="img\img1.jpg" alt="Quatres femmes qui dansent dans un studio de danse" title="4 femmes qui danse dans un studio de danse" />

                <source srcSet="img\img2.webp" type="image/webp" alt="Un homme et une femme qui dansent dans la rue" title="Un homme et une femme qui dansent dans la rue" />
                <img src="img\img2.jpg" alt="Un homme et une femme qui dansent dans la rue" title="Un homme et une femme qui dansent dans la rue" />

                <source srcSet="img\img3.webp" type="image/webp" alt="Six femmes légèrement vêtues en noir qui sont assises sur un canapé prenant une pose" title="Six femmes prenant la pose" />
                <img src="img\img3.jpg" alt="Six femmes légèrement vêtues en noir qui sont assises sur un canapé prenant une pose" title="Six femmes prenant la pose" />
            </div>
            <Slideshow />
        </>
    )
}

export default Gallery