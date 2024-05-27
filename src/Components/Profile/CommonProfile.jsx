import { useEffect, useState } from "react";
import { Row, Col, Image, Card, Button } from "react-bootstrap";
import dummyProfileImage from "../../Assets/Images/profile.png";

import "./CommonProfile.css";
import { capitalizeEachWord, uploadImageToImgBB } from "../Common/Common";

const ProfileComponent = ({
  viewOnly,
  originalImage,
  handleUpdateImage,
  image,
  name,
  username,
  memberSince,
  location,
  handleProfileChange,
}) => {
  console.log("Profile Component user image: ", image);

  useEffect(() => {
    const uploadImage = async () => {
      try {
        const imageLink = await uploadImageToImgBB(image);
        handleUpdateImage({ image: imageLink });
      } catch (error) {
        console.log("Error Updating Image")
      }
    };
    if (image && image !== originalImage) uploadImage();

  }, [image]);

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
        margin: "10% 5% 0 5%",
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
        <p>Active</p>
      </div>
      <Row className="justify-content-center">
        <Col xs={8} sm={6}>
          <div
            className="profile-image mx-auto"
            style={{ textAlign: "center", marginBottom: "20px" }}
          >
            <label htmlFor="profileImage" className="rounded-circle d-block">
              {image ? (
                <Image
                  src={
                    typeof image === "string"
                      ? image
                      : URL.createObjectURL(image)
                  }
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
              {!viewOnly && <input
                type="file"
                id="profileImage"
                style={{
                  display: "none",
                  width: "120px",
                  height: "150px",
                }}
                onChange={handleImageChange}
              />}
            </label>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              margin: "0 10px 0 100px",
            }}
          >
            <div className="fieldNames" style={{ flex: 1 }}>
              <p>
                <strong>Name:</strong>
              </p>
              <p>
                <strong>Username:</strong>
              </p>
              <p>
                <strong>Member Since:</strong>
              </p>
              <p>
                <strong>From:</strong>
              </p>
            </div>

            <div className="fieldValues" style={{ flex: 1 }}>
              <p>{capitalizeEachWord(name)}</p>
              <p>{capitalizeEachWord(username)}</p>
              <p>{memberSince}</p>
              <p>{location}</p>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

const DescriptionComponent = ({
  desc,
  viewOnly,
  updateDescription,
  originalPatientInfo,
  handleDescriptionChange,
}) => {
  const [editing, setEditing] = useState(true);

  const handleEditDescription = () => {
    setEditing(true);
  };

  const handleSaveDescription = () => {
    // const wordCount = desc ? desc.split(/\s+/).filter(Boolean).length : 0;
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

  useEffect(() => {
    if (desc || viewOnly) {
      setEditing(false);
    }
  }, [originalPatientInfo]);

  const wordCount = desc ? desc.split(/\s+/).filter(Boolean).length : 0;

  return (
    <div
      style={{
        backgroundColor: "#f2f2f2",
        margin: "10% 5% 0 5%",
        borderRadius: "5px",
      }}
    >
      <Card style={{ backgroundColor: "#f2f2f2" }}>
        <Card.Body>
          <Row
            style={{
              display: "flex",
              justifyContent: "space-between",
              maxWidth: "100%",
              alignItems: "center",
            }}
          >
            <Col>
              <h5 style={{ fontSize: "22px" }}>Description</h5>
            </Col>
            <Col className="d-flex justify-content-end">
              {!viewOnly ? editing ? (
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
              ): null}
            </Col>
          </Row>
          {editing && !viewOnly ? (
            <>
              <textarea
                className="form-control"
                rows={8} // Adjusted height
                placeholder="Enter your Description Here"
                value={desc}
                onChange={(e) =>
                  handleDescriptionChange("description", e.target.value)
                }
                required
                style={{
                  width: "95%",
                  resize: "none",
                  backgroundColor: "#f2f2f2",
                }}
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

const LanguageComponent = ({
  viewOnly,
  updateLanguages,
  selectedLanguages,
  originalPatientInfo,
  handleLanguageChange,
}) => {
  const [editing, setEditing] = useState(true);

  useEffect(() => {
    if (selectedLanguages.length > 0 || viewOnly) {
      setEditing(false);
    }
  }, [originalPatientInfo]);

  const handleLanguageChangeClick = (language) => {
    let updatedLanguages = [];
    if (selectedLanguages.includes(language)) {
      updatedLanguages = selectedLanguages.filter((lang) => lang !== language);
    } else {
      updatedLanguages = [...selectedLanguages, language];
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
        margin: "5% 5% 0 5%",
        borderRadius: "6px",
      }}
    >
      <Card style={{ backgroundColor: "#f2f2f2" }}>
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
            {!viewOnly && <Col className="d-flex justify-content-end">
              {editing ? (
                <Button variant="link" onClick={handleSaveLanguages}>
                  Save
                </Button>
              ) : (
                <Button variant="link" onClick={handleEditLanguages}>
                  Edit
                </Button>
              )}
            </Col>}
          </Row>
          {editing && !viewOnly && (
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
