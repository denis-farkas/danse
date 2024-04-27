import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'cover',
    height: '400px'
}
const slideImages = [
    {
        url: '/img/img1.jpg'
    },
    {
        url: '/img/img2.jpg'
    },
    {
        url: '/img/img3.jpg'
    }
];

const Slideshow = () => {
    return (
        <div className="slide-container" role="group" aria-label="Carrousel d'images">
            <Slide>
                {slideImages.map((slideImage, index) => (
                    <div key={index} aria-hidden={index !== 0}>
                        <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }}>
                        </div>
                    </div>
                ))}
            </Slide>
        </div>
    )
}
export default Slideshow