import CareTakerProfile from "./CareTakerProfile";
import PatientProfile from "./PatientProfile";

const Profile = () => {
  return (
    <div style={{ marginTop: "50px" }}>
      {/* if User is patient then */}
      <PatientProfile />
      {/* Otherwise */}
      <CareTakerProfile />
    </div>
  );
};

export default Profile;
