import React, { useState } from 'react';
import './searchbar.css';

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [caretakerType, setCaretakerType] = useState('all');

    const handleSearch = () => {
        onSearch(searchTerm, caretakerType);
    };

    return (
        <div className="search-container">
          <div>
          <input
                type="text"
                placeholder="Search for caretakers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
                value={caretakerType}
                onChange={(e) => setCaretakerType(e.target.value)}
            >
                <option value="all">All</option>
                <option value="child">Child Care</option>
                <option value="elderly">Elderly Care</option>
            </select>
          </div>
            
            <button class = "searchCareTaker" onClick={handleSearch}>Search</button>
        </div>
    );
}

export default SearchBar;