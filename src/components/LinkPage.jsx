import { Link } from "react-router-dom";

const LinkPage = () => {
  return (
    <div className="text-white">
      <h1 className=" text-3xl fond-bold">Links</h1>
      <br />
      <h2 className="text-green-200 font-bold uppercase text-lg">Public</h2>
      <Link to="/login">Login</Link>
      <br />
      <Link to="/register">Register</Link>
      <br />
      <h2 className="text-red-300 font-bold uppercase text-lg">Private</h2>
      <Link to="/">Home</Link>
      <br />
      <Link to="/editor">Editors Page</Link>
      <br />
      <Link to="/admin">Admin Page</Link>
    </div>
  );
};

export default LinkPage;
