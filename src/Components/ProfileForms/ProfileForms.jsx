import React, { useState } from 'react';
import userImage from "../../Assets/Images/userImage.jpg"
import { ProfileForm, careTakerGroupsList, patientGroupsList } from './Common';
import { showSuccessToast } from '../Toast/ToastifyToast';

const careTakerProperties = {
    fullName: '',
    dateOfBirth: '',
    gender: '',
    biography: '',

    address: '',
    phoneNumber: '',
    emailAddress: '',

    education: '',
    experience: '',
    certifications: '',
    skills: '',

    // medicalHistory: '',
    // allergies: '',
    // medications: '',
    // primaryCarePhysician: '',

    startTime: '',
    endTime: '',
    daysAvailable: [],

    emergencyContactName: '',
    emergencyContactNumber: '',

    insuranceProvider: '',
    policyNumber: '',

    preferredLanguages: [],
    hobbiesInterests: '',
}

const patientProperties = {
    fullName: '',
    dateOfBirth: '',
    gender: '',

    address: '',
    phoneNumber: '',
    emailAddress: '',

    medicalHistory: '',
    allergies: '',
    medications: '',
    primaryCarePhysician: '',

    emergencyContactName: '',
    emergencyContactNumber: '',

    insuranceProvider: '',
    policyNumber: '',

    preferredLanguages: [],

    hobbiesInterests: '',
}

const ProfileForms = ({ isPatient }) => {
    const [image, setImage] = useState(userImage);
    const [formData, setFormData] = useState(isPatient ? patientProperties : careTakerProperties);

    const handleImageChange = (selectedImage) => {
        setImage(selectedImage);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "preferredLanguages" || name === "daysAvailable")
            handleOptionsChange(name, value);
        else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
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
        if (isPatient){
            showSuccessToast("Patient Form Submitted Successfully");
        }
        else{
            showSuccessToast("Care Taker Form Submitted Successfully");
        }
    }

    return (
        isPatient ?
            <ProfileForm
                image={image}
                formData={formData}
                groupsList={patientGroupsList}
                handleFormSubmit={handleFormSubmit}
                handleChange={handleChange}
                handleImageChange={handleImageChange}
            /> :
            <ProfileForm
                image={image}
                formData={formData}
                groupsList={careTakerGroupsList}
                handleFormSubmit={handleFormSubmit}
                handleChange={handleChange}
                handleImageChange={handleImageChange}
            />)
}

export default ProfileForms;
