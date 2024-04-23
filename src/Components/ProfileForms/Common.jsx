import { memo } from "react";
import { Button, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
const languagesList = [
  "English",
  "Urdu",
  "Punjabi",
  "Sindhi",
  "Pashto",
  "Balochi",
  "Saraiki",
];
const weekdaysList = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const servicesList = ["Child Care", "Old Care"];
const gendersList = ["Male", "Female", "Other"];

const patientGroupsList = {
  "Personal Information": [
    {
      label: "Full Name*",
      type: "text",
      placeholder: "Full Name",
      name: "fullName",
    },
    {
      label: "Date of Birth*",
      type: "date",
      placeholder: "Date of Birth",
      name: "dateOfBirth",
    },
    { label: "Gender", options: gendersList, name: "gender", dropdown: true },
  ],
  "Contact Information": [
    { label: "Address*", type: "text", placeholder: "Address", name: "address" },
    {
      label: "Phone Number*",
      type: "tel",
      placeholder: "Phone Number",
      name: "phoneNumber",
    },
    { label: "CNIC Image*", name: "cnicImage", image: true },
  ],
  // "Medical Information": [
  //     { label: "Medical History", type: "text", placeholder: "Medical History", name: "medicalHistory" },
  //     { label: "Allergies", type: "text", placeholder: "Allergies", name: "allergies" },
  //     { label: "Medications", type: "text", placeholder: "Medications", name: "medications" },
  //     { label: "Primary Care Physician", type: "text", placeholder: "Primary Care Physician", name: "primaryCarePhysician" }
  // ],
  "Emergency Contact": [
    {
      label: "Contact Name",
      type: "text",
      placeholder: "Contact Name",
      name: "emergencyContactName",
    },
    {
      label: "Contact Number",
      type: "tel",
      placeholder: "Contact Number",
      name: "emergencyContactNumber",
    },
  ],
  // "Insurance Information": [
  //     { label: "Insurance Provider", type: "text", placeholder: "Insurance Provider", name: "insuranceProvider" },
  //     { label: "Policy Number", type: "text", placeholder: "Policy Number", name: "policyNumber" }
  // ],
  // "Preferred Languages": [
  //     { label: "Preferred Languages", options: languagesList, name: "preferredLanguages", checkbox: true }
  // ],
  // "Hobbies and Interests": [
  //     { label: "Hobbies and Interests", placeholder: "Enter hobbies and interests", name: "hobbiesInterests", textArea: true }
  // ]
};

const careTakerGroupsList = {
  "Personal Information": [
    {
      label: "Full Name",
      type: "text",
      placeholder: "Full Name",
      name: "fullName",
    },
    {
      label: "Date of Birth",
      type: "date",
      placeholder: "Date of Birth",
      name: "dateOfBirth",
    },
    { label: "Gender", options: gendersList, name: "gender", dropdown: true },
    {
      label: "Biography",
      placeholder: "Enter Biography",
      name: "biography",
      textArea: true,
    },
  ],
  "Contact Information": [
    { label: "Address", type: "text", placeholder: "Address", name: "address" },
    {
      label: "Phone Number",
      type: "tel",
      placeholder: "Phone Number",
      name: "phoneNumber",
    },
    { label: "CNIC Image", name: "cnicImage", image: true },
  ],
  "Professional Details": [
    {
      label: "Education",
      type: "text",
      placeholder: "Education",
      name: "education",
    },
    {
      label: "Experience",
      type: "number",
      placeholder: "Experience",
      name: "experience",
    },
    {
      label: "Certifications",
      type: "text",
      placeholder: "Certifications",
      name: "certifications",
    },
    { label: "Certifications Files", name: "certificationFiles", files: true },
    { label: "Skills", type: "text", placeholder: "Skills", name: "skills" },
    {
      label: "Services",
      options: servicesList,
      name: "services",
      checkbox: true,
    },
  ],
  // "Medical Information": [
  //     { label: "Medical History", type: "text", placeholder: "Medical History", name: "medicalHistory" },
  //     { label: "Allergies", type: "text", placeholder: "Allergies", name: "allergies" },
  //     { label: "Medications", type: "text", placeholder: "Medications", name: "medications" },
  //     { label: "Primary Care Physician", type: "text", placeholder: "Primary Care Physician", name: "primaryCarePhysician" }
  // ],
  "Work Schedule and Availability": [
    {
      label: "Start Time",
      type: "time",
      placeholder: "Start Time",
      name: "startTime",
    },
    {
      label: "End Time",
      type: "time",
      placeholder: "End Time",
      name: "endTime",
    },
    {
      label: "Days Available",
      options: weekdaysList,
      name: "daysAvailable",
      checkbox: true,
    },
  ],
  "Preferred Languages": [
    {
      label: "Preferred Languages",
      options: languagesList,
      name: "preferredLanguages",
      checkbox: true,
    },
  ],
  "Emergency Contact": [
    {
      label: "Contact Name",
      type: "text",
      placeholder: "Contact Name",
      name: "emergencyContactName",
    },
    {
      label: "Contact Number",
      type: "tel",
      placeholder: "Contact Number",
      name: "emergencyContactNumber",
    },
  ],
  // "Insurance Information": [
  //     { label: "Insurance Provider", type: "text", placeholder: "Insurance Provider", name: "insuranceProvider" },
  //     { label: "Policy Number", type: "text", placeholder: "Policy Number", name: "policyNumber" }
  // ],
  // "Hobbies and Interests": [
  //     { label: "Hobbies and Interests", placeholder: "Enter hobbies and interests", name: "hobbiesInterests", textArea: true }
  // ]
};

const FormGroupItem = ({
  label,
  type,
  placeholder,
  name,
  value,
  handleChange,
}) => {
  return (
    <Form.Group>
      <Form.Label className="form-control-label">{label}</Form.Label>
      <Form.Control
        className="form-control-input"
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={handleChange}
      />
    </Form.Group>
  );
};

const ImageComponent = memo(({ name, label, image, handleImageChange }) => {
  const handleImageClick = () => {
    document.getElementById("cnicImgFile").click();
  };

  return (
    <Form.Group>
      <Form.Label className="form-control-label">{label}</Form.Label>
      <Row className="justify-content-center align-items-center">
        <Col onClick={handleImageClick}>
          <Image
            src={typeof image === "string" ? image : URL.createObjectURL(image)}
            alt="Image Alt Text"
            fluid
            style={{
              maxHeight: "100px",
              maxWidth: "80%",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          />
        </Col>
      </Row>
      <Form.Control
        name={name}
        id="cnicImgFile"
        type="file"
        accept="image/*"
        hidden
        onChange={handleImageChange}
      />
    </Form.Group>
  );
})

const FileComponent = memo(({ name, label, files, handleFileChange }) => {
  return (
    <Form.Group>
      <Form.Label className="form-control-label">{label}</Form.Label>
      <Form.Control
        name={name}
        id="fileInput"
        type="file"
        accept="image/*, .pdf, .doc, .docx"
        multiple
        onChange={handleFileChange}
      />
      <ListGroup as="ol">
        {Object.keys(files).map((key) => (
          <ListGroup.Item as="li">
            <b>{parseInt(key) + 1}. </b>
            {files[key].name}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Form.Group>
  );
})

const FormGroupDropdown = memo(({ label, name, value, options, handleChange }) => {
  return (
    <Form.Group>
      <Form.Label className="form-control-label">{label}</Form.Label>
      <Form.Control
        className="form-control-input"
        as="select"
        name={name}
        value={value}
        onChange={handleChange}
      >
        <option value="">Select {label}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  );
})

const GroupsContainer = ({ label, children }) => {
  return (
    <Form.Group className="form-group-container mb-3">
      <Form.Group
        className="px-3 py-2"
        style={{ backgroundColor: "#ddd", borderRadius: "10px" }}
      >
        <Form.Label className="form-group-title fw-bold">{label}</Form.Label>
        {children}
      </Form.Group>
    </Form.Group>
  );
};

const ItemsList = memo(({ itemList, formData, handleChange }) => {
  return Object.keys(itemList).map((group, groupIndex) => (
    <GroupsContainer
      key={groupIndex}
      label={group}
      children={itemList[group].map((item, index) => (
        <>
          {item.files ? (
            <FileComponent
              key={index}
              label={item.label}
              name={item.name}
              files={formData[item.name]}
              handleFileChange={handleChange}
            />
          ) : item.image ? (
            <ImageComponent
              key={index}
              label={item.label}
              name={item.name}
              handleImageChange={handleChange}
              image={formData[item.name]}
            />
          ) : item.dropdown ? (
            <FormGroupDropdown
              key={index}
              label={item.label}
              name={item.name}
              value={formData[item.name]}
              options={item.options}
              handleChange={handleChange}
            />
          ) : item.checkbox ? (
            <CheckboxForm
              key={index}
              options={item.options}
              name={item.name}
              selectedOptions={formData[item.name]}
              onOptionChange={handleChange}
            />
          ) : item.textArea ? (
            <Form.Control
              as="textarea"
              className="mt-2"
              rows={3}
              placeholder={item.placeholder}
              name={item.name}
              value={formData[item.name]}
              onChange={handleChange}
            />
          ) : (
            <FormGroupItem
              key={index}
              label={item.label}
              type={item.type}
              placeholder={item.placeholder}
              name={item.name}
              value={formData[item.name]}
              handleChange={handleChange}
            />
          )}
        </>
      ))}
    />
  ));
})

const CheckboxForm = memo(({ options, name, selectedOptions, onOptionChange }) => {
  return (
    <>
      <div style={{ marginTop: "15px" }}></div>
      {options.map((option) => (
        <Form.Check
          key={option}
          type="checkbox"
          label={option}
          name={name}
          value={option.toLowerCase()}
          checked={selectedOptions.includes(option.toLowerCase())}
          onChange={onOptionChange}
        />
      ))}
    </>
  );
})

const RoundImageForm = memo(({ image, onImageChange }) => {
  const handleImageClick = () => {
    document.getElementById("imageUpload").click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    onImageChange(selectedFile);
  };

  return (
    <Form.Group className="form-group-container text-center">
      <div
        className="rounded-circle overflow-hidden mx-auto mb-3"
        style={{ width: "150px", height: "150px", cursor: "pointer" }}
        onClick={handleImageClick}
      >
        <Image
          src={typeof image === "string" ? image : URL.createObjectURL(image)}
          alt="Profile Image"
          className="w-100 h-100"
          roundedCircle
        />
      </div>
      <Form.Control
        id="imageUpload"
        type="file"
        accept="image/*"
        hidden
        onChange={handleFileChange}
      />
    </Form.Group>
  );
})

const ProfileForm = ({
  image,
  groupsList,
  formData,
  handleFormSubmit,
  handleChange,
  handleImageChange,
}) => {
  return (
    <Form onSubmit={handleFormSubmit}>
      <RoundImageForm image={image} onImageChange={handleImageChange} />

      <ItemsList
        itemList={groupsList}
        formData={formData}
        handleChange={handleChange}
      />

      <Button variant="primary" type="submit" className="float-end">
        Submit
      </Button>
    </Form>
  );
};

export {
  patientGroupsList,
  careTakerGroupsList,
  languagesList,
  FormGroupItem,
  FormGroupDropdown,
  GroupsContainer,
  ItemsList,
  RoundImageForm,
  ProfileForm,
};
