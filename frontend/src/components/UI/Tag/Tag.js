import classes from "./Tag.module.css";
import { capitalizeFirstLetter } from "../../../utils/string";

const Tag = (props) => {
  const { value } = props;

  const allClasses = `${classes.tag} ${classes[`tag--${value}`]}`;

  return (
    <div className={allClasses}>
      <p>{capitalizeFirstLetter(value)}</p>
    </div>
  );
};

export default Tag;
