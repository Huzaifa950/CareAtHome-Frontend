import { useState } from 'react';
import PopUpModal from '../Modal/PopUpModal';
import './homeInterface.css'
import ProfileForms, { CareTakerForm, PatientForm } from '../ProfileForms/ProfileForms';
import { showSuccessToast } from '../Toast/ToastifyToast';
import Header from '../UserHome/header';
import ButtonRow from '../UserHome/buttons';
// import ImageWithText from './components/body';

const HomeInterface = ({ userInfo, setUserInfo }) => {
    console.log("HomeInterface userInfo: ", userInfo)
    return (
        userInfo.roleId === 2 ?
            <PatientInterface />
            :
            userInfo.roleId === 3 ?
                <CareTakerInterface />
                :
                <JoinInterface userInfo={userInfo} setUserInfo={setUserInfo} />
    )
}

const CareTakerInterface = () => {
    return (
        <div style={{ marginTop: "50px" }}>
            <h1>This is a careTaker Interface</h1>
        </div>
    )
}

const PatientInterface = () => {
    return (
        <div style={{ marginTop: "50px" }}>
            <h1>This is a Patient Interface</h1>
            <Header />
            <ButtonRow />
            {/* <ImageWithText /> */}
        </div>
    )
}

function JoinInterface({ userInfo, setUserInfo }) {
    const [show, setShow] = useState(false);
    const [children, setChildren] = useState(null);
    const [title, setTitle] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCareTakerClick = () => {
        setChildren(
            <ProfileForms
                closeForm={handleClose}
                isPatient={false}
                userInfo={userInfo}
                setUserInfo={setUserInfo} />
        );
        setTitle("Care Taker Form")
        handleShow();
    }

    const handlePatientClick = () => {
        setChildren(
            <ProfileForms
                closeForm={handleClose}
                isPatient={true}
                userInfo={userInfo}
                setUserInfo={setUserInfo} />
        );
        setTitle("Patient Form")
        handleShow();
    }

    return (
        <div className='homeInterface_main'>
            <div className='homeInterface_container'>
                <div className='homeInterface_transparentLayer'>
                    <div className='homeInterface_contaierBox'>
                        <div className='homeInterface_heading'>
                            <p>More Than A Residence -- It's A Community Built On Care, Respect, And Shared Joy</p>
                        </div>
                        <div className='homeInterface_body'>
                            <p>This is not Just a Residence - It's a community where both residents and caretakers discover opportunities for mutual growth and support. So for what are ou waiting for. Join Now!</p>
                        </div>
                        <div className='homeInterface_bottomMain'>
                            <div className='homeInterface_bottomContainer'>
                                <div className="homeInterface_careTaker">
                                    <button onClick={handleCareTakerClick} className='neon-button' type="submit">Care Taker</button>
                                </div>
                                <div className="homeInterface_patient">
                                    <button onClick={handlePatientClick} className='neon-button' type="submit">Patient</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <PopUpModal show={show} title={title} handleClose={handleClose} children={children} />
        </div>
    )
}

export default HomeInterface;
