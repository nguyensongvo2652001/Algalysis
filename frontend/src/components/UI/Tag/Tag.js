import classes from "./Tag.module.css";
import { capitalizeFirstLetter } from "../../../utils/string";

const Tag = (props) => {
  const { value } = props;
  const tagValue = value.split(" ").join("");

  const allClasses = `${classes.tag} ${classes[`tag--${tagValue}`]}`;

  return (
    <div className={allClasses}>
      <p>{capitalizeFirstLetter(value)}</p>
    </div>
  );
};

export default Tag;
