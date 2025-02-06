import React from 'react';
import "../design/Photos.css";

import photo1 from '../assets/photo-1.png';
import photo2 from '../assets/photo-2.png';
import photo3 from '../assets/photo-3.png';
import photo4 from '../assets/photo-4.png';
import photo5 from '../assets/photo-5.png';
import photo6 from '../assets/photo-6.png';
import photo7 from '../assets/photo-7.png';
import photo8 from '../assets/photo-8.png';
import photo9 from '../assets/photo-9.png';
import photo10 from '../assets/photo-10.png';
import photo11 from '../assets/photo-11.png';
import photo12 from '../assets/photo-12.png';
import photo13 from '../assets/photo-13.png';
import photo14 from '../assets/photo-14.png';
import photo15 from '../assets/photo-15.png';
import photo16 from '../assets/photo-16.png';
import photo17 from '../assets/photo-17.png';
import photo18 from '../assets/photo-18.png';
import photo19 from '../assets/photo-19.png';
import photo20 from '../assets/photo-20.png';
import photo21 from '../assets/photo-21.png';

function Photos() {
  return (
    <div className="photos-container">
      <div className="photo-grid">
        <img src={photo2 || "/placeholder.svg"} alt="Photo 2" className="photo-item photo-2" />
        <img src={photo4 || "/placeholder.svg"} alt="Photo 4" className="photo-item photo-4" />
        <img src={photo1 || "/placeholder.svg"} alt="Photo 1" className="photo-item photo-1" />
        <img src={photo3 || "/placeholder.svg"} alt="Photo 3" className="photo-item photo-3" />
        <img src={photo5 || "/placeholder.svg"} alt="Photo 5" className="photo-item photo-5" />
        <img src={photo6 || "/placeholder.svg"} alt="Photo 6" className="photo-item photo-6" />
        <img src={photo7 || "/placeholder.svg"} alt="Photo 7" className="photo-item photo-7" />
        <img src={photo8 || "/placeholder.svg"} alt="Photo 8" className="photo-item photo-8" />
        <img src={photo9 || "/placeholder.svg"} alt="Photo 9" className="photo-item photo-9" />
        <img src={photo10 || "/placeholder.svg"} alt="Photo 10" className="photo-item photo-10" />
        <img src={photo11 || "/placeholder.svg"} alt="Photo 11" className="photo-item photo-11" />
        <img src={photo12 || "/placeholder.svg"} alt="Photo 12" className="photo-item photo-12" />
        <img src={photo13 || "/placeholder.svg"} alt="Photo 13" className="photo-item photo-13" />
        <img src={photo14 || "/placeholder.svg"} alt="Photo 14" className="photo-item photo-14" />
        <img src={photo15 || "/placeholder.svg"} alt="Photo 15" className="photo-item photo-15" />
        <img src={photo16 || "/placeholder.svg"} alt="Photo 16" className="photo-item photo-16" />
        <img src={photo17 || "/placeholder.svg"} alt="Photo 17" className="photo-item photo-17" />
        <img src={photo18 || "/placeholder.svg"} alt="Photo 18" className="photo-item photo-18" />
        <img src={photo19 || "/placeholder.svg"} alt="Photo 19" className="photo-item photo-19" />
        <img src={photo20 || "/placeholder.svg"} alt="Photo 20" className="photo-item photo-20" />
        <img src={photo21 || "/placeholder.svg"} alt="Photo 21" className="photo-item photo-21" />
      </div>
    </div>
  );
}

export default Photos;