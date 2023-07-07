import { useContext, useEffect, useState } from "react";
import classes from "./RequiredLoginComponent.module.css";
import AuthContext from "../../contexts/authContext";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import useErrorHandling from "../../hooks/useErrorHandling";

const RequiredLoginComponent = (props) => {
  const authContext = useContext(AuthContext);
  const { handleError } = useErrorHandling();
  const authContextCheckAuthenticationFunc = authContext.checkAuthentication;
  const currentUser = authContext.currentUser;
  const navigate = useNavigate();
  const [isCheckingAuthentication, setIsCheckingAuthentication] =
    useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        setIsCheckingAuthentication(true);
        const isLoggedIn = await authContextCheckAuthenticationFunc();
        if (!isLoggedIn) {
          navigate("/login");
        }

        setIsCheckingAuthentication(false);
      } catch (err) {
        handleError(err);
        navigate("/login");
      }
    };

    if (currentUser) {
      setIsCheckingAuthentication(false);
      return;
    }
    checkAuthentication();
  }, [authContextCheckAuthenticationFunc, currentUser, handleError, navigate]);

  return (
    <div className={classes.requiredAuth__container}>
      {isCheckingAuthentication && <LoadingSpinner />}
      {!isCheckingAuthentication && props.children}
    </div>
  );
};

export default RequiredLoginComponent;
