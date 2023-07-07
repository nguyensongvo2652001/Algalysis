import classes from "./Navbar.module.css";
import logo from "../../assets/WhiteLogo.png";
import { Link } from "react-router-dom";
import MyLink from "../MyLink/MyLink";

const Navbar = () => {
  return (
    <ul className={classes.navbar}>
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
        <button className={classes.navbar__logOutButton}>Log out</button>
      </li>
    </ul>
  );
};

export default Navbar;
