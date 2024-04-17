import { DescriptionComponent, LanguageComponent, ProfileComponent } from "./CommonProfile";
import { Container, Row, Col, Image, Card, Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { ApiPostCall } from "../ApiCall/ApiCalls";
import { showErrorToast, showSuccessToast } from "../Toast/ToastifyToast";
import { formatDate } from "../Common/Common";

const PatientProfile = ({ userInfo }) => {
  const [originalPatientInfo, setOriginalPatientInfo] = useState({});
  const [patientInfo, setPatientInfo] = useState({
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
    emergencyContactName: "",
    emergencyContactNumber: "",
    languages: [],
    joiningDate: "",
    leavingDate: "",
  });

  useEffect(() => {
    const getPatientInfo = async () => {
      try {
        const result = await ApiPostCall("/getPatientInfo", { username: userInfo.username });
        if (result.data && result.data[0]) {
          console.log("Patient Info in call: ", result.data[0]);
          const patientData = {
            ...result.data[0],
            emailAddress: userInfo.email,
            languages: result.data[0].languages ? result.data[0].languages.split(",").map((lang) => lang.trim()) : []
          }
          setPatientInfo(patientData)
          setOriginalPatientInfo(patientData)
        }
      } catch (error) {
        console.error("error /getPatientInfo", error);
      }
    };
    if (userInfo.username) getPatientInfo();
  }, [userInfo]);

  const handleChange = (key, value) => {
    setPatientInfo({ ...patientInfo, [key]: value })
  }

  const updatePatientInfo = async (fieldsToUpdate) => {
    const updatedPatientInfo = { ...originalPatientInfo, ...fieldsToUpdate }
    try {
      const result = await ApiPostCall("/updatePatientInfo",
        {
          username: userInfo.username, ...updatedPatientInfo,
          dateOfBirth: formatDate(updatedPatientInfo.dateOfBirth),
          languages: updatedPatientInfo.languages.join(","),
          leavingDate: updatedPatientInfo.leavingDate ? formatDate(updatedPatientInfo.leavingDate) : ""
        });

      if (result.data) {
        setOriginalPatientInfo(updatedPatientInfo)
        console.log("Patient Info Updated: ", result.data);
        showSuccessToast("Patient Info Updated Successfully")
      }
    } catch (error) {
      showErrorToast("Error Updating Patient Info");
      console.error("error /updatePatientInfo", error);
    }
  }

  console.log("Patient Info Outside: ", patientInfo)

  return (
    <div>
      <Container>
        <Row>
          <Col xs={12} md={6}>
            <ProfileComponent
              image={patientInfo.image}
              name={patientInfo.fullName ? patientInfo.fullName : ""}
              username={patientInfo.username ? patientInfo.username : ""}
              location={patientInfo.address ? patientInfo.address : ""}
              memberSince={patientInfo.joiningDate ? new Date(patientInfo.joiningDate).getFullYear() : 0}
              handleProfileChange={handleChange} />
          </Col>
          <Col xs={12} md={6}>
            <DescriptionComponent
              desc={patientInfo.description ? patientInfo.description : ""}
              handleDescriptionChange={handleChange}
              updateDescription={updatePatientInfo} />
          </Col>
        </Row>

        <Row>
          <Col xs={12} md={6}>
            <LanguageComponent
              selectedLanguages={patientInfo.languages ? patientInfo.languages : []}
              handleLanguageChange={handleChange}
              updateLanguages={updatePatientInfo} />
          </Col>
        </Row>

      </Container>
    </div>
  );
};

const SearchBar = ({ handleChange }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        width: "80%",
        margin: "20px auto",
        borderRadius: "20px",
        backgroundColor: "#f0f0f0",
        padding: "10px",
        position: "relative",
        border: isFocused ? "1px solid black" : "none", // Add black outline if focused
      }}
    >
      <input
        type="text"
        style={{
          flex: "1",
          border: "none",
          outline: "none",
          backgroundColor: "transparent",
          paddingLeft: "30px",
        }}
        placeholder="Search Here"
        onChange={handleChange}
        onFocus={handleFocus} // Handle focus event
        onBlur={handleBlur} // Handle blur event
      />
      <FontAwesomeIcon
        icon={faSearch}
        style={{
          position: "absolute",
          left: "10px",
          opacity: "0.5",
        }}
      />
    </div>
  );
};

export default PatientProfile;
