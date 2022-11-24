import { Link } from "react-router-dom";
import Users from "./Users";

const Admin = () => {
  return (
    <div className="flex-1 flex flex-col bg-[#6a5c8a] backdrop-blur-lg items-center p-8">
      <h1>Admins Page</h1>
      <br />
      <Users />
      <div className="">
        <Link to="/">Home</Link>
      </div>
    </div>
  );
};

export default Admin;
