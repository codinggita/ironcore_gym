import React from 'react';
import '../design/TrainersDetails.css';
import Trainer1 from '../assets/Trainer-1.png';
import Trainer2 from '../assets/Trainer-2.png';
import Trainer3 from '../assets/Trainer-3.png';
import Trainer4 from '../assets/Trainer-4.png';
import Trainer5 from '../assets/Trainer-5.png';
import Trainer6 from '../assets/Trainer-6.png';
import Trainer7 from '../assets/Trainer-7.png';

function TrainersDetails() {
  return (
    <div className="trainers-container">
      <h1 className="trainers-heading">Meet Our Personal Trainers</h1>

      {/* Trainer 1 */}
      <div className="trainer">
        <div className="trainer-image-container">
          <img src={Trainer1} alt="Greg Johnson" className="trainer-image" />
          <div className="trainer-social-links">
            <a href="#" className="social-link">Instagram</a>
            <a href="#" className="social-link">LinkedIn</a>
            <a href="#" className="social-link">Twitter</a>
          </div>
        </div>
        <div className="trainer-info">
          <h2>Greg Johnson</h2>
          <p className="trainer-age">Age: 45</p>
          <p className="trainer-description">
            I love to help men and women conquer their fears of using strength training to lose fat and become fitter.
            My knowledge of strength training provides you with the needed guidance and confidence so you will have proper form,
            see results quickly, and reap the many benefits of strength training.
          </p>
          <p className="trainer-bio">
            I began training in the late 1980s when I was only 11 years old. I trained with old school bodybuilders who helped teach and guide me.
            In college, I managed a national nutrition shop for several years where I spent countless hours researching the benefits of nutritional supplements
            and helped others achieve their fitness goals through nutritional supplementation. I am a public safety officer and work full-time as a firefighter/EMT and a police officer.
            My fitness history includes 30+ years of strength training and weight lifting as well as ultra-endurance events, triathlons, and bodybuilding.
          </p>
        </div>
      </div>

      {/* Trainer 2 */}
      <div className="trainer reverse">
        <div className="trainer-image-container">
          <img src={Trainer2} alt="Andria Thompson" className="trainer-image" />
          <div className="trainer-social-links">
            <a href="#" className="social-link">Instagram</a>
            <a href="#" className="social-link">LinkedIn</a>
            <a href="#" className="social-link">Twitter</a>
          </div>
        </div>
        <div className="trainer-info">
          <h2>Andria Thompson</h2>
          <p className="trainer-age">Age: 41</p>
          <p className="trainer-description">
            I love to help others transform through fitness! I have worked with many clients just like you who have felt frustrated, overwhelmed, and helpless.
            I love working with beginners and those who have failed in the past because I was once a beginner too!
          </p>
          <p className="trainer-bio">
            I am a certified Fit to Enforce Fitness Instructor. I have held certifications from the Aerobics and Fitness Association of America
            and I was a certified CrossFit Level 1 trainer for five years. I am a National Academy of Sports Medicine Certified Nutrition Counselor
            and a NASM Certified Personal Trainer. I am blessed to have accomplished many fitness-oriented goals to include ultra marathons,
            marathons, triathlons, figure competitions, and amateur boxing.
          </p>
        </div>
      </div>

      {/* Trainer 3 */}
      <div className="trainer">
        <div className="trainer-image-container">
          <img src={Trainer3} alt="Meet Scott" className="trainer-image" />
          <div className="trainer-social-links">
            <a href="#" className="social-link">Instagram</a>
            <a href="#" className="social-link">LinkedIn</a>
            <a href="#" className="social-link">Twitter</a>
          </div>
        </div>
        <div className="trainer-info">
          <h2>Meet Scott</h2>
          <p className="trainer-age">Age: 32</p>
          <p className="trainer-description">
            I first gained an interest in fitness when I was 6 years old. This interest quickly developed into a passion and since then I have been dedicated to understanding the most effective and efficient way to increase muscle mass and decrease body fat, through training and nutrition.
          </p>
          <p className="trainer-bio">
            This journey began when I initially started coaching family and friends for fun and developed into my chosen career path in 2009. This career path was an obvious choice for me as I have a natural ability to coach and motivate people to understand and trust in my methods and from this, I get and expect amazing results. Along with the skills I have developed to be able to design effective goal specific training programs and pinpoint flaws within a clients current nutritional and lifestyle habits and correct them in a way that is both easy to understand and manageable within their current needs and circumstances.
          </p>
        </div>
      </div>

      {/* Meet Our All Trainers Section */}
      <h1 className="trainers-heading">Meet Our All Trainers</h1>

      {/* Trainer 4 */}
      <div className="trainer reverse">
        <div className="trainer-image-container">
          <img src={Trainer4} alt="Jason Parker" className="trainer-image" />
          <div className="trainer-social-links">
            <a href="#" className="social-link">Instagram</a>
            <a href="#" className="social-link">LinkedIn</a>
            <a href="#" className="social-link">Twitter</a>
          </div>
        </div>
        <div className="trainer-info">
          <h2>Jason Parker</h2>
          <p className="trainer-age">Age: 28</p>
          <p className="trainer-description">
            Specializations: Strength Training, Bodybuilding
          </p>
          <p className="trainer-bio">
            Experience: 6 Years
          </p>
        </div>
      </div>

      {/* Trainer 5 */}
      <div className="trainer">
        <div className="trainer-image-container">
          <img src={Trainer5} alt="David Bennett" className="trainer-image" />
          <div className="trainer-social-links">
            <a href="#" className="social-link">Instagram</a>
            <a href="#" className="social-link">LinkedIn</a>
            <a href="#" className="social-link">Twitter</a>
          </div>
        </div>
        <div className="trainer-info">
          <h2>David Bennett</h2>
          <p className="trainer-age">Age: 26</p>
          <p className="trainer-description">
            Specializations: HIIT, Yoga
          </p>
          <p className="trainer-bio">
            Experience: 3 Years
          </p>
        </div>
      </div>

      {/* Trainer 6 */}
      <div className="trainer reverse">
        <div className="trainer-image-container">
          <img src={Trainer6} alt="Olivia Kim" className="trainer-image" />
          <div className="trainer-social-links">
            <a href="#" className="social-link">Instagram</a>
            <a href="#" className="social-link">LinkedIn</a>
            <a href="#" className="social-link">Twitter</a>
          </div>
        </div>
        <div className="trainer-info">
          <h2>Olivia Kim</h2>
          <p className="trainer-age">Age: 29</p>
          <p className="trainer-description">
            Specializations: Strength Training, Pilates
          </p>
          <p className="trainer-bio">
            Experience: 5 Years
          </p>
        </div>
      </div>

      {/* Trainer 7 */}
      <div className="trainer">
        <div className="trainer-image-container">
          <img src={Trainer7} alt="Rachel Collins" className="trainer-image" />
          <div className="trainer-social-links">
            <a href="#" className="social-link">Instagram</a>
            <a href="#" className="social-link">LinkedIn</a>
            <a href="#" className="social-link">Twitter</a>
          </div>
        </div>
        <div className="trainer-info">
          <h2>Rachel Collins</h2>
          <p className="trainer-age">Age: 26</p>
          <p className="trainer-description">
            Specializations: Bodybuilding
          </p>
          <p className="trainer-bio">
            Experience: 2 Years
          </p>
        </div>
      </div>
    </div>
  );
}

export default TrainersDetails;