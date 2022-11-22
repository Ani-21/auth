import { useState, useEffect, useRef } from "react";
import axios from "../api/axios";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/register";

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  // username state
  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  // password state
  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  // match password state || confirmed password;
  const [matchPwd, setMatchPwd] = useState("");
  const [validMatchPwd, setValidMatchPwd] = useState(false);
  const [focusMatchPwd, setFocusMatchPwd] = useState(false);

  // authorization state: err || success
  const [err, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  // username validation
  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(user, result);
    setValidName(result);
  }, [user]);

  // pwd and matchPwd validation
  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    const matched = pwd === matchPwd;
    setValidMatchPwd(matched);
    console.log(pwd, matchPwd, matched);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);

    if (!v1 || !v2) {
      setErrMsg("Invalid input");
      return;
    }

    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: {
            "Content-Type": "application/json",
            withCredentials: true,
          },
        }
      );
      console.log(response?.data);
      console.log(response?.data.accessToken);
      setSuccess(true);

      setUser("");
      setPwd("");
      setMatchPwd("");
    } catch (err) {
      if (!err?.message) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("User already exists");
      } else {
        setErrMsg("Registration Failed");
        console.log(err.message);
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <div className="flex flex-col items-center">
          <div className="w-full flex bg-green-300 p-2 m-2">
            <p className="text-white text-xs italic">
              You've successfully registered
            </p>
          </div>
        </div>
      ) : (
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
            <label className={`p-2 ${validName ? "text-green-300" : ""}`}>
              Username
            </label>
            <input
              type="text"
              ref={userRef}
              required
              value={user}
              onChange={(e) => setUser(e.target.value)}
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
              className="rounded-lg px-2 py-1 text-gray-700"
            />
            {user && userFocus && !validName ? (
              <div className=" w-full flex bg-red-300 rounded-lg m-2">
                <p className="text-white text-xs italic">
                  4 to 24 characters. Must begin with a letter. Letters,
                  numbers, underscores, hyphens allowed.
                </p>
              </div>
            ) : (
              ""
            )}

            <label className={`p-2 ${validPwd ? "text-green-300" : ""}`}>
              Password
            </label>
            <input
              type="password"
              required
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
              className="rounded-lg px-2 py-1 text-gray-700"
            />

            {pwd && pwdFocus && !validPwd ? (
              <div className=" w-full flex bg-red-300 rounded-lg m-2">
                <p className="text-whitr text-xs italic">
                  8 to 24 characters.
                  <br />
                  Must include uppercase and lowercase letters, a number and a
                  special character.
                  <br />
                  Allowed special characters:
                  <span aria-label="exclamation mark">!</span>
                  <span aria-label="at symbol">@</span>
                  <span aria-label="hashtag">#</span>
                  <span aria-label="dollar sign">$</span>
                  <span aria-label="percent">%</span>
                </p>
              </div>
            ) : (
              ""
            )}

            <label
              className={`p-2 ${
                validMatchPwd && matchPwd ? "text-green-300" : ""
              }`}
            >
              Confirm Password
            </label>
            <input
              type="password"
              required
              value={matchPwd}
              onChange={(e) => setMatchPwd(e.target.value)}
              onFocus={() => setFocusMatchPwd(true)}
              onBlur={() => setFocusMatchPwd(false)}
              className="rounded-lg  px-2 py-1 text-gray-700"
            />

            {matchPwd && focusMatchPwd && !validMatchPwd ? (
              <div className=" w-full flex bg-red-300 rounded-lg m-2">
                <p className="text-whitr text-xs italic">
                  Must match the first password input field.
                </p>
              </div>
            ) : (
              ""
            )}
            <button
              className="p-2 m-4 text-blue-400 rounded-lg w-[50%] bg-gray-300 hover:bg-white"
              disabled={!user || !pwd || !matchPwd ? true : false}
            >
              Register
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Register;
