import useAuth from "./useAuth";
import axios from "../api/axios";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get("/refresh", {
      withCredentials: true,
    });

    console.log(response?.data?.accessToken);

    setAuth((prev) => {
      console.log(prev);
      return { ...prev, accessToken: response?.data?.accessToken };
    });
  };

  return refresh;
};

export default useRefreshToken;
