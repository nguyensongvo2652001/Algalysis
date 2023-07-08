import Tag from "../UI/Tag/Tag";
import Navbar from "../Navbar/Navbar";
import classes from "./EditProblem.module.css";
import MyLink from "../MyLink/MyLink";
import TagsList from "./TagsList/TagsList";
import RelatedProblems from "./RelatedProblems/RelatedProblems";

const EditProblem = () => {
  return (
    <div className={classes.problem__container}>
      <Navbar />
      <div className={classes.problem__content}>
        <div className={classes.problem__info}>
          <input
            className={classes.problem__name}
            type="text"
            defaultValue="Two Sum"
          />
          <textarea
            className={classes.problem__text}
            defaultValue={
              "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order."
            }
          />
        </div>

        <div className={classes.problem__analyzeResult}>
          <div className={classes.problem__analyzeResultButtons}>
            <button className={classes.problem__analyzeButton}>Analyze</button>
            <button className={classes.problem__saveButton}>Save</button>
          </div>
          <div className={classes.problem__difficultyResult}>
            <Tag value="hard" />
            <p className={classes.problem__analyzeInfo}>
              Compared to other problems, our model predict this problem to be
              Hard
            </p>
          </div>

          <div className={classes.problem__complexityResult}>
            <p className={classes.problem__complexityResultValue}>O(N^2)</p>
            <p className={classes.problem__analyzeInfo}>
              Our model believe you can solve this problem within O(N^2)
              complexity
            </p>
          </div>

          <TagsList />

          <RelatedProblems />
        </div>
      </div>
    </div>
  );
};

export default EditProblem;
