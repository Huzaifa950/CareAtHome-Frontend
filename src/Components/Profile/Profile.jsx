// import CareTakerProfile from "./CareTakerProfile";
import PatientProfile from "./PatientProfile";

const Profile = ({ userInfo }) => {
  return (
    <div style={{ marginTop: "50px" }}>
      {/* if User is patient then */}
      <PatientProfile userInfo={userInfo} />
      {/* Otherwise */}
      {/* <CareTakerProfile /> */}
    </div>
  );
};

export default Profile;
