import React, { useState, useRef } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import CommonProfile from "./CommonProfile";

const ServicesComponent = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [clickedImageIndex, setClickedImageIndex] = useState(null);

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file && selectedImages.length < 6) {
      // Updated condition to allow maximum 6 images
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImages((prevImages) => [...prevImages, reader.result]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = (index) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
    if (clickedImageIndex === index) {
      setClickedImageIndex(null);
    }
  };

  const handleImageClick = (index) => {
    setClickedImageIndex(index === clickedImageIndex ? null : index);
  };

  return (
    <div
      className="text-center"
      style={{
        width: "40%", // Adjusted width to cover 40% of the page area
        margin: "5% 0 0 5%", // 5% margin on top and 5% margin on left side
        background: "#f2f2f2",
        padding: "20px",
        borderRadius: "8px",
        position: "relative",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h2 style={{ marginTop: 0 }}>Services</h2>
      </div>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {selectedImages.map((image, index) => (
          <div
            key={index}
            style={{
              position: "relative",
              margin: "0 10px 20px", // Added margin for spacing
              width: "150px", // Fixed width for images
              height: "150px", // Fixed height for images
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "5px",
                right: "5px",
                background: "rgba(255, 255, 255, 0.5)",
                borderRadius: "50%",
                width: "25px",
                height: "25px",
                zIndex: "3",
                cursor: "pointer",
                textAlign: "center",
                lineHeight: "25px",
                visibility: clickedImageIndex === index ? "visible" : "hidden",
              }}
              onClick={() => handleDeleteImage(index)}
            >
              -
            </div>
            <img
              src={image}
              alt={"Selected " + index}
              style={{
                width: "100%",
                height: "100%", // Adjusted height to maintain aspect ratio
                objectFit: "cover",
                cursor: "pointer",
                borderRadius: "6px",
                transition: "width 0.3s ease",
              }}
              onClick={() => handleImageClick(index)}
            />
          </div>
        ))}
        {selectedImages.length < 6 && ( // Updated condition to allow maximum 6 images
          <label htmlFor="image-upload">
            <div
              style={{
                width: "150px",
                height: "150px",
                border: "1px dashed #ccc",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                margin: "0 10px 20px", // Added margin for spacing
              }}
            >
              <span style={{ fontSize: "40px" }}>+</span>
              <div style={{ fontSize: "15px" }}>Add a New Service</div>
            </div>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              style={{ display: "none" }}
            />
          </label>
        )}
      </div>
      {clickedImageIndex !== null && (
        <img
          src={selectedImages[clickedImageIndex]}
          alt={"Selected " + clickedImageIndex}
          style={{
            maxWidth: "90%", // Make sure the image fits within the container
            height: "auto",
            objectFit: "cover",
            borderRadius: "8px",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: "2",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onClick={() => handleImageClick(clickedImageIndex)}
        />
      )}
    </div>
  );
};

const PortfolioComponent = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [clickedImageIndex, setClickedImageIndex] = useState(null);

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file && selectedImages.length < 6) {
      // Updated condition to allow maximum 6 images
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImages((prevImages) => [...prevImages, reader.result]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = (index) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
    if (clickedImageIndex === index) {
      setClickedImageIndex(null);
    }
  };

  const handleImageClick = (index) => {
    setClickedImageIndex(index === clickedImageIndex ? null : index);
  };

  return (
    <div
      className="text-center"
      style={{
        width: "40%", // Adjusted width to cover 40% of the page area
        margin: "5% 0 0 5%", // 5% margin on top and 5% margin on left side
        background: "#f2f2f2",
        padding: "20px",
        borderRadius: "8px",
        position: "relative",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h2 style={{ marginTop: 0 }}>My Portfolio</h2>
      </div>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {selectedImages.map((image, index) => (
          <div
            key={index}
            style={{
              position: "relative",
              margin: "0 10px 20px", // Added margin for spacing
              width: "150px", // Fixed width for images
              height: "150px", // Fixed height for images
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "5px",
                right: "5px",
                background: "rgba(255, 255, 255, 0.5)",
                borderRadius: "50%",
                width: "25px",
                height: "25px",
                zIndex: "3",
                cursor: "pointer",
                textAlign: "center",
                lineHeight: "25px",
                visibility: clickedImageIndex === index ? "visible" : "hidden",
              }}
              onClick={() => handleDeleteImage(index)}
            >
              -
            </div>
            <img
              src={image}
              alt={"Selected " + index}
              style={{
                width: "100%",
                height: "100%", // Adjusted height to maintain aspect ratio
                objectFit: "cover",
                cursor: "pointer",
                borderRadius: "6px",
                transition: "width 0.3s ease",
              }}
              onClick={() => handleImageClick(index)}
            />
          </div>
        ))}
        {selectedImages.length < 6 && ( // Updated condition to allow maximum 6 images
          <label htmlFor="image-upload">
            <div
              style={{
                width: "150px",
                height: "150px",
                border: "1px dashed #ccc",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                margin: "0 10px 20px", // Added margin for spacing
              }}
            >
              <span style={{ fontSize: "40px" }}>+</span>
              <div style={{ fontSize: "15px" }}>Add a Certificate</div>
            </div>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              style={{ display: "none" }}
            />
          </label>
        )}
      </div>
      {clickedImageIndex !== null && (
        <img
          src={selectedImages[clickedImageIndex]}
          alt={"Selected " + clickedImageIndex}
          style={{
            maxWidth: "90%", // Make sure the image fits within the container
            height: "auto",
            objectFit: "cover",
            borderRadius: "8px",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: "2",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onClick={() => handleImageClick(clickedImageIndex)}
        />
      )}
    </div>
  );
};

const EducationComponent = () => {
  const [description, setDescription] = useState("");
  const [editing, setEditing] = useState(true);
  const bulletInputRef = useRef(null);

  const handleDescriptionChange = () => {
    const text = bulletInputRef.current.innerText;
    // Split text into lines
    const lines = text.split("\n");
    // Filter out empty lines and add bullet points to non-empty lines
    const formattedText = lines
      .filter((line) => line.trim() !== "")
      .map((line) => `${line}`)
      .join("\n");
    setDescription(formattedText);
  };

  const handleEditDescription = () => {
    setEditing(true);
  };

  const handleSaveDescription = () => {
    // Validation for description length
    // const wordCount = description.split(/\s+/).filter(Boolean).length;
    setEditing(false);
  };

  const renderDescription = () => {
    // Split the description into lines
    const lines = description.split("\n");
    // Render each line as a list item
    return (
      <ul>
        {lines.map((line, index) => (
          <li key={index}>{line}</li>
        ))}
      </ul>
    );
  };

  // const wordCount = description.split(/\s+/).filter(Boolean).length;

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
                <h5 style={{ fontSize: "22px" }}>Education</h5>
              </Col>
              <Col className="d-flex justify-content-end">
                {editing ? (
                  <Button variant="link" onClick={handleSaveDescription}>
                    Save
                  </Button>
                ) : (
                  <Button
                    variant="link"
                    onClick={handleEditDescription}
                    style={{
                      textDecoration: "underline",
                      cursor: "pointer",
                      color: "rgba(0, 0, 0, 0.5)",
                    }}
                  >
                    Edit
                  </Button>
                )}
              </Col>
            </Row>
            {!editing && !description && <p>No Education Added</p>}
            {editing ? (
              <div
                ref={bulletInputRef}
                contentEditable={true}
                placeholder="Enter your Education Here (use bullets or lists)"
                onBlur={handleDescriptionChange}
                style={{
                  width: "95%",
                  minHeight: "100px",
                  border: "1px solid #ced4da",
                  padding: "6px 12px",
                  borderRadius: "4px",
                  resize: "none",
                }}
              />
            ) : (
              renderDescription()
            )}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};
