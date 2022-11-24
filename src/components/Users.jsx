import { useState, useEffect } from "react";
import axios from "../api/axios";
import useRefreshToken from "../hooks/useRefreshToken";

const Users = () => {
  const refreshToken = useRefreshToken();
  const [users, setUsers] = useState();

  useEffect(() => {
    let isMounted = true;

    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axios.get("/users", {
          signal: controller.signal,
        });

        console.log(response.data);

        isMounted && setUsers(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <article>
      <h1>Users List</h1>
      {users?.length ? (
        <ul>
          {users.map((user, i) => (
            <li key={i}>{user.username}</li>
          ))}
        </ul>
      ) : (
        <p>No Users Found</p>
      )}

      <button onClick={() => refreshToken()}>Refresh</button>
    </article>
  );
};

export default Users;
