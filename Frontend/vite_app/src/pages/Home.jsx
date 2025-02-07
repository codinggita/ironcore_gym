import React from 'react';
import '../design/Home.css';
import gymHero from '../assets/Home-Main.jpg';

const Home = () => {
    return (
        <div className="home-container">

            <section className="hero-section">
                <div className="hero-image-container">
                    <img
                        src={gymHero}
                        alt="Gym Interior"
                        className="hero-image"
                    />
                    <div className="hero-overlay">
                        <div className="hero-content">
                            <h1>Your Journey to Better Health Starts Here</h1>
                            <button className="cta-button">JOIN NOW</button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="about-section">
                <h2>ABOUT US</h2>
                <p>
                    Ironcore Gym is a fitness studio that has everything you want. Located in Nikol, Ahmedabad, this ideal place can work as one-stop shop for all the gym enthusiasts. With state-of-the-art quality equipments, this gymnasium has top-notch services for you that include, cardio, strength training, cycling, free trial and much more. Cleanliness and sanitization are at par, and a priority for the management to provide a hygienic atmosphere for all workout enthusiasts.
                </p>
            </section>

            <section className="amenities-section">
                <h2>AMENITIES</h2>
                <div className="amenities-grid">
                    <div className="amenity-item">AC</div>
                    <div className="amenity-item">LOCKER</div>
                    <div className="amenity-item">PARKING</div>
                    <div className="amenity-item">SHOWER</div>
                    <div className="amenity-item">CANTEEN</div>
                    <div className="amenity-item">Wi-Fi</div>
                </div>
            </section>

            <section className="fitpass-section">
                <div className="fitpass-content">
                    <div className="fitpass-block">
                        <h2>FITPASS Benefits</h2>
                        <ul className="fitpass-list">
                            <li>Access 100+ premium gyms and fitness centres across India</li>
                            <li>Avail 5,000+ multiple workout sessions across the network</li>
                            <li>Reserve workout slots as per your convenience from wherever you are</li>
                        </ul>
                    </div>

                    <div className="fitpass-block">
                        <h2>How FITPASS Works</h2>
                        <ol className="fitpass-list numbered">
                            <li>Register or log in using your mobile number</li>
                            <li>Pick your suitable plan and activate your membership</li>
                            <li>Reserve your convenient workout slot from available centres listed</li>
                        </ol>
                        <p className="fitpass-note">Now get set sweat to follow #YourFitness Your Way</p>
                    </div>

                    <div className="fitpass-block">
                        <h2>Our Sweatiquettes</h2>
                        <ul className="fitpass-list">
                            <li>Arrive 15 minutes before your scheduled workout.</li>
                            <li>Use the FITPASS application to scan and check in as soon as you arrive</li>
                            <li>Adhere to your allotted workout time.</li>
                            <li>Wear casual yet appropriate workout attire.</li>
                            <li>Respect others' personal space, especially during peak hours.</li>
                            <li>Help us maintain a safe environment for everyone. No Gaze, More Gain!</li>
                        </ul>
                    </div>

                    <div className="fitpass-block">
                        <h2>STUDIO SAFETY & HYGIENE</h2>
                        <ul className="fitpass-list">
                            <li>This fitness centre guarantees a clean and hygienic environment for a delightful visitor experience</li>
                            <li>Staff members diligently disinfect workout equipment after each session</li>
                            <li>Visitors are kindly requested to maintain cleanliness throughout their workout sessions</li>
                            <li>The centre also enforces a strict policy against misconduct; any misbehavior or negligence will not be tolerated by studio personnel</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="hours-contact-section">
                <div className="gym-timing-wrapper">
                    <h2>Gym Timing</h2>
                    <div className="day-time">
                        <p>Monday:</p>
                        <p>5am-12pm,3-10pm</p>
                    </div>
                    <div className="day-time">
                        <p>Tuesday:</p>
                        <p>5am-12pm,3-10pm</p>
                    </div>
                    <div className="day-time">
                        <p>Wednesday:</p>
                        <p>5am-12pm,3-10pm</p>
                    </div>
                    <div className="day-time">
                        <p>Thursday:</p>
                        <p>5am-12pm,3-10pm</p>
                    </div>
                    <div className="day-time">
                        <p>Friday:</p>
                        <p>5am-12pm,3-10pm</p>
                    </div>
                    <div className="day-time">
                        <p>Saturday:</p>
                        <p>5am-12pm,3-10pm</p>
                    </div>
                    <div className="day-time">
                        <p>Sunday</p>
                        <p>5am-12pm</p>
                    </div>
                </div>

                <div className="contact-wrapper">
                    <h2>Contact Us</h2>
                    <p>We are always there for you!</p>
                    <p>GST:U52896DL20562feC2929638</p>
                    <p>Phone:5821424154</p>
                    <p>E-mail:ironcare@gmail.com</p>
                    <p>Want to reach us old style? Here is our postal address.</p>
                    <p className="address">
                        2nd and 4th Floor, Shyam Arcade,opp.Dominoz Pizza,<br />
                        At,Gangotri Cir Rd,Nikol,<br />
                        Ahmedabad, Gujarat 382350
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Home;
