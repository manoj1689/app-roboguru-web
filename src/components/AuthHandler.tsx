import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setAuthToken } from "../services/api";

const AuthHandler = () => {
  const token = useSelector((state: RootState) => state.firebaseAuth.token);

  useEffect(() => {
    setAuthToken(token); // Set token when Redux state updates
  }, [token]);

  return null;
};

export default AuthHandler;
