import React, { useState } from 'react';
import '../design/Service.css';

const Service = () => {
    const [activeTab, setActiveTab] = useState('#management');

    return (
        <div className="service-container">
            <div className="tabs">
                <button className={`tab-button ${activeTab === '#management' ? 'active' : ''}`} onClick={() => setActiveTab('#management')}>Management</button>
                <button className={`tab-button ${activeTab === '#services' ? 'active' : ''}`} onClick={() => setActiveTab('#services')}>Services</button>
                <button className={`tab-button ${activeTab === '#fitness' ? 'active' : ''}`} onClick={() => setActiveTab('#fitness')}>Fitness Options</button>
            </div>
            <div className="search-bar">
                <input type="text" placeholder="Search in services / Amenities" />
            </div>
            <div className="content-container">
                <div className={`content management ${activeTab === '#management' ? 'highlight' : ''}`}>
                    <h2>Management</h2>
                    <ul>
                        <li><span className="checkmark">✓</span> Weight Management Counselling</li>
                    </ul>
                </div>
                <div className={`content services ${activeTab === '#services' ? 'highlight' : ''}`}>
                    <h2>Services</h2>
                    <ul>
                        <li><span className="checkmark">✓</span> Nutrition consultation <span className="icon">🍽️</span></li>
                        <li><span className="checkmark">✓</span> Strengthening Exercises <span className="icon">💪</span></li>
                        <li><span className="checkmark">✓</span> Get Your Own Trainer <span className="icon">🏋️‍♂️</span></li>
                    </ul>
                </div>
                <div className={`content fitness-options ${activeTab === '#fitness' ? 'highlight' : ''}`}>
                    <h2>Fitness Options</h2>
                    <ul>
                        <li><span className="checkmark">✓</span> Cardio <span className="icon">🏃</span></li>
                        <li><span className="checkmark">✓</span> Aerobics <span className="icon">🏋️‍♂️</span></li>
                        <li><span className="checkmark">✓</span> Floor Exercise <span className="icon">🧘</span></li>
                        <li><span className="checkmark">✓</span> Gym <span className="icon">🏋️‍♂️</span></li>
                        <li><span className="checkmark">✓</span> Zumba <span className="icon">💃</span></li>
                        <li><span className="checkmark">✓</span> Crossfit <span className="icon">🏋️‍♀️</span></li>
                        <li><span className="checkmark">✓</span> Yoga <span className="icon">🧘‍♂️</span></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Service;
