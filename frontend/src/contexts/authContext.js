import React, { useState, useCallback } from "react";
import LoadingSpinner from "../components/UI/LoadingSpinner/LoadingSpinner";
import useSendRequest from "../hooks/useSendRequest";
import useErrorHandling from "../hooks/useErrorHandling";

const AuthContext = React.createContext({
  currentUser: {},
  logout: async () => {},
  checkAuthentication: async () => {},
});

export const AuthContextProvider = (props) => {
  const { sendRequest } = useSendRequest();
  const { handleError } = useErrorHandling();

  const [currentUser, setCurrentUser] = useState(undefined);

  const checkAuthentication = useCallback(async () => {
    try {
      const checkAuthURL = `${process.env.REACT_APP_BACKEND_BASE_URL}/auth/checkAuthentication`;
      const response = await sendRequest(checkAuthURL);
      const content = await response.json();
      if (content.status === "success") {
        const { user } = content.data;
        setCurrentUser(user);
        return true;
      }

      return false;
    } catch (err) {
      handleError(err);
      return false;
    }
  }, [handleError, sendRequest]);

  const logout = useCallback(async () => {
    try {
      const logOutURL = `${process.env.REACT_APP_BACKEND_BASE_URL}/auth/logout`;
      const response = await sendRequest(logOutURL);
      const content = await response.json();
      if (content.status !== "success") {
        throw new Error("something went wrong trying to logout");
      }

      setCurrentUser({});
      return true; // true means logout successfully
    } catch (err) {
      handleError(err);
      return false; // false means logout failed
    }
  }, [handleError, sendRequest]);

  const contextValue = { currentUser, checkAuthentication, logout };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
