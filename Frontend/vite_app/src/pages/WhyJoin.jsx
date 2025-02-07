import React from 'react';
import { useNavigate } from 'react-router-dom';
import gymHero from '../assets/why-join.png';
import supportImage from '../assets/Support-image.png';
import toolsImage from '../assets/Tools & Training-image.png';
import convenienceImage from '../assets/Convenience-image.png';
import communityImage from '../assets/community-image.png';
import '../design/WhyJoin.css';

function WhyJoin() {
  const navigate = useNavigate();

  return (
    <>
    <section className="hero-section-2">
      <div className="hero-image-container-2">
        <img
          src={gymHero}
          alt="Gym Interior"
          className="hero-image-2"
        />
        <div className="hero-overlay-2">
          <div className="hero-content-2">
            <h1>WHY JOIN IRONCORE GYM?</h1>
            <p className='ridham'>
              Ironcore gym membership offers a comprehensive fitness journey to every individual.
              Supportive community, state-of-the-art equipment, certified trainers, and flexibility.
              Take a step forward toward fitness, anytime.
            </p>
            <button className="cta-button-2" onClick={() => navigate('/photos')}>
              Visit Gym
            </button>
          </div>
        </div>
      </div>
    </section>

    <section className="features-section">
      <h1>WHY CHOOSE IRONCORE GYM MEMBERSHIP</h1>
        <div className="feature">
          <img src={supportImage} alt="Support" />
          <h2>Support</h2>
          <p>
            Ironcore offers comprehensive support to all gym members. From personalized training to regular guidance, our certified trainers are here to assist you in fulfilling your fitness goals. It is the perfect place for starting a journey towards a healthy lifestyle.
          </p>
        </div>
        <div className="feature">
          <img src={toolsImage} alt="Tools & Training" />
          <h2>Tools & Training</h2>
          <p>
            With avant-garde equipment incorporating cardio machines, free weights, and strength training, you'll get everything you need to pursue a balanced workout routine. Everyday Fitness has dedicated space for group classes, functional training, and personal training ensuring that there's something for everyone.
          </p>
        </div>
        <div className="feature">
          <img src={convenienceImage} alt="Convenience" />
          <h2>Convenience</h2>
          <p>
            With Ironcore, get convenient time access. Get an Anytime Fitness gym membership and experience the difference it brings for you.
          </p>
        </div>
        <div className="feature">
          <img src={communityImage} alt="Community" />
          <h2>Community</h2>
          <p>
            Ironcore is not just a gym- it's a supportive community of like-minded individuals who are here to give you motivation whenever you need it. We encourage every member to exchange tips and encouragement.
          </p>
        </div>
      </section>

      <section className="membership-section">
      <h1>Ironcore Gym Membership Offers</h1>
        <div className="membership-container">
          <div className="membership-column">
            <h2>Equipment</h2>
            <ul>
              <li>Treadmills</li>
              <li>Exercise Cycles</li>
              <li>Stair Climbers</li>
              <li>Rowing Machines</li>
              <li>Free Weights</li>
              <li>Synergy 360 Systems</li>
              <li>Cable Crossovers</li>
              <li>Kettlebells</li>
              <li>Amt Crosstrainers</li>
            </ul>
          </div>
          <div className="membership-column">
            <h2>Lifestyle</h2>
            <ul>
              <li>Personal Training</li>
              <li>Team Workouts</li>
              <li>Tanning</li>
              <li>Adaptive Motion Trainers</li>
              <li>Spinning Cycles & Classes</li>
              <li>Zumba Classes</li>
              <li>Cardio Classes</li>
              <li>Body Conditioning Classes</li>
              <li>Yoga Classes</li>
            </ul>
          </div>
          <div className="membership-column">
            <h2>Services</h2>
            <ul>
              <li>A.C</li>
              <li>Wi-Fi</li>
              <li>Convenient Parking</li>
              <li>Anywhere Gym Access</li>
              <li>Private Restrooms</li>
              <li>Private Showers</li>
              <li>Wellness Programs</li>
              <li>Cardio TVs</li>
              <li>TVs And HDTVs</li>
            </ul>
          </div>
        </div>
        <button className="enquire-button" onClick={() => navigate('/pass-membership-plans')}>Enquire About Gym Membership Now</button>
      </section>
    </>
  );
}

export default WhyJoin;