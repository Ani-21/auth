import { Link } from "react-router-dom";

const Lounge = () => {
  return (
    <div>
      <h1>The Lounge</h1>
      <br />
      <p>Admins and Editors can hang out here.</p>
      <div className="">
        <Link to="/">Home</Link>
      </div>
    </div>
  );
};

export default Lounge;
