import { Link } from "react-router-dom";

import classes from "./AuthenticationForm.module.css";

import authFormBackground from "../../../assets/authFormBackground.jpg";
import logo from "../../../assets/WhiteLogo.png";

const AuthenticationForm = (props) => {
  const { formTitle, submitButtonText, infoTextOptions } = props;

  return (
    <div className={classes.authenticationForm__container}>
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
          <h1 className={classes.authenticationForm__formTitle}>{formTitle}</h1>

          <ul className={classes.authenticationForm__formControlGroups}>
            <li className={classes.authenticationForm__formControlGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="yourEmail@example.com"
              />
            </li>

            <li className={classes.authenticationForm__formControlGroup}>
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="●●●●●●●●" />
            </li>
          </ul>

          <footer className={classes.authenticationForm__footer}>
            <button className={classes.authenticationForm__submitButton}>
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
        </div>
      </form>
    </div>
  );
};

export default AuthenticationForm;
