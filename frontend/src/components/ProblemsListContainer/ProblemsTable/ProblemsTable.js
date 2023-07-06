import SearchBar from "../../SearchBar/SearchBar";
import ProblemList from "./ProblemList/ProblemList";
import classes from "./ProblemsTable.module.css";
import ProblemsTableHeader from "./ProblemsTableHeader/ProblemsTableHeader";

const ProblemsTable = () => {
  return (
    <div className={classes.problemsTable}>
      <ProblemsTableHeader />
      <ProblemList />
    </div>
  );
};

export default ProblemsTable;
