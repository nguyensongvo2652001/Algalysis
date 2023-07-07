import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import SearchBar from "../SearchBar/SearchBar";
import classes from "./ProblemsListContainer.module.css";
import ProblemsTable from "./ProblemsTable/ProblemsTable";
import PageNavigator from "../PageNavigator/PageNavigator";
import RequiredLoginComponent from "../RequiredLoginComponent/RequiredLoginComponent";

const ProblemsListContainer = () => {
  const params = useParams();
  const currentPage = Number(params.pageNumber);
  const navigate = useNavigate();

  const previousPageButtonClickHandler = () => {
    navigate(`/problems/page/${currentPage - 1}`);
    navigate(0);
  };

  const nextPageButtonClickHandler = () => {
    navigate(`/problems/page/${currentPage + 1}`);
    navigate(0);
  };

  return (
    <RequiredLoginComponent>
      <div className={classes.problemsListContainer}>
        <Navbar />
        <p className={classes.problemsListContainer__welcomeMessage}>
          Welcome back <span>someUsername</span>
        </p>
        <SearchBar />
        <ProblemsTable />
        <div className={classes.problemsListContainer__pageNavigatorContainer}>
          <PageNavigator
            minPage={1}
            maxPage={10}
            currentActivePage={currentPage}
            previousPageButtonClickHandler={previousPageButtonClickHandler}
            nextPageButtonClickHandler={nextPageButtonClickHandler}
          />
        </div>
      </div>
    </RequiredLoginComponent>
  );
};

export default ProblemsListContainer;
