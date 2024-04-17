import { useState } from "react";
import userImage from "../../Assets/Images/userImage.jpg";
import cnicPic from "../../Assets/Images/cnic.png";
import { ProfileForm, careTakerGroupsList, patientGroupsList } from "./Common";
import { showErrorToast, showSuccessToast, showWarningToast } from "../Toast/ToastifyToast";
import { alphabetRegex, alphabetWithSpaceRegex, emailRegex, fileToBase64, uploadImageToImgBB, validateRegex } from "../Common/Common";
import { ApiPostCall } from "../ApiCall/ApiCalls";

const careTakerProperties = {
  fullName: "",
  dateOfBirth: "",
  gender: "",
  biography: "",

  address: "",
  phoneNumber: "",
  cnicImage: cnicPic,

  education: "",
  experience: "",
  certifications: "",
  certificationFiles: [],
  skills: "",
  services: [],

  // medicalHistory: '',
  // allergies: '',
  // medications: '',
  // primaryCarePhysician: '',

  startTime: "",
  endTime: "",
  daysAvailable: [],

  emergencyContactName: "",
  emergencyContactNumber: "",

  insuranceProvider: "",
  policyNumber: "",

  preferredLanguages: [],
  hobbiesInterests: "",
};

const patientProperties = {
  fullName: "",
  dateOfBirth: "",
  gender: "",

  address: "",
  phoneNumber: "",
  cnicImage: cnicPic,

  // medicalHistory: '',
  // allergies: '',
  // medications: '',
  // primaryCarePhysician: '',

  emergencyContactName: "",
  emergencyContactNumber: "",

  // insuranceProvider: '',
  // policyNumber: '',

  // preferredLanguages: [],

  // hobbiesInterests: '',
};

const ProfileForms = ({ isPatient, userInfo, setUserInfo }) => {
  const [image, setImage] = useState(userImage);
  const [formData, setFormData] = useState(
    isPatient ? patientProperties : careTakerProperties
  );

  const handleImageChange = (selectedImage) => {
    setImage(selectedImage);
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (
      name === "preferredLanguages" ||
      name === "daysAvailable" ||
      name === "services"
    ) {
      handleOptionsChange(name, value);
      return;
    } else if (name === "cnicImage") value = e.target.files[0];
    else if (name === "certificationFiles") {
      value = e.target.files;
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOptionsChange = (name, value) => {
    const updatedOptions = formData[name].includes(value)
      ? formData[name].filter((lang) => lang !== value)
      : [...formData[name], value];

    setFormData((prevData) => ({
      ...prevData,
      [name]: updatedOptions,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isPatient) {
      handlePatientFormSubmit();
    } else {
      handleCareTakerFormSubmit();
    }
  };

  const handlePatientFormSubmit = async () => {

    if (image === userImage)
      showWarningToast("Please upload your Profile Image");
    else if (formData.fullName === "")
      showWarningToast("Please enter your Full Name");
    else if (formData.dateOfBirth === "")
      showWarningToast("Please enter your Date of Birth");
    else if (formData.address === "")
      showWarningToast("Please enter your Address");
    else if (formData.phoneNumber === "")
      showWarningToast("Please enter your Phone Number");
    else if (formData.cnicImage === cnicPic)
      showWarningToast("Please upload your CNIC Image");
    else if (formData.emergencyContactName === "")
      showWarningToast("Please enter your Emergency Contact Name");
    else if (formData.emergencyContactNumber === "")
      showWarningToast("Please enter your Emergency Contact Number");
    else if (!validateRegex(formData.fullName, alphabetWithSpaceRegex))
      showWarningToast("Invalid Full Name");
    else if (new Date(formData.dateOfBirth) > new Date())
      showWarningToast("Invalid Date of Birth");
    else if (formData.phoneNumber.length < 11)
      showWarningToast("Invalid Phone Number");
    else if (!validateRegex(formData.emergencyContactName, alphabetWithSpaceRegex))
      showWarningToast("Invalid Emergency Contact Name");
    else if (formData.emergencyContactNumber.length < 11)
      showWarningToast("Invalid Emergency Contact Number");
    else {
      console.log("Patient Form Submitted", formData);
      try {
        const imageLink = await uploadImageToImgBB(image);
        const cnicImageLink = await uploadImageToImgBB(formData.cnicImage);
        const result = await ApiPostCall("/addPatient", { username: userInfo.username, image: imageLink, ...formData, cnicImage: cnicImageLink });
        console.log("Result After Patient Form Submission", result)
        if (result.status === 200) {
          setUserInfo({ ...userInfo, roleId: 2 })
          showSuccessToast("Patient Form Submitted Successfully")
        }
      } catch (error) {
        showErrorToast("Error Submitting Patient Form");
      }
    }
  }

  const handleCareTakerFormSubmit = () => {
    console.log("Care Taker Form Submitted", formData);
    showSuccessToast("Care Taker Form Submitted Successfully");
  }

  return isPatient ? (
    <ProfileForm
      image={image}
      formData={formData}
      groupsList={patientGroupsList}
      handleFormSubmit={handleFormSubmit}
      handleChange={handleChange}
      handleImageChange={handleImageChange}
    />
  ) : (
    <ProfileForm
      image={image}
      formData={formData}
      groupsList={careTakerGroupsList}
      handleFormSubmit={handleFormSubmit}
      handleChange={handleChange}
      handleImageChange={handleImageChange}
    />
  );
};

export default ProfileForms;
