import Problem from "../Problem/Problem";
import classes from "./ProblemList.module.css";

const ProblemList = (props) => {
  const { problems, setProblems } = props;

  return (
    <ul className={classes.problemList}>
      {problems.length === 0 && (
        <p className={classes.problemList__noProblemsText}>
          No problems found{" "}
        </p>
      )}
      {problems.map((problem) => {
        return (
          <Problem
            key={problem._id}
            problem={problem}
            setProblems={setProblems}
          />
        );
      })}
    </ul>
  );
};

export default ProblemList;
