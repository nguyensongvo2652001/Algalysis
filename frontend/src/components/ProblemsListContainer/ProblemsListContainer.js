import Navbar from "../Navbar/Navbar";
import SearchBar from "../SearchBar/SearchBar";
import classes from "./ProblemsListContainer.module.css";
import ProblemsTable from "./ProblemsTable/ProblemsTable";

const ProblemsListContainer = () => {
  return (
    <div className={classes.problemsListContainer}>
      <Navbar />
      <p className={classes.problemsListContainer__welcomeMessage}>
        Welcome back <span>someUsername</span>
      </p>
      <SearchBar />
      <ProblemsTable />
    </div>
  );
};

export default ProblemsListContainer;
