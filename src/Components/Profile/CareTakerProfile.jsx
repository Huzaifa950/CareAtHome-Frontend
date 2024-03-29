import CommonProfile from "./CommonProfile";
import React, { useState } from 'react'

import './CareTakerProfile.css'

// import backgroungImage from '../../bgImg.jpg';
import logoTrans from '../../logo_2.png';
import profile from '../../Assets/Images/profile.png'
// import aboutPhoto from '../../hands.jpg';

import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';

const CareTakerProfile = () => {

    const [imageSrc, setImageSrc] = useState(profile);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImageSrc(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const openFileInput = () => {
        document.getElementById('fileInput').click();
    };

    return (

        <div>

            <header>
                <div>
                    <img src={logoTrans} alt="logo" />
                </div>

                <div className='account'>
                    Account
                </div>
            </header>

            <main>
                <div className='leftDiv'>
                    <div className='profileBox'>
                        <div className='status'>
                            <h1 className='indicator'> . </h1>
                            <p>Online</p>
                        </div>
                        <div className='profileImage' onClick={openFileInput} >
                            <img id="profileImage" src={imageSrc} className='proImage' alt="profileImage" />
                            <input
                                type="file"
                                id="fileInput"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handleImageChange}
                            />
                        </div>
                        <div className='userName'>
                            <h1>Name</h1>
                            <p>UserName</p>
                        </div>
                        <button className='profileAction'>Preview CareTaker Profile</button>
                        <hr style={{ color: '#314154' }} />
                        <div className='details'>
                            <div className='location'>
                                <h3>Location :</h3>
                                <p>123</p>
                            </div>
                            <div className='membSince'>
                                <h3>Member Since :</h3>
                                <p>w34</p>
                            </div>
                        </div>
                        <div className='rightDiv'></div>
                    </div>
                    <div>
                    </div>

                </div>

            </main>

        </div>
    )
}

export default CareTakerProfile
