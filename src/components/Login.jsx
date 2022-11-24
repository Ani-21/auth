import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

const LOGIN_URL = "/auth";

const Login = () => {
  const { setAuth } = useAuth();
  const userRef = useRef();
  const errRef = useRef();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.path || "/";

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErr("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: {
            "Content-Type": "application/json",
            withCredentials: true,
          },
        }
      );

      console.log(response?.data.accessToken);
      const accessToken = response?.data.accessToken;
      const roles = response?.data.roles;
      setAuth({ user, pwd, roles, accessToken });
      setUser("");
      setPwd("");
      navigate(from, { replace: true });
    } catch (err) {
      if (!err.message) {
        setErr("No Server Response");
      } else if (err.response?.status === 401) {
        setErr("Not Authorized");
      } else {
        setErr("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <div className="flex flex-col items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col p-3 max-w-[200px] items-center text-white "
      >
        <div className={err ? "w-full flex bg-red-300 p-2 m-2" : "hidden"}>
          <p ref={errRef} className="text-white text-xs italic">
            {err}
          </p>
        </div>
        <label className="p-2">Username</label>
        <input
          type="text"
          ref={userRef}
          required
          value={user}
          onChange={(e) => setUser(e.target.value)}
          className="rounded-lg px-2 py-1 text-gray-700"
        />

        <label className="p-2">Password</label>
        <input
          type="password"
          required
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          className="rounded-lg px-2 py-1 text-gray-700"
        />

        <button
          className="p-2 m-4 text-blue-400 rounded-lg w-[50%] bg-gray-300 hover:bg-white"
          disabled={!user || !pwd ? true : false}
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
