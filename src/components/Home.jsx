import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex-1 flex flex-col bg-[#6a5c8a] backdrop-blur-lg items-center p-8">
      <h1>Home</h1>
      <br />
      <p>You are logged in!</p>
      <br />
      <Link to="/editor">Go to the Editor page</Link>
      <br />
      <Link to="/admin">Go to the Admin page</Link>
      <br />
      <Link to="/lounge">Go to the Lounge</Link>
      <br />
      <Link to="/linkpage">Go to the link page</Link>
      <div className="">
        <button onClick={() => {}}>Sign Out</button>
      </div>
    </div>
  );
};

export default Home;
