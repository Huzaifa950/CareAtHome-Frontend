import './FAQs.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from 'react';


function FAQs(){

    const [isTextVisible, setIsTextVisible] = useState(false);
    const [rotation, setRotation] = useState(0);

    const toggleText = () => {
        setIsTextVisible(!isTextVisible);

        setRotation(rotation + 270);
    };

    return(
        <div className='FAQs_main'>
            <div className='FAQs_container'>
                <div className='FAQs_containerBox'>
                    <div className='FAQs_containerBoxLeftSide'>
                        <div className='FAQs_containerBoxLeftSideTransparent'>
                        </div>
                    </div>
                    <div className='FAQs_containerBoxRightSide'>
                        <div className='FAQs_containerBoxRightSideHead'>
                            <p>FAQs</p>
                        </div>
                        <div className='FAQs_containerBoxRightSideBody'>
                            <div className='FAQs_containerBoxRightSideBodyQuestion'>
                                <div className='FAQs_Question'>
                                    <p>What is the primary purpose of this website for caretakers and patients?</p>
                                </div>
                                <div className='FAQs_Icon' id="icon" onClick={toggleText} >
                                    <FontAwesomeIcon icon={faChevronLeft}/>
                                </div>
                            </div>
                            <hr />
                            {isTextVisible && (
                                <div className='FAQs_containerBoxRightSideBodyAnswer' id='text' >
                                    <p>Our website serves as a platform connecting patients in need of caregiving services with qualified and experienced caretakers. It provides a secure and efficient environment for both parties to create profiles, connect, and engage in caregiving arrangements.</p>
                                </div>
                            )}
                            <div className='FAQs_containerBoxRightSideBodyQuestion'>
                                <div className='FAQs_Question'>
                                    <p>How can patients benefit from using this platform?</p>
                                </div>
                                <div className='FAQs_Icon' id="icon" onClick={toggleText}>
                                    <FontAwesomeIcon icon={faChevronLeft} />
                                </div>
                            </div>
                            <hr />
                            {isTextVisible && (
                                <div className='FAQs_containerBoxRightSideBodyAnswer' id='text' >
                                    <p>Patients can leverage our platform to discover and hire skilled caretakers based on their specific needs. The website allows patients to review caretaker profiles, assess qualifications, and make informed decisions about selecting the most suitable caregiver for their unique requirements.</p>
                                </div>
                            )}
                            <div className='FAQs_containerBoxRightSideBodyQuestion'>
                                <div className='FAQs_Question'>
                                    <p>What is the primary purpose of this website for caretakers and patients?</p>
                                </div>
                                <div className='FAQs_Icon' id="icon" onClick={toggleText}>
                                    <FontAwesomeIcon icon={faChevronLeft} />
                                </div>
                            </div>
                            <hr />
                            {isTextVisible && (
                                <div className='FAQs_containerBoxRightSideBodyAnswer' id='text' >
                                    <p>Our website serves as a platform connecting patients in need of caregiving services with qualified and experienced caretakers. It provides a secure and efficient environment for both parties to create profiles, connect, and engage in caregiving arrangements.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FAQs













