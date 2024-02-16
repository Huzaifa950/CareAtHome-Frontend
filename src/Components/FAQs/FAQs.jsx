import './FAQs.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';

const questionAnswers = [
    {
        question: "What is the primary purpose of this website for caretakers and patients?",
        answer: "Our website serves as a platform connecting patients in need of caregiving services with qualified and experienced caretakers. It provides a secure and efficient environment for both parties to create profiles, connect, and engage in caregiving arrangements."
    },
    {
        question: "How can patients benefit from using this platform?",
        answer: "Patients can leverage our platform to discover and hire skilled caretakers based on their specific needs. The website allows patients to review caretaker profiles, assess qualifications, and make informed decisions about selecting the most suitable caregiver for their unique requirements."
    },
    {
        question: "Can I communicate with caretakers before making a booking?",
        answer: "Absolutely! We encourage communication between users. Our platform provides a messaging system, enabling you to discuss care requirements, ask questions, and ensure compatibility before finalizing a booking. Open communication contributes to a smoother caregiving experience."
    },
    {
        question: "How are caretaker ratings determined?",
        answer: "Caretaker ratings are solely based on feedback provided by patients after each service. These ratings offer valuable insights into the quality of care provided, ensuring transparency and accountability within our community. Positive ratings contribute to a caretaker's credibility on the platform."
    },
    {
        question: "What is the primary purpose of this website for caretakers and patients?",
        answer: "Our website serves as a platform connecting patients in need of caregiving services with qualified and experienced caretakers. It provides a secure and efficient environment for both parties to create profiles, connect, and engage in caregiving arrangements."
    },
    {
        question: "How do I report any issues or concerns?",
        answer: "If you encounter any problems or have concerns, our dedicated support team is here to assist you. Contact us through the designated channels, and we will promptly address your inquiries, ensuring a positive experience for all users. Your feedback is valuable in maintaining the quality of our caregiving community."
    }
]

function FAQs() {

    const [visibleTextIndex, setVisibleTextIndex] = useState(-1);
    const [rotation, setRotation] = useState(0);

    const toggleText = (id) => {
        if (visibleTextIndex === id) {
            setVisibleTextIndex(-1);
            // setRotation(0);
            return;
        }
        setVisibleTextIndex(id);
        // setRotation(rotation + 270);
    };

    return (
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

                            {
                                questionAnswers.map((item, index) => {
                                    return (
                                        <>
                                            <div key={index} className='FAQs_containerBoxRightSideBodyQuestion'>
                                                <div className='FAQs_Question'>
                                                    <p>{item.question}</p>
                                                </div>
                                                <div className='FAQs_Icon' id="icon" onClick={() => toggleText(index)} >
                                                    <FontAwesomeIcon icon={faChevronLeft} />
                                                </div>
                                            </div>
                                            <hr />
                                            {visibleTextIndex === index && (
                                                <div className='FAQs_containerBoxRightSideBodyAnswer' id='text' >
                                                    <p>{item.answer}</p>
                                                </div>
                                            )}
                                        </>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FAQs













