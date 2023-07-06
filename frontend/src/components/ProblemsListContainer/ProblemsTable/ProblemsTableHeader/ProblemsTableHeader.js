import classes from "./ProblemsTableHeader.module.css";

const ProblemsTableHeader = () => {
  return (
    <header className={classes.problemsTableHeader}>
      <div className={classes.problemsTableHeader__nameColumn}>
        <p>Name</p>
      </div>

      <div className={classes.problemsTableHeader__dateCreatedColumn}>
        <p>Date created</p>
      </div>

      <div className={classes.problemsTableHeader__difficultyColumn}>
        <p>Difficulty</p>
      </div>

      <div className={classes.problemsTableHeader__complexityColumn}>
        <p>Complexity</p>
      </div>

      <div className={classes.problemsTableHeader__tagColumn}>
        <p>Tag</p>
      </div>

      <div className={classes.problemsTableHeader__deleteAllButtonContainer}>
        <button className={classes.problemsTableHeader__deleteAllButton}>
          Delete all
        </button>
      </div>
    </header>
  );
};

export default ProblemsTableHeader;
