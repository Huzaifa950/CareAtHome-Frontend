import React from 'react';
import './caretakerProfile.css';
import { capitalizeEachWord } from '../Common/Common';

const CaretakerProfiles = ({ profiles, errorType }) => {
    return (
        <div className="container">
            {errorType === "length" ? <h2 style={{ textAlign: "center" }}>No caretakers found</h2> :
                errorType === "error" ? <h2 style={{ textAlign: "center" }}>Something went wrong. Please try again later.</h2> :

                    <div className="caretaker-profiles">
                        {profiles.map((profile, index) => (
                            <div className="caretaker-profile" key={index}>
                                <img src={profile.image} alt={profile.fullName} />
                                <h3>{capitalizeEachWord(profile.fullName)}</h3>
                                <p>{profile.description}</p>
                            </div>
                        ))}
                    </div>
            }
        </div>
    );
}

export default CaretakerProfiles;