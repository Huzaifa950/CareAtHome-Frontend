import CommonProfile from "./CommonProfile";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const PatientProfile = () => {
  return (
    <div>
      <CommonProfile pageName="Patient" />
    </div>
  );
};
export default PatientProfile;

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
