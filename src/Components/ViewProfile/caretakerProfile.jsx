import React from 'react';
import './caretakerProfile.css';

const CaretakerProfiles = ({ profiles }) => {
    return (
        <div className="container">
            <div className="caretaker-profiles">
                {profiles.map((profile, index) => (
                    <div className="caretaker-profile" key={index}>
                        <img src={profile.image} alt={profile.name} />
                        <h3>{profile.name}</h3>
                        <p>{profile.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CaretakerProfiles;