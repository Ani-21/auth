import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <div className="flex-1 flex flex-col bg-[#6a5c8a] backdrop-blur-lg items-center p-8">
      <h1>Editors Page</h1>
      <br />
      <p>You must have been assigned an Editor role.</p>
      <div className="">
        <Link to="/">Home</Link>
      </div>
    </div>
  );
};

export default Admin;
