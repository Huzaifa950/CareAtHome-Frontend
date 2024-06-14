import React, { useState } from "react";
import "./caretakerProfile.css";
import { capitalizeEachWord } from "../Common/Common";
import CareTakerProfile from "../Profile/CareTakerProfile"
import { PatientChatboxContainer } from "../Chatbox/chatbox";

const CaretakerProfiles = ({ userInfo, profiles, errorType }) => {
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [selectedProfile, setSelectedProfile] = useState({});

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    const [showPopup, setShowPopup] = useState(false);

    const showPopupProfile = (profile) => {
        console.log("Selected profile:", profile);
        setSelectedProfile(profile);
        setShowPopup(true);
    }
    const hidePopupProfile = () => {
        setShowPopup(false);
    }

    return (
        <div className="container">
            {errorType === "length" ? (
                <h2 style={{ textAlign: "center" }}>No caretakers found</h2>
            ) : errorType === "error" ? (
                <h2 style={{ textAlign: "center" }}>
                    Something went wrong. Please try again later.
                </h2>
            ) : (
                <div className="caretaker-profiles">
                    {profiles.map((profile, index) => (
                        <div className="caretaker-profile" key={index}>
                            <div class='viewProfile' style={{ textAlign: 'right' }}>
                                <button style={{ fontSize: '12px', padding: '5px 8px', border: 'none', borderRadius: '5px' }} onClick={() => showPopupProfile(profile)}> View Profile</button>
                            </div>
                            <img src={profile.image} alt={profile.fullName} />
                            <h3>{capitalizeEachWord(profile.fullName)}</h3>

                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-around",
                                    marginTop: "80px",
                                }}
                            >
                                <div style={{ textAlign: "left", maxWidth: "60%" }}>
                                    <h5>Description</h5>
                                    <p
                                        style={{
                                            marginLeft: "25px",
                                            color: profile.description.length < 1 ? "grey" : "black",
                                        }}
                                    >
                                        {profile.description.length < 1 ? (
                                            "Empty"
                                        ) : profile.description.split(" ").length > 30 ? (
                                            <>
                                                {showFullDescription
                                                    ? profile.description
                                                    : profile.description.split(' ').slice(0, 50).join(' ') + '...'}
                                                <span
                                                    onClick={toggleDescription}
                                                    style={{ color: "blue", cursor: "pointer" }}
                                                >
                                                    {showFullDescription ? " show less" : " more"}
                                                </span>
                                            </>
                                        ) : (
                                            profile.description
                                        )}
                                    </p>
                                </div>

                                <div style={{ textAlign: "left" }}>
                                    <h5>Phone No.</h5>
                                    <p style={{ marginLeft: '25px', color: profile?.phoneNumber?.trim() === '' ? 'grey' : 'black' }}>
                                        {profile?.phoneNumber?.trim() === '' ? 'Empty' : profile.phoneNumber}
                                    </p>
                                    <h5>Skills</h5>
                                    <p style={{ marginLeft: '25px', color: profile?.skills?.trim() === '' ? 'grey' : 'black' }}>
                                        {profile?.skills?.trim() === '' ? 'Empty' : profile.skills}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}

                    {showPopup && (
                        <div className="popup">
                            <span className="close-icon" onClick={hidePopupProfile}>
                                &times;
                            </span>

                            <div className="popup-content">
                                <PatientChatboxContainer
                                    senderInfo={userInfo}
                                    receiverInfo={{
                                        username: selectedProfile.username,
                                        fullName: selectedProfile.fullName,
                                        image: selectedProfile.image
                                    }}
                                />
                                <CareTakerProfile userInfo={selectedProfile} viewOnly={true} />
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CaretakerProfiles;
