import Problem from "../Problem/Problem";
import classes from "./ProblemList.module.css";

const ProblemList = () => {
  return (
    <ul className={classes.problemList}>
      <Problem />
      <Problem />
    </ul>
  );
};

export default ProblemList;
