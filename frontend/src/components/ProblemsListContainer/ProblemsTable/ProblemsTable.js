import ProblemList from "./ProblemList/ProblemList";
import classes from "./ProblemsTable.module.css";
import ProblemsTableHeader from "./ProblemsTableHeader/ProblemsTableHeader";

const ProblemsTable = (props) => {
  const { problems, setProblems } = props;

  return (
    <div className={classes.problemsTable}>
      <ProblemsTableHeader />
      <ProblemList problems={problems} setProblems={setProblems} />
    </div>
  );
};

export default ProblemsTable;
