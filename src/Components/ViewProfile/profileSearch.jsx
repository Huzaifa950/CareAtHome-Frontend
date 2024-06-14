import React, { useState } from 'react';
import './profileSearch.css';
import Showcase from './showCase';
import SearchBar from './searchBar';
import CaretakerProfiles from './caretakerProfile';
import { ApiPostCall } from '../ApiCall/ApiCalls';

const ProfileSearch = ({ userInfo }) => {
    const [profiles, setProfiles] = useState([]);
    const [errorType, setErrorType] = useState("")

    const searchCaretakers = async (searchTerm, caretakerType) => {
        if (searchTerm === "") {
            setProfiles([])
            return;
        }
        try {
            const response = await ApiPostCall("/careTakerSearch", { search: searchTerm, type: caretakerType });
            console.log("Care taker search response:", response)
            if (response.data) {
                if (response.data.length === 0)
                    setErrorType("length")
                else {
                    setProfiles(response.data)
                    setErrorType("")
                }
            }
        } catch (error) {
            setErrorType("error")
            console.log(error)
        }
    };

    return (
        <div className="App">
            <Showcase />
            <SearchBar onSearch={searchCaretakers} />
            <CaretakerProfiles userInfo={userInfo} errorType={errorType} profiles={profiles} />
        </div>
    );
}

export default ProfileSearch;
