import { useEffect, useState } from "react";
import PopUpModal from "../Modal/PopUpModal";
import "./homeInterface.css";
import ProfileForms, {
  CareTakerForm,
  PatientForm,
} from "../ProfileForms/ProfileForms";
import { showSuccessToast } from "../Toast/ToastifyToast";
import Header from "../UserHome/header";
import ButtonRow from "../UserHome/buttons";
import ImageSlider from "../UserHome/body";
import { ApiGetCall, ApiPostCall } from "../ApiCall/ApiCalls";
import {
  Button,
  ButtonGroup,
  Card,
  Dropdown,
  Image,
  ListGroup,
} from "react-bootstrap";
import { capitalizeEachWord } from "../Common/Common";

const HomeInterface = ({ userInfo, setUserInfo }) => {
  console.log("HomeInterface userInfo: ", userInfo);
  return userInfo.roleId === 2 ? (
    <PatientInterface userInfo={userInfo} />
  ) : userInfo.roleId === 3 ? (
    <CareTakerInterface />
  ) : (
    <JoinInterface userInfo={userInfo} setUserInfo={setUserInfo} />
  );
};

const CareTakerInterface = () => {
  return (
    <div style={{ marginTop: "50px" }}>
      <div className="homeInterface_main">
      <div className="caretaker_homeInterface_container">
        <div className="homeInterface_transparentLayer">
          <div className="homeInterface_contaierBox">
            <div className="homeInterface_heading">
              <p>
                We measure our success in smiles and well-being, not dollars and cents
              </p>
            </div>
            <div className="homeInterface_body">
              <p>
                Verily, kindness and gentleness were never part of something except that they adorned it, and they are never withdrawn from something except that they leave it defective.
              </p>
            </div>
            {/* <div className="homeInterface_bottomMain">
              <div className="homeInterface_bottomContainer">
                <div className="homeInterface_careTaker">
                  <button
                    className="neon-button"
                    type="submit"
                  >
                    Care Taker
                  </button>
                </div>
                <div className="homeInterface_patient">
                  <button
                    className="neon-button"
                    type="submit"
                  >
                    Patient
                  </button>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

const PatientInterface = ({ userInfo }) => {
  const [chosenService, setChosenService] = useState("old");
  const [searchQuery, setSearchQuery] = useState("");
  const [status, setStatus] = useState(0);

  const updateChosenService = (service) => {
    setChosenService(service);
  };

  return (
    <div style={{ marginTop: "50px" }}>
      {/* <h1>This is a Patient Interface</h1> */}

      <ImageSlider />
      <Header search={searchQuery} setSearch={setSearchQuery} />

      <StatusButtons status={status} setStatus={setStatus} />
      <StatusServices status={status} userInfo={userInfo} />

      <ButtonRow
        chosenService={chosenService}
        updateService={updateChosenService}
      />
      <OldChildServices
        searchQuery={searchQuery}
        chosenService={chosenService}
        userInfo={userInfo}
      />
    </div>
  );
};

const DetailedServiceView = ({ service, handleFormClose, userInfo }) => {
  const {
    id,
    image,
    title,
    description,
    price,
    duration,
    duration_unit,
    careTakerImage,
    careTakerName,
    careTakerUsername,
  } = service;

  let serviceBooked = false;
  let serviceCompleted = false;
  if (service.bookingId) {
    if (service.endDate && new Date(service.endDate) < new Date())
      serviceCompleted = true;
    else serviceBooked = true;
  }

  const handleDoBooking = async () => {
    if (serviceBooked) return;
    try {
      const response = await ApiPostCall("/doBooking", {
        patientUsername: userInfo.username,
        serviceId: id,
      });
      console.log("Booking Response: ", response);
      showSuccessToast("Booking Successful");
    } catch (error) {
      console.log(error);
    }
    handleFormClose();
  };

  // const handleCancelBooking = async () => {
  //     try {
  //         const response = await ApiPostCall("/cancelBooking", { bookingId: service.bookingId })
  //         console.log("Cancel Booking Response: ", response)
  //         showSuccessToast("Booking Cancelled")
  //     }
  //     catch (error) {
  //         console.log(error)
  //     }
  //     handleFormClose()
  // }

  return (
    <div>
      <Image style={{ borderRadius: "10px" }} src={image} fluid />

      <h3 className="dsv-title">{title}</h3>
      <hr />

      <div className="dsv-caretaker" style={{ marginBottom: "20px" }}>
        <img
          src={careTakerImage}
          alt="Caretaker"
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            marginRight: "10px",
          }}
        />
        <div>
          <div style={{ fontWeight: "bold" }}>
            {capitalizeEachWord(careTakerUsername)}
          </div>
          <div style={{ color: "gray" }}>
            {capitalizeEachWord(careTakerName)}
          </div>
        </div>
      </div>
      <hr />

      <p className="dsv-description">{description}</p>

      <p className="dsv-duration">
        <b>Duration:</b>
        <span>
          {duration} {capitalizeEachWord(duration_unit)}
        </span>
      </p>

      <p className="dsv-price">
        <b>Price:</b>
        <span>Rs. {price}</span>
      </p>

      {!serviceCompleted && serviceBooked ? (
        <div
          className="dsv-book-now"
          style={{ backgroundColor: "rgb(45 60 76)", cursor: "auto" }}
          onClick={handleDoBooking}
        >
          <button style={{ cursor: "auto" }}>Already Booked</button>
        </div>
      ) : (
        !serviceCompleted && (
          <div className="dsv-book-now" onClick={handleDoBooking}>
            <button>Book Now</button>
          </div>
        )
      )}
    </div>
  );
};

