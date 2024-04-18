import CareTakerProfile from "./CareTakerProfile";
import PatientProfile from "./PatientProfile";

const Profile = ({ userInfo }) => {
  const isPatient = userInfo.roleId === 2;

  return (
    <div style={{ marginTop: "50px" }}>
      {isPatient ?
        <PatientProfile userInfo={userInfo} />
        :
        <CareTakerProfile userInfo={userInfo} />
      }
    </div>
  );
};

export default Profile;
