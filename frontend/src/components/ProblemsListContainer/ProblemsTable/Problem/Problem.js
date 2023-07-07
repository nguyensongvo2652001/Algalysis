import Tag from "../../../UI/Tag/Tag";
import MyLink from "../../../MyLink/MyLink";
import classes from "./Problem.module.css";

const Problem = () => {
  return (
    <li className={classes.problem}>
      <div className={classes.problem__nameContainer}>
        <MyLink
          text="The palindrome problem The palindrome problem The palindrome problem The palindrome problem The palindrome problem The palindrome problem"
          to="/problems/123"
          className={classes.problem__nameValue}
        />
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
        <Tag value="hashmap" />
      </div>

      <div className={classes.problem__trashIconContainer}>
        <ion-icon name="trash-outline"></ion-icon>
      </div>
    </li>
  );
};

export default Problem;
