import { useState } from "react";
import { Row, Col, Image, Card, Button } from "react-bootstrap";
import dummyProfileImage from "../../Assets/Images/profile.png";

import "./CommonProfile.css";
import { capitalizeEachWord } from "../Common/Common";

const CommonProfile = ({ pageName }) => {
  return (
    <div>
      <h1>I am on a {pageName} Profile Page</h1>
    </div>
  );
};

const ProfileComponent = ({ image, name, username, memberSince, location, handleProfileChange }) => {
  console.log("Profile Component user image: ", image)

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    handleProfileChange("image", selectedFile);
  };

  return (
    <div
      className="user-profile-box position-relative"
      style={{
        backgroundColor: "#f0f0f0",
        padding: "20px",
        borderRadius: "10px",
        position: "relative",
        marginLeft: "5%",
        marginRight: "5%",
        marginTop: "5%",
      }}
    >
      <div
        className="profile-status position-absolute top-2 end-0"
        style={{
          fontSize: "14px",
          color: "green",
          marginRight: "20px",
          textAlign: "right",
        }}
      >
        <p>Dead</p>
      </div>
      <Row className="justify-content-center">
        <Col xs={8} sm={6}>
          <div
            className="profile-image mx-auto"
            style={{ textAlign: "center", marginBottom: "20px" }}
          >
            <label
              htmlFor="profileImage"
              className="rounded-circle d-block"
            >
              {image ? (
                <Image
                  src={typeof image === "string" ? image : URL.createObjectURL(image)}
                  alt="Profile Image"
                  roundedCircle // Apply roundedCircle class for circular image
                  style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "50%",
                  }} // Ensure equal width and height
                />
              ) : (
                <Image
                  src={dummyProfileImage}
                  alt="Dummy Profile Image"
                  roundedCircle // Apply roundedCircle class for circular image
                  style={{ width: "150px", height: "150px" }} // Ensure equal width and height
                />
              )}
              <input
                type="file"
                id="profileImage"
                style={{
                  display: "none",
                  width: "150px",
                  height: "150px",
                }}
                onChange={handleImageChange}
              />
            </label>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col>
          <div className="profile-details text-center">
            <div
              className="member"
              style={{ display: "flex", justifyContent: "space-around" }}
            >
              <p>
                <strong>Name:</strong>
              </p>
              <p>{capitalizeEachWord(name)}</p>
            </div>
            <div
              className="member"
              style={{ display: "flex", justifyContent: "space-around" }}
            >
              <p>
                <strong>Username:</strong>
              </p>
              <p>{capitalizeEachWord(username)}</p>
            </div>
            <div
              className="member"
              style={{ display: "flex", justifyContent: "space-around" }}
            >
              <p>
                <strong>Member Since:</strong>
              </p>
              <p>{memberSince}</p>
            </div>
            <div
              className="from"
              style={{ display: "flex", justifyContent: "space-around" }}
            >
              <p>
                <strong>From:</strong>
              </p>
              <p>{location}</p>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

