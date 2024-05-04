import "./CareTakerProfile.css";

import {
  capitalizeEachWord,
  formatDate,
  escapeString,
  unescapeString,
  uploadImageToImgBB,
} from "../Common/Common";
import { ApiPostCall } from "../ApiCall/ApiCalls";
import { useState, useRef, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ListGroup,
  Form,
  Image,
  Dropdown,
} from "react-bootstrap";
import { showErrorToast, showSuccessToast } from "../Toast/ToastifyToast";
import {
  DescriptionComponent,
  LanguageComponent,
  ProfileComponent,
} from "./CommonProfile";
import {
  getSingleFileFromDropbox,
  uploadSingleFileToDropbox,
} from "../../Dropbox/HandleFiles";
import PopUpModal from "../Modal/PopUpModal";

const CareTakerProfile = ({ userInfo }) => {
  const [originalCareTakerInfo, setOriginalCareTakerInfo] = useState({});
  const [careTakerInfo, setCareTakerInfo] = useState({
    username: userInfo.username,
    image: "",
    fullName: "",
    description: "",
    dateOfBirth: "",
    emailAddress: userInfo.emailAddress,
    gender: "",
    address: "",
    phoneNumber: "",
    cnicImage: "",
    education: "",
    certifications: "",
    experience: "",
    certificationFiles: [],
    skills: [],
    careType: [],
    workStartTime: "",
    workEndTime: "",
    workWeeks: [],
    emergencyContactName: "",
    emergencyContactNumber: "",
    languages: [],
    joiningDate: "",
    leavingDate: "",
  });

  useEffect(() => {
    const getCareTakerInfo = async () => {
      try {
        const result = await ApiPostCall("/getCareTakerInfo", {
          username: userInfo.username,
        });
        if (result.data && result.data[0]) {
          const careTakerData = {
            ...result.data[0],
            emailAddress: userInfo.email,
            certificationFiles: result.data[0].certificationFiles
              ? result.data[0].certificationFiles.split(",")
              : [],
            skills: result.data[0].skills
              ? result.data[0].skills.split(",").map((skill) => skill.trim())
              : [],
            careType: result.data[0].careType
              ? result.data[0].careType.split(",").map((type) => type.trim())
              : [],
            workWeeks: result.data[0].workWeeks
              ? result.data[0].workWeeks.split(",").map((day) => day.trim())
              : [],
            languages: result.data[0].languages
              ? result.data[0].languages
                .split(",")
                .map((lang) => capitalizeEachWord(lang.trim()))
              : [],
          };

          const certificationOriginalFiles = [];
          for (let i = 0; i < careTakerData.certificationFiles.length; i++) {
            const filePath = careTakerData.certificationFiles[i];
            const file = await getSingleFileFromDropbox(filePath);
            file.dropboxPath = filePath;
            certificationOriginalFiles.push(file);
          }
          careTakerData.certificationFiles = certificationOriginalFiles;
          careTakerData.description = unescapeString(careTakerData.description);

          console.log("Full care taker info: ", careTakerData);

          setCareTakerInfo(careTakerData);
          setOriginalCareTakerInfo(careTakerData);
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (userInfo.username) getCareTakerInfo();
  }, [userInfo]);

  const handleChange = (key, value) => {
    setCareTakerInfo((prevInfo) => ({ ...prevInfo, [key]: value }));
  };

  const updateCareTakerInfo = async (fieldsToUpdate) => {
    console.log("Fields to Update: ", fieldsToUpdate);
    const updatedCareTakerInfo = {
      ...originalCareTakerInfo,
      ...fieldsToUpdate,
    };
    updatedCareTakerInfo.description = escapeString(updateCareTakerInfo.description);
    const filesWithPath = updatedCareTakerInfo.certificationFiles;
    
    console.log("Updated CareTaker Info: ", updatedCareTakerInfo);
    
    const updatedCertificationFiles = [];
    for (let i = 0; i < updatedCareTakerInfo.certificationFiles.length; i++) {
      const file = updatedCareTakerInfo.certificationFiles[i];
      const originalFile = originalCareTakerInfo.certificationFiles.find(
        (originalFile) => originalFile.name === file.name
      );
      if (originalFile) {
        updatedCertificationFiles.push(originalFile.dropboxPath);
      } else {
        const filePath = await uploadSingleFileToDropbox(file);
        filesWithPath[i].dropboxPath = filePath;
        updatedCertificationFiles.push(filePath);
      }
    }
    updatedCareTakerInfo.certificationFiles =
      updatedCertificationFiles.join(",");

    console.log(
      "Updated Certification Files: ",
      updatedCertificationFiles.join(",")
    );

    console.log("Certification process Ok");
    
    try {
      console.log("Making APi request");
      const result = await ApiPostCall("/updateCareTakerInfo", {
        username: userInfo.username,
        ...updatedCareTakerInfo,
        dateOfBirth: formatDate(updatedCareTakerInfo.dateOfBirth),
        skills: updatedCareTakerInfo.skills.join(","),
        careType: updatedCareTakerInfo.careType.join(","),
        workWeeks: updatedCareTakerInfo.workWeeks.join(","),
        languages: updatedCareTakerInfo.languages.join(","),
        leavingDate: updatedCareTakerInfo.leavingDate
        ? formatDate(updatedCareTakerInfo.leavingDate)
          : "",
      });
      
      updatedCareTakerInfo.description = unescapeString(updateCareTakerInfo.description);
      if (result.data) {
        setOriginalCareTakerInfo({
          ...updatedCareTakerInfo,
          certificationFiles: filesWithPath,
        });
        console.log("CareTaker Info Updated: ", result.data);
        showSuccessToast("CareTaker Info Updated Successfully");
      }
    } catch (error) {
      showErrorToast("Error Updating CareTaker Info");
      console.error(error);
    }
  };

  return (
    <div>
      <Row>
        <Col xs={12} md={6}>
          <ProfileComponent
            image={careTakerInfo.image}
            name={careTakerInfo.fullName ? careTakerInfo.fullName : ""}
            username={careTakerInfo.username ? careTakerInfo.username : ""}
            location={careTakerInfo.address ? careTakerInfo.address : ""}
            memberSince={
              careTakerInfo.joiningDate
                ? new Date(careTakerInfo.joiningDate).getFullYear()
                : 0
            }
            handleProfileChange={handleChange}
          />
        </Col>
        <Col xs={12} md={6}>
          <DescriptionComponent
            desc={careTakerInfo.description ? careTakerInfo.description : ""}
            handleDescriptionChange={handleChange}
            updateDescription={updateCareTakerInfo}
          />
        </Col>
      </Row>

      <Row>
        <Col xs={12} md={6}>
          <LanguageComponent
            selectedLanguages={
              careTakerInfo.languages ? careTakerInfo.languages : []
            }
            handleLanguageChange={handleChange}
            updateLanguages={updateCareTakerInfo}
          />
        </Col>
        <Col xs={12} md={6}>
          <EducationComponent />
        </Col>
      </Row>

      <Row>
        <Col>
          <PortfolioComponent />
        </Col>
      </Row>

      <Row>
        <Col>
          <MyServicesComponent username={userInfo.username} />
        </Col>
      </Row>
    </div>
  );
};

const MyServicesComponent = ({ username }) => {
  const [services, setServices] = useState([]);
  const [showAddServiceForm, setShowAddServiceForm] = useState(false);
  const [formComponent, setFormComponent] = useState(null);
  const [formData, setFormData] = useState(null);

  const onFormClose = () => {
    setShowAddServiceForm(false);
  };
  const onFormOpen = () => {
    setShowAddServiceForm(true);
  };

  useEffect(() => {
    if (!formData) {
      return;
    }
    if (formData.isEdit) {
      const { isEdit, ...otherFormData } = formData;
      console.log("other form data is: ", otherFormData);
      setServices((prevSer) =>
        prevSer.map((ser) => (ser.id === formData.id ? otherFormData : ser))
      );
    } else {
      setServices((prevSer) => [...prevSer, formData]);
    }
    onFormClose();
    setFormData(null);
  }, [formData]);

  useEffect(() => {
    const getServices = async () => {
      try {
        const result = await ApiPostCall("/getServicesOfCareTaker", {
          username,
        });
        console.log("Services of care taker: ", result);
        if (result.data) {
          setServices(result.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getServices();
  }, []);

  const onAddService = () => {
    setFormComponent(
      <AddServiceForm setFormData={setFormData} username={username} />
    );
    onFormOpen();
  };

  const handleServiceEdit = (service) => {
    setFormComponent(
      <AddServiceForm
        setFormData={setFormData}
        username={username}
        data={service}
      />
    );
    onFormOpen();
  };

  const handleServiceDelete = async (service) => {
    try {
      const result = await ApiPostCall("/deleteService", { id: service.id });
      if (result.status === 200) {
        setServices((prevServices) =>
          prevServices.filter((ser) => ser.id !== service.id)
        );
        showSuccessToast("Service deleted successfully");
      }
    } catch (error) {
      showErrorToast("Error deleting service");
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Card style={{ minHeight: "300px" }}>
        <Card.Header
          style={{
            backgroundColor: "#666",
            color: "white",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          My Services
        </Card.Header>

        <Card.Body>
          {services.length > 0 ? (
            <div>
              <ListGroup
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-around",
                  gap: "20px",
                  flexDirection: "row",
                }}
              >
                {services.map((service, index) => (
                  <ServiceCard
                    key={index}
                    dropdownOptionsShow={true}
                    handleEdit={handleServiceEdit}
                    handleDelete={handleServiceDelete}
                    {...service}
                  />
                ))}

                <AddServiceButton onAddServiceClick={onAddService} />
              </ListGroup>
            </div>
          ) : (
            <div
              style={{ minHeight: "250px" }}
              className="d-flex justify-content-center align-items-center"
            >
              <AddServiceButton onAddServiceClick={onAddService} />
            </div>
          )}
        </Card.Body>
      </Card>

      <PopUpModal
        show={showAddServiceForm}
        title={"Add a Service"}
        handleClose={onFormClose}
        children={formComponent}
      />
    </div>
  );
};

const ServiceCard = ({
  id,
  image,
  title,
  description,
  price,
  duration,
  duration_unit,
  dropdownOptionsShow,
  handleEdit,
  handleDelete,
}) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleToggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleEditClick = () => {
    setShowOptions(false);
    handleEdit({
      id,
      image,
      title,
      description,
      price,
      duration,
      duration_unit,
    });
  };

  const handleDeleteClick = () => {
    setShowOptions(false);
    handleDelete({
      id,
      image,
      title,
      description,
      price,
      duration,
      duration_unit,
    });
  };

  const handleDropdownHide = () => {
    setShowOptions(false);
  };

  return (
    <Card style={{ width: "24rem" }}>
      <Card.Img
        style={{ maxHeight: "230px", minHeight: "230px" }}
        variant="top"
        src={image}
      />
      <Card.Body>
        <Card.Title className="clip-text clip-2-lines-text">{title}</Card.Title>
        <hr />
        <Card.Text className="clip-text clip-2-lines-text">
          {description}
        </Card.Text>
        <hr />
        <Card.Text
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <b>Price:</b>
          <span>Rs. {price}</span>
        </Card.Text>
        <hr />
        <Card.Text
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <b>Duration:</b>
          <span>
            {duration} {capitalizeEachWord(duration_unit)}
          </span>
        </Card.Text>

        {dropdownOptionsShow && (
          <div style={{ position: "absolute", top: "10px", right: "10px" }}>
            <Dropdown alignRight show={showOptions} onHide={handleDropdownHide}>
              <Dropdown.Toggle
                as="span"
                id="dropdown-basic"
                onClick={handleToggleOptions}
                style={{
                  cursor: "pointer",
                  textDecoration: "none",
                  color: "inherit",
                  border: "none",
                  background: "transparent",
                  padding: 0,
                  margin: 0,
                  fontSize: "inherit",
                }}
              >
                &#8942;
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={handleEditClick}>Edit</Dropdown.Item>
                <Dropdown.Item onClick={handleDeleteClick}>
                  Delete
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

const AddServiceForm = ({ setFormData, username, data }) => {
  const [image, setImage] = useState(data ? data.image : "");
  const [title, setTitle] = useState(data ? data.title : "");
  const [description, setDescription] = useState(data ? data.description : "");
  const [serviceType, setServiceType] = useState(data ? data.serviceType : "");
  const [price, setPrice] = useState(data ? data.price : "");
  const [durationValue, setDurationValue] = useState(data ? data.duration : "");
  const [durationUnit, setDurationUnit] = useState(
    data ? data.duration_unit : "day"
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !image ||
      !title ||
      !price ||
      !durationValue ||
      !durationUnit ||
      !description
    )
      showErrorToast("Please fill all fields");
    else if (price < 0) showErrorToast("Price cannot be negative");
    else if (durationValue < 0) showErrorToast("Duration cannot be negative");
    else {
      const formData = {
        username,
        title,
        price,
        duration: durationValue,
        duration_unit: durationUnit,
        description,
        serviceType,
      };
      if (data) {
        try {
          let imageLink = image;
          if (data.image !== image) {
            imageLink = await uploadImageToImgBB(image);
            if (!imageLink) {
              showErrorToast("Something went wrong");
              return;
            }
          }
          formData.image = imageLink;
          formData.id = data.id;
          formData.isEdit = true;
          const result = await ApiPostCall("/updateServiceInfo", formData);
          if (result.status === 200) {
            showSuccessToast("Service updated successfully");
            setFormData(formData);
          } else {
            showErrorToast("Error updating service");
          }
        } catch (error) {
          showErrorToast("Error updating service");
          console.log(error);
        }
      } else {
        try {
          console.log("Uploading image");
          const imageLink = await uploadImageToImgBB(image);
          if (!imageLink) {
            showErrorToast("Something went wrong");
            return;
          }
          console.log("Uploading done");
          formData.image = imageLink;

          const result = await ApiPostCall("/addService", formData);
          formData.id = result.data[0][0].id;

          if (
            result.data &&
            result.data[0] &&
            result.data[0][0] &&
            result.data[0][0].id
          ) {
            showSuccessToast("Service added successfully");
            setFormData(formData);
          } else {
            showErrorToast("Error adding service");
          }
        } catch (error) {
          showErrorToast("Error adding service");
          console.log(error);
        }
      }
    }
  };

  const handleImageClick = () => {
    document.getElementById("cnicImgFile").click();
  };

  const handleServiceType = (type) => {
    if (serviceType.split(' ').includes(type)) {
      setServiceType(serviceType.replace(type, "").trim());
    } else {
      setServiceType(serviceType + " " + type);
    }
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group style={{ marginBottom: "20px" }}>
          <Row className="justify-content-center align-items-center">
            <Col onClick={handleImageClick}>
              {image ? (
                <Image
                  src={
                    typeof image === "string"
                      ? image
                      : URL.createObjectURL(image)
                  }
                  alt="Image Alt Text"
                  fluid
                  style={{
                    maxHeight: "200px",
                    width: "100%",
                    borderRadius: "10px",
                    cursor: "pointer",
                  }}
                />
              ) : (
                <div
                  style={{
                    minHeight: "200px",
                    backgroundColor: "#ddd",
                    borderRadius: "10px",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <b>Add Service Image</b>
                </div>
              )}
            </Col>
          </Row>

          <Form.Control
            name={"The name goes here"}
            id="cnicImgFile"
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />
        </Form.Group>

        <Form.Group controlId="title" style={{ marginBottom: "20px" }}>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="price" style={{ marginBottom: "20px" }}>
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="duration" style={{ marginBottom: "20px" }}>
          <Form.Label>Duration</Form.Label>
          <Row>
            <Col>
              <Form.Control
                type="number"
                placeholder="Enter duration"
                value={durationValue}
                onChange={(e) => setDurationValue(e.target.value)}
              />
            </Col>
            <Col>
              <Form.Control
                as="select"
                value={durationUnit}
                onChange={(e) => setDurationUnit(e.target.value)}
              >
                <option value="day">Day</option>
                <option value="week">Week</option>
                <option value="month">Month</option>
                <option value="year">Year</option>
              </Form.Control>
            </Col>
          </Row>
        </Form.Group>

        <Form.Group controlId="description" style={{ marginBottom: "20px" }}>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="serviceType" style={{ marginBottom: "20px" }}>
          <Form.Label>Service Type</Form.Label>
          <div>
            <Form.Check
              type="checkbox"
              id="childCheckbox"
              label="Child"
              checked={serviceType.split(' ').includes("child")}
              onChange={() => handleServiceType("child")}
            />
            <Form.Check
              type="checkbox"
              id="oldCheckbox"
              label="Old"
              checked={serviceType.split(' ').includes("old")}
              onChange={() => handleServiceType("old")}
            />
          </div>
        </Form.Group>

        <Button style={{ float: "right" }} variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

const AddServiceButton = ({ onAddServiceClick }) => {
  return (
    <div
      onClick={onAddServiceClick}
      style={{
        width: "150px",
        height: "150px",
        border: "1px dashed #ccc",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        margin: "0 10px 20px",
      }}
    >
      <span style={{ fontSize: "40px" }}>+</span>
      <div style={{ fontSize: "15px" }}>Add a New Service</div>
    </div>
  );
};

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
        width: "100%",
        margin: "5% 0 0 5%",
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
  const [showOptions, setShowOptions] = useState(false);
  const [optionsPosition, setOptionsPosition] = useState({});

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file && selectedImages.length < 6) {
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
      setShowOptions(false);
    }
  };

  const handleImageOptionsClick = (event, index) => {
    const imageRect = event.target.getBoundingClientRect();
    const position = {
      top: imageRect.top + window.scrollY,
      left: imageRect.left + window.scrollX,
    };
    setOptionsPosition(position);
    setClickedImageIndex(index);
    setShowOptions(true);
  };

  const handleEditImage = () => {
    // Placeholder for edit functionality
    console.log("Edit image");
    setShowOptions(false);
  };

  const handleImageClick = (index) => {
    setShowOptions(false);
    setClickedImageIndex(index === clickedImageIndex ? null : index);
  };

  return (
    <div
      className="text-center"
      style={{
        margin: "5%",
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
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        {selectedImages.map((image, index) => (
          <div
            key={index}
            style={{
              position: "relative",
              margin: "20px 0",
              height: "250px",
              width: "22rem",
            }}
          >
            {index === clickedImageIndex && showOptions && (
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
                }}
                onClick={(e) => handleImageOptionsClick(e, index)}
              >
                ...
              </div>
            )}
            <img
              src={image}
              alt={"Selected " + index}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                cursor: "pointer",
                borderRadius: "6px",
                transition: "width 0.3s ease",
              }}
              onClick={() => handleImageClick(index)}
            />
          </div>
        ))}
        {selectedImages.length < 6 && (
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
                margin: "40px 20px",
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
      {showOptions && (
        <div
          style={{
            position: "fixed",
            top: optionsPosition.top + "px",
            left: optionsPosition.left + "px",
            background: "rgba(255, 255, 255, 0.9)",
            borderRadius: "4px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            padding: "10px",
            zIndex: "10",
          }}
        >
          <div
            style={{ cursor: "pointer", marginBottom: "10px" }}
            onClick={() => handleDeleteImage(clickedImageIndex)}
          >
            Remove
          </div>
          <div style={{ cursor: "pointer" }} onClick={handleEditImage}>
            Edit
          </div>
        </div>
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
    setEditing(false);
  };

  const renderDescription = () => {
    const lines = description.split("\n");
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
        margin: "5% 5% 0 5%",
        borderRadius: "5px",
      }}
    >
      <Container>
        <Card>
          <Card.Body style={{ backgroundColor: "#f2f2f2" }}>
            <Row
              style={{
                display: "flex",
                justifyContent: "space-between",
                maxWidth: "100%",
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

export default CareTakerProfile;
