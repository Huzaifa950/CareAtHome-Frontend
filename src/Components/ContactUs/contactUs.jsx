import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faPhone, faPaperPlane, faEarthAmericas} from "@fortawesome/free-solid-svg-icons";
import './contactUs.css'
import emailjs from '@emailjs/browser';
import React, { useRef} from 'react'


  

function ContactUs(){

    const form = useRef();

    const sendEmail = (e) => {
      e.preventDefault();
  
      emailjs.sendForm('service_r3lhvx8', 'template_p6tl1fa', form.current, {
          publicKey: '02kIoBq_XrkSX3G0y',
        })
        .then(
          () => {
            console.log('SUCCESS!');
          },
          (error) => {
            console.log('FAILED...', error.text);
          },
        );
    };


    return(
        <div className='contactUs_main'>
            <div className='contactUs_container'>
                <div className='contactUs_containerBox'>
                    <div className='contactUs_form_map'>
                        <div className='contactUs_formMain'>
                            <form className="contactUs_form" ref={form} onSubmit={sendEmail}>
                                <div className='contactUs_Heading'>
                                    <p>Contact Us</p>
                                </div>
                                <div className='contactUs_nameEmail'>
                                    <div className='contactUs_Name'>
                                        <label htmlFor="contactUs_fullName">Full Name</label>
                                        <input className='contactUs_NameInputBar' type='text' id="" name="from_name" placeholder='Name' required />
                                    </div>
                                    <div className='contactUs_Email'>
                                        <label htmlFor="">Email Address</label>
                                        <input className='contactUs_EmailInputBar' type='text' id="" name="from_email" placeholder='Email' required />
                                    </div>
                                </div>
                                <div className='contactUs_Subject'>
                                    <label htmlFor="">Subject</label>
                                    <input className='contactUs_SubjectInputBar' type='text' id="" name="" placeholder='Subject' required />
                                </div>
                                <div className='contactUs_Message'>
                                    <label htmlFor="">Message</label>
                                    <textarea className='contactUs_MessageInputBar' name="message" id="" cols="30" rows="5" placeholder='Message'></textarea>
                                </div>
                                <div className='contactUs_button'>
                                    <button ref={form} onClick={sendEmail}>Send Message</button>
                                </div>
                            </form>
                        </div>
                        <div className='contactUs_map'>
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3399.2148168640297!2d74.30528357472872!3d31.573156544533767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39191ca6eeacbc8b%3A0xf0c436e69e66658!2sGovernment%20College%20University%20Lahore%20(GCUL)!5e0!3m2!1sen!2s!4v1708081394144!5m2!1sen!2s" width="500" height="500" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </div>
                    <div>
                        <div className='contactUs_contacts'>
                            <div className="contactUs_contactsContainer">
                                <div className="contactUs_contactsIcon">
                                    <FontAwesomeIcon icon={faLocationDot} />
                                </div>
                                <div className="contactUs_contactsText">
                                    <p className="contactUs_contactsTextHeading">Address:</p>
                                    <p className="contactUs_contactsTextBody">House#123/3 Block_ABC, Street XYZ</p>
                                </div>
                            </div>
                            <div className="contactUs_contactsContainer">
                                <div className="contactUs_contactsIcon">
                                    <FontAwesomeIcon icon={faPhone} />
                                </div>
                                <div className="contactUs_contactsText">
                                    <p className="contactUs_contactsTextHeading">Phone:</p>
                                    <p className="contactUs_contactsTextBody">+92 123 9876543</p>
                                </div>
                            </div>
                            <div className="contactUs_contactsContainer">
                                <div className="contactUs_contactsIcon">
                                    <FontAwesomeIcon icon={faPaperPlane} />
                                </div>
                                <div className="contactUs_contactsText">
                                    <p className="contactUs_contactsTextHeading">Email:</p>
                                    <p className="contactUs_contactsTextBody">email@gmail.com</p>
                                </div>
                            </div>
                            <div className="contactUs_contactsContainer">
                                <div className="contactUs_contactsIcon">
                                    <FontAwesomeIcon icon={faEarthAmericas} />
                                </div>
                                <div className="contactUs_contactsText">
                                    <p className="contactUs_contactsTextHeading">Website:</p>
                                    <p className="contactUs_contactsTextBody">website.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactUs