import RelatedProblem from "./RelatedProblem/RelatedProblem";
import classes from "./RelatedProblems.module.css";

const RelatedProblems = (props) => {
  return (
    <div className={classes.relatedProblems__container}>
      <p className={classes.relatedProblems__title}>Related problems</p>
      <ul className={classes.relatedProblems__list}>
        <RelatedProblem
          text="Two Sum"
          to="https://leetcode.com/problems/two-sum/"
        />

        <RelatedProblem
          text="Three Sum"
          to="https://leetcode.com/problems/three-sum/"
        />

        <RelatedProblem
          text="Four Sum"
          to="https://leetcode.com/problems/four-sum/"
        />
      </ul>
    </div>
  );
};

export default RelatedProblems;
