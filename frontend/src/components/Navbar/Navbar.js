import classes from "./Navbar.module.css";
import logo from "../../assets/WhiteLogo.png";
import { Link, matchPath, useLocation, useNavigate } from "react-router-dom";
import MyLink from "../MyLink/MyLink";
import { useContext, useState } from "react";
import ConfirmLogOutModal from "../ConfirmModals/ConfirmLogOutModal/ConfirmLogOutModal";
import AuthContext from "../../contexts/authContext";
import { successAlert } from "../../utils/alert";
import useErrorHandling from "../../hooks/useErrorHandling";
import LoadingModal from "../UI/Modal/LoadingModal/LoadingModal";
import useSendRequest from "../../hooks/useSendRequest";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const authContext = useContext(AuthContext);
  const [showConfirmLogoutModal, setShowConfirmLogoutModal] = useState(false);
  const [isCreatingNewProblem, setIsCreatingNewProblem] = useState(false);
  const { handleError } = useErrorHandling();
  const { sendRequest } = useSendRequest();

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
      } else {
        throw new Error("something went wrong when we try to log you out");
      }
    } catch (err) {
      handleError(err);
    }
  };

  const newProblemButtonClickHandler = async () => {
    setIsCreatingNewProblem(true);
    try {
      const createProblemURL = `${process.env.REACT_APP_BACKEND_BASE_URL}/problem`;
      const response = await sendRequest(createProblemURL, {
        method: "POST",
      });
      const content = await response.json();
      if (content.status !== "success") {
        throw new Error(content.message);
      }

      const { problem } = content.data;
      navigate(`/problems/${problem._id}`);

      const pathPattern = "/problems/:id";
      const match = matchPath(
        {
          path: pathPattern,
          exact: true,
        },
        location.pathname
      );
      if (match) {
        navigate(0);
      }
    } catch (err) {
      handleError(err);
    }

    setIsCreatingNewProblem(false);
  };

  return (
    <ul className={classes.navbar}>
      {showConfirmLogoutModal && (
        <ConfirmLogOutModal
          closeModal={closeConfirmLogoutModal}
          confirmFunction={confirmLogout}
        />
      )}
      {isCreatingNewProblem && <LoadingModal />}
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
          <MyLink
            to="/problems/page/1"
            text="Problems"
            className={classes.navbar__link}
          />
        </li>
      </div>

      <div className={classes.navbar__buttons}>
        <li className={classes.navbar__item}>
          <button
            className={classes.navbar__newProblemButton}
            onClick={newProblemButtonClickHandler}
          >
            New problem
          </button>
        </li>

        <li className={classes.navbar__item}>
          <button
            className={classes.navbar__logOutButton}
            onClick={openConfirmLogoutModal}
          >
            Log out
          </button>
        </li>
      </div>
    </ul>
  );
};

export default Navbar;
