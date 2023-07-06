import Tag from "../../../UI/Tag/Tag";
import classes from "./Problem.module.css";

const Problem = () => {
  return (
    <li className={classes.problem}>
      <div className={classes.problem__nameContainer}>
        <p className={classes.problem__nameValue}>The palindrome problem</p>
      </div>

      <div className={classes.problem__dateCreatedContainer}>
        <p className={classes.problem__dateCreatedValue}>15/07/2023</p>
      </div>

      <div className={classes.problem__difficultyContainer}>
        <Tag value="hard" />
      </div>

      <div className={classes.problem__complexityContainer}>
        <p className={classes.problem__complexityValue}>O(N^2)</p>
      </div>

      <div className={classes.problem__tagContainer}>
        <Tag value="Hashmap" />
      </div>

      <div className={classes.problem__trashIconContainer}>
        <ion-icon name="trash-outline"></ion-icon>
      </div>
    </li>
  );
};

export default Problem;
