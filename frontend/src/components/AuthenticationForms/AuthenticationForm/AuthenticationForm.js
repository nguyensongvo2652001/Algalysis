import { Link, useNavigate } from "react-router-dom";

import classes from "./AuthenticationForm.module.css";

import authFormBackground from "../../../assets/authFormBackground.jpg";
import logo from "../../../assets/WhiteLogo.png";
import { useContext, useEffect, useRef, useState } from "react";
import useSendRequest from "../../../hooks/useSendRequest";
import useErrorHandling from "../../../hooks/useErrorHandling";
import LoadingSpinner from "../../UI/LoadingSpinner/LoadingSpinner";
import { successAlert } from "../../../utils/alert";
import AuthContext from "../../../contexts/authContext";

const AuthenticationForm = (props) => {
  const {
    formTitle,
    submitButtonText,
    infoTextOptions,
    submitURL,
    successText,
  } = props;

  const authContext = useContext(AuthContext);
  const authContextLogoutFunc = authContext.logout;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(true);
  const { sendRequest } = useSendRequest();
  const { handleError } = useErrorHandling();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  useEffect(() => {
    const logOut = async () => {
      setIsLoggingOut(true);
      await authContextLogoutFunc();
      setIsLoggingOut(false);
    };

    logOut();
  }, [authContextLogoutFunc]);

  const submitButtonClickHandler = async (event) => {
    event.preventDefault();
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    setIsLoading(true);
    try {
      if (!email) {
        throw new Error("Email can not be empty");
      }

      if (!password) {
        throw new Error("Password can not be empty");
      }
      const response = await sendRequest(submitURL, {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      const content = await response.json();

      if (content.status !== "success") {
        throw new Error(content.message);
      }

      setIsLoading(false);
      successAlert(successText);

      setTimeout(() => {
        navigate("/problems");
      }, 2000);
    } catch (err) {
      handleError(err);
    }
    setIsLoading(false);
  };

  return (
    <div className={classes.authenticationForm__container}>
      {isLoggingOut && <LoadingSpinner />}
      {!isLoggingOut && (
        <>
          <figure className={classes.authenticationForm__backgroundContainer}>
            <img
              className={classes.authenticationForm__background}
              alt="Black and blue patterns"
              src={authFormBackground}
            />
          </figure>

          <form className={classes.authenticationForm__form}>
            <figure className={classes.authenticationForm__formLogoContainer}>
              <img
                className={classes.authenticationForm__formLogo}
                alt="Algalysis's logo"
                src={logo}
              />
            </figure>

            <div className={classes.authenticationForm__formContent}>
              <h1 className={classes.authenticationForm__formTitle}>
                {formTitle}
              </h1>

              <ul className={classes.authenticationForm__formControlGroups}>
                <li className={classes.authenticationForm__formControlGroup}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="yourEmail@example.com"
                    ref={emailInputRef}
                  />
                </li>

                <li className={classes.authenticationForm__formControlGroup}>
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    placeholder="●●●●●●●●"
                    ref={passwordInputRef}
                  />
                </li>
              </ul>

              {!isLoading && (
                <footer className={classes.authenticationForm__footer}>
                  <button
                    className={classes.authenticationForm__submitButton}
                    onClick={submitButtonClickHandler}
                  >
                    {submitButtonText}
                  </button>
                  <p className={classes.authenticationForm__infoText}>
                    {infoTextOptions.question} &nbsp;
                    <Link
                      className={classes.authenticationForm__infoTextLink}
                      to={infoTextOptions.link}
                    >
                      {infoTextOptions.linkText}
                    </Link>
                  </p>
                </footer>
              )}

              {isLoading && (
                <div
                  className={
                    classes.authenticationForm__loadingSpinnerContainer
                  }
                >
                  <LoadingSpinner />
                </div>
              )}
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default AuthenticationForm;