const StatusButtons = ({ status, setStatus }) => {
  return (
    <ButtonGroup style={{ width: "100%" }}>
      <Button
        variant={status === 0 ? "primary" : "secondary"}
        style={{
          width: "50%",
          borderRadius: "0",
          padding: "10px",
          fontWeight: "bold",
        }}
        onClick={() => setStatus(0)}
      >
        Started
      </Button>
      <Button
        variant={status === 1 ? "primary" : "secondary"}
        style={{
          width: "50%",
          borderRadius: "0",
          padding: "10px",
          fontWeight: "bold",
        }}
        onClick={() => setStatus(1)}
      >
        Completed
      </Button>
    </ButtonGroup>
  );
};

const StatusServices = ({ status, userInfo }) => {
  const [services, setServices] = useState([]);

  const getAllServices = async () => {
    try {
      const response = await ApiPostCall("/getUserStatusServices", {
        status,
        username: userInfo.username,
      });
      setServices(response.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllServices();
  }, [status]);

  return <ServiceList services={services} userInfo={userInfo} />;
};

const OldChildServices = ({ searchQuery, chosenService, userInfo }) => {
  const [services, setServices] = useState([]);

  const getAllServices = async () => {
    try {
      const response = await ApiPostCall("/getServices", {
        serviceType: chosenService,
        searchQuery,
      });
      console.log("Responsesss: ", response.data[0]);
      setServices(response.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllServices();
  }, [chosenService, searchQuery]);

  return <ServiceList services={services} userInfo={userInfo} />;
};

const ServiceList = ({ services, userInfo }) => {
  const [showServiceDetail, setShowServiceDetail] = useState(false);
  const [detailedService, setDetailedService] = useState(null);

  const onFormClose = () => {
    setShowServiceDetail(false);
  };
  const onFormOpen = () => {
    setShowServiceDetail(true);
  };

  const handleServiceView = (service) => {
    setDetailedService(
      <DetailedServiceView
        service={service}
        handleFormClose={onFormClose}
        userInfo={userInfo}
      />
    );
    onFormOpen();
  };

  return (
    <div style={{ padding: "20px" }}>
      <Card style={{ minHeight: "300px" }}>
        <Card.Body>
          {services && services.length > 0 ? (
            <div>
              <ListGroup
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-around",
                  gap: "20px",
                  flexDirection: "row",
                }}
              >
                {services.map((service, index) => (
                  <ServiceCard
                    key={index}
                    handleServiceView={handleServiceView}
                    service={service}
                  />
                ))}
              </ListGroup>
            </div>
          ) : (
            <div
              style={{ minHeight: "250px" }}
              className="d-flex justify-content-center align-items-center"
            >
              No Service Found
            </div>
          )}
        </Card.Body>
      </Card>

      <PopUpModal
        show={showServiceDetail}
        title={""}
        handleClose={onFormClose}
        children={detailedService}
      />
    </div>
  );
};

const ServiceCard = ({ handleServiceView, service }) => {
  const { image, title, description, price } = service;

  return (
    <Card
      onClick={() => handleServiceView(service)}
      style={{ width: "24rem", cursor: "pointer" }}
    >
      <Card.Img
        style={{ maxHeight: "230px", minHeight: "230px" }}
        variant="top"
        src={image}
      />
      <Card.Body>
        <Card.Title className="clip-text clip-2-lines-text">{title}</Card.Title>
        <hr />

        {/* <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                    <img
                        src={careTakerImage}
                        alt="Caretaker"
                        style={{ width: "40px", height: "40px", borderRadius: "50%", marginRight: "10px" }}
                    />
                    <div>
                        <div style={{ fontWeight: "bold" }}>{careTakerUsername}</div>
                        <div style={{ color: "gray" }}>{careTakerName}</div>
                    </div>
                </div>
                <hr /> */}

        <Card.Text className="clip-text clip-2-lines-text">
          {description}
        </Card.Text>
        <hr />

        <Card.Text
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <b>Price:</b>
          <span>Rs. {price}</span>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

function JoinInterface({ userInfo, setUserInfo }) {
  const [show, setShow] = useState(false);
  const [children, setChildren] = useState(null);
  const [title, setTitle] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCareTakerClick = () => {
    setChildren(
      <ProfileForms
        closeForm={handleClose}
        isPatient={false}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
      />
    );
    setTitle("Care Taker Form");
    handleShow();
  };

  const handlePatientClick = () => {
    setChildren(
      <ProfileForms
        closeForm={handleClose}
        isPatient={true}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
      />
    );
    setTitle("Patient Form");
    handleShow();
  };

  return (
    <div className="homeInterface_main">
      <div className="homeInterface_container">
        <div className="homeInterface_transparentLayer">
          <div className="homeInterface_contaierBox">
            <div className="homeInterface_heading">
              <p>
                More Than A Residence -- It's A Community Built On Care,
                Respect, And Shared Joy
              </p>
            </div>
            <div className="homeInterface_body">
              <p>
                This is not Just a Residence - It's a community where both
                residents and caretakers discover opportunities for mutual
                growth and support. So for what are ou waiting for. Join Now!
              </p>
            </div>
            <div className="homeInterface_bottomMain">
              <div className="homeInterface_bottomContainer">
                <div className="homeInterface_careTaker">
                  <button
                    onClick={handleCareTakerClick}
                    className="neon-button"
                    type="submit"
                  >
                    Care Taker
                  </button>
                </div>
                <div className="homeInterface_patient">
                  <button
                    onClick={handlePatientClick}
                    className="neon-button"
                    type="submit"
                  >
                    Patient
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PopUpModal
        show={show}
        title={title}
        handleClose={handleClose}
        children={children}
      />
    </div>
  );
}

export default HomeInterface;
