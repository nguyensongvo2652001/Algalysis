import classes from "./PageNavigator.module.css";

const PageNavigator = (props) => {
  const {
    maxPage,
    minPage,
    currentActivePage,
    previousPageButtonClickHandler,
    nextPageButtonClickHandler,
  } = props;

  const allClasses = `${classes.pageNavigator} ${props.className}`;

  return (
    <div className={allClasses}>
      <button
        className={classes.pageNavigator_button}
        onClick={previousPageButtonClickHandler}
      >
        Previous page
      </button>

      <div className={classes.pageNavigator__activePage}>
        {currentActivePage}
      </div>

      <button
        className={classes.pageNavigator_button}
        onClick={nextPageButtonClickHandler}
      >
        Next page
      </button>
    </div>
  );
};

export default PageNavigator;