const DescriptionComponent = ({ desc, handleDescriptionChange, updateDescription }) => {
  const [editing, setEditing] = useState(true);

  const handleEditDescription = () => {
    setEditing(true);
  };

  const handleSaveDescription = () => {
    const wordCount = desc ? desc.split(/\s+/).filter(Boolean).length : 0;
    // if (wordCount < 120) {
    //   showErrorToast("Description should be greater than 120 words.");
    // } else if (wordCount > 200) {
    //   showErrorToast("Description should be at most 200 words.");
    // }
    // else {
    updateDescription({ description: desc });
    setEditing(false);
    // }

  };

  const wordCount = desc ? desc.split(/\s+/).filter(Boolean).length : 0;

  return (
    <div
      style={{
        backgroundColor: "#f2f2f2",
        margin: "5%",
        borderRadius: "6px",
      }}
    >
      <Card>
        <Card.Body>
          <Row
            style={{
              display: "flex",
              justifyContent: "space-between",
              maxWidth: "95%",
              alignItems: "center",
            }}
          >
            <Col>
              <h5 style={{ fontSize: "22px" }}>Description</h5>
            </Col>
            <Col className="d-flex justify-content-end">
              {editing ? (
                <Button variant="link" onClick={handleSaveDescription}>
                  Save
                </Button>
              ) : (
                <href
                  variant="link"
                  onClick={handleEditDescription}
                  style={{
                    textDecoration: "underline",
                    cursor: "pointer",
                    color: "rgba(0, 0, 0, 0.5)",
                  }}
                >
                  Edit
                </href>
              )}
            </Col>
          </Row>
          {editing ? (
            <>
              <textarea
                className="form-control"
                rows={8} // Adjusted height
                placeholder="Enter your Description Here"
                value={desc}
                onChange={(e) => handleDescriptionChange("description", e.target.value)}
                required
                style={{ width: "95%", resize: "none" }}
              />
              <Row style={{ marginLeft: "85%" }}>
                <Col className="text-end">
                  <small>{wordCount} / 200</small>
                </Col>
              </Row>
            </>
          ) : (
            <p>{desc}</p>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

const LanguageComponent = ({ selectedLanguages, handleLanguageChange, updateLanguages }) => {
  const [editing, setEditing] = useState(true);

  const handleLanguageChangeClick = (language) => {
    let updatedLanguages = [];
    if (selectedLanguages.includes(language)) {
      updatedLanguages = selectedLanguages.filter((lang) => lang !== language)
    } else {
      updatedLanguages = [...selectedLanguages, language]
    }
    handleLanguageChange("languages", updatedLanguages);
  };

  const handleEditLanguages = () => {
    setEditing(true);
  };

  const handleSaveLanguages = () => {
    updateLanguages({ languages: selectedLanguages });
    setEditing(false);
  };

  const renderSelectedLanguages = () => {
    return (
      <ul>
        {selectedLanguages.map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>
    );
  };

  return (
    <div
      style={{
        backgroundColor: "#f2f2f2",
        margin: "5%",
        borderRadius: "6px",
      }}
    >
      <Card>
        <Card.Body>
          <Row
            style={{
              display: "flex",
              justifyContent: "space-between",
              maxWidth: "95%",
              alignItems: "center",
            }}
          >
            <Col>
              <h5 style={{ fontSize: "22px" }}>Languages</h5>
            </Col>
            <Col className="d-flex justify-content-end">
              {editing ? (
                <Button variant="link" onClick={handleSaveLanguages}>
                  Save
                </Button>
              ) : (
                <Button variant="link" onClick={handleEditLanguages}>
                  Edit
                </Button>
              )}
            </Col>
          </Row>
          {editing && (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  maxWidth: "60%",
                }}
              >
                <label>
                  <input
                    type="checkbox"
                    checked={selectedLanguages.includes("Urdu")}
                    onChange={() => handleLanguageChangeClick("Urdu")}
                  />{" "}
                  Urdu
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedLanguages.includes("English")}
                    onChange={() => handleLanguageChangeClick("English")}
                  />{" "}
                  English
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedLanguages.includes("Hindi")}
                    onChange={() => handleLanguageChangeClick("Pashto")}
                  />{" "}
                  Pashto
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedLanguages.includes("Siraiki")}
                    onChange={() => handleLanguageChangeClick("Siraiki")}
                  />{" "}
                  Siraiki
                </label>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  maxWidth: "60%",
                }}
              >
                <label>
                  <input
                    type="checkbox"
                    checked={selectedLanguages.includes("Punjabi")}
                    onChange={() => handleLanguageChangeClick("Punjabi")}
                  />{" "}
                  Punjabi
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedLanguages.includes("Arabic")}
                    onChange={() => handleLanguageChangeClick("Arabic")}
                  />{" "}
                  Arabic
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedLanguages.includes("Chinese")}
                    onChange={() => handleLanguageChangeClick("Chinese")}
                  />{" "}
                  Chinese
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedLanguages.includes("French")}
                    onChange={() => handleLanguageChangeClick("French")}
                  />{" "}
                  French
                </label>
              </div>
            </div>
          )}
          {!editing &&
            selectedLanguages.length > 0 &&
            renderSelectedLanguages()}
          {!editing && selectedLanguages.length === 0 && (
            <p>No Languages Selected</p>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export { ProfileComponent, DescriptionComponent, LanguageComponent };

export default CommonProfile;
