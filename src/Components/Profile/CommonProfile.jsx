import React from "react";
import { useState } from "react";
import { Container, Row, Col, Image, Card, Button } from "react-bootstrap";
import dummyProfileImage from "../../Assets/Images/profile.png";

import "./CommonProfile.css";

const CommonProfile = ({ pageName }) => {
  return (
    <div>
      <h1>I am on a {pageName} Profile Page</h1>
    </div>
  );
};

function Profile() {
  const [userImage, setUserImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setUserImage(reader.result);
    };
  };

  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col sm={10} md={8} lg={6}>
          <div
            className="user-profile-box position-relative"
            style={{
              backgroundColor: "#f0f0f0",
              padding: "20px",
              borderRadius: "10px",
              position: "relative",
              width: "40%",
              marginLeft: "5%",
              marginRight: "5%",
              marginTop: "5%",
            }}
          >
            <div
              className="profile-status position-absolute top-0 end-0"
              style={{
                fontSize: "14px",
                color: "green",
                textAlign: "right",
              }}
            >
              <p>Status: null</p>
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
                    {userImage ? (
                      <Image
                        src={userImage}
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
                  <p style={{ textAlign: "center" }}>
                    <strong>Name</strong>
                  </p>
                  <p style={{ textAlign: "center" }}>
                    <strong>Username</strong>
                  </p>
                  <div
                    className="member"
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <p>
                      <strong>Member Since:</strong>
                    </p>
                    <p>2021</p>
                  </div>
                  <div
                    className="from"
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <p>
                      <strong>From:</strong>
                    </p>
                    <p>Lahore, Pakistan</p>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

const DescriptionComponent = () => {
  const [description, setDescription] = useState("");
  const [editing, setEditing] = useState(true);

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleEditDescription = () => {
    setEditing(true);
  };

  const handleSaveDescription = () => {
    // Validation for description length
    const wordCount = description.split(/\s+/).filter(Boolean).length;
    if (wordCount < 120) {
      alert("Description should be greater than 120 words.");
      return;
    } else if (wordCount > 200) {
      alert("Description should be at most 200 words.");
      return;
    }

    setEditing(false);
  };

  const wordCount = description.split(/\s+/).filter(Boolean).length;

  return (
    <div
      style={{
        backgroundColor: "#f2f2f2",
        maxWidth: "40%",
        margin: "5%",
        borderRadius: "6px",
      }}
    >
      <Container style={{ padding: "5%" }}>
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
                  value={description}
                  onChange={handleDescriptionChange}
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
              <p>{description}</p>
            )}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

const LanguageComponent = () => {
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [editing, setEditing] = useState(true);

  const handleLanguageChange = (language) => {
    // Check if the language is already selected
    if (selectedLanguages.includes(language)) {
      setSelectedLanguages(
        selectedLanguages.filter((lang) => lang !== language)
      );
    } else {
      setSelectedLanguages([...selectedLanguages, language]);
    }
  };

  const handleEditLanguages = () => {
    setEditing(true);
  };

  const handleSaveLanguages = () => {
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
        maxWidth: "40%",
        margin: "5%",
        borderRadius: "6px",
      }}
    >
      <Container style={{ padding: "5%" }}>
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
                      onChange={() => handleLanguageChange("Urdu")}
                    />{" "}
                    Urdu
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      onChange={() => handleLanguageChange("English")}
                    />{" "}
                    English
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      onChange={() => handleLanguageChange("Pashto")}
                    />{" "}
                    Pashto
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      onChange={() => handleLanguageChange("Siraiki")}
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
                      onChange={() => handleLanguageChange("Punjabi")}
                    />{" "}
                    Punjabi
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      onChange={() => handleLanguageChange("Arabic")}
                    />{" "}
                    Arabic
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      onChange={() => handleLanguageChange("Chinese")}
                    />{" "}
                    Chinese
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      onChange={() => handleLanguageChange("French")}
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
      </Container>
    </div>
  );
};

export { Profile, DescriptionComponent, LanguageComponent };

export default CommonProfile;
