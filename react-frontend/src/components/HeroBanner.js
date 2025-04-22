import '../assets/Style/index.css';
import {Link} from 'react-router-dom';

export default function HeroBanner() {

  return (
    <div>
        <div className="hero-banner">
            <div className="hero-container">
                <h1 id="title-1">Smart</h1>
                <h1 id="title-2">Maintenance</h1>
                <p id="paragraph-one">Predicting and Preventing Failures in Transportation Systems Using IoT and AI</p>
            </div>
            <div className="button-3">
                <button id="explore-button">Explore</button>
            </div>
        </div>
    </div>
  );
}
