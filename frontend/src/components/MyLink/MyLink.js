import { Link, useLocation } from "react-router-dom";
import classes from "./MyLink.module.css";

const MyLink = (props) => {
  const { to, text } = props;

  const location = useLocation();
  const pathName = location.pathname;
  const isActive = pathName === to;

  let allClasses = `${classes.myLink} ${props.className} `;

  if (!isActive) {
    allClasses += `${classes["myLink--inactive"]}`;
  }

  return (
    <Link className={allClasses} to={to}>
      {text}
    </Link>
  );
};

export default MyLink;
