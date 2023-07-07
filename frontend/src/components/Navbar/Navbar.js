import classes from "./Navbar.module.css";
import logo from "../../assets/WhiteLogo.png";
import { Link, useNavigate } from "react-router-dom";
import MyLink from "../MyLink/MyLink";
import { useContext, useState } from "react";
import ConfirmLogOutModal from "../ConfirmModals/ConfirmLogOutModal/ConfirmLogOutModal";
import AuthContext from "../../contexts/authContext";
import { successAlert } from "../../utils/alert";
import useErrorHandling from "../../hooks/useErrorHandling";

const Navbar = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [showConfirmLogoutModal, setShowConfirmLogoutModal] = useState(false);
  const { handleError } = useErrorHandling();

  const openConfirmLogoutModal = () => {
    setShowConfirmLogoutModal(true);
  };

  const closeConfirmLogoutModal = () => {
    setShowConfirmLogoutModal(false);
  };

  const confirmLogout = async () => {
    try {
      const logOutSuccessfully = await authContext.logout();
      if (logOutSuccessfully) {
        successAlert(
          "Log out successfully ! We will redirect you to the login page soon !"
        );

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        throw new Error("something went wrong when we try to log you out");
      }
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <ul className={classes.navbar}>
      {showConfirmLogoutModal && (
        <ConfirmLogOutModal
          closeModal={closeConfirmLogoutModal}
          confirmFunction={confirmLogout}
        />
      )}
      <div className={classes.navbar__mainItems}>
        <li className={classes.navbar__item}>
          <figure className={classes.navbar__logoContainer}>
            <img
              className={classes.navbar__logo}
              alt="Algalysis's logo"
              src={logo}
            />
          </figure>
        </li>

        <li className={classes.navbar__item}>
          <MyLink to="/problems/page/1" text="Problems" />
        </li>
      </div>

      <li className={classes.navbar__item}>
        <button
          className={classes.navbar__logOutButton}
          onClick={openConfirmLogoutModal}
        >
          Log out
        </button>
      </li>
    </ul>
  );
};

export default Navbar;
