import { useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import SearchBar from "../SearchBar/SearchBar";
import classes from "./ProblemsListContainer.module.css";
import ProblemsTable from "./ProblemsTable/ProblemsTable";
import PageNavigator from "../PageNavigator/PageNavigator";
import RequiredLoginComponent from "../RequiredLoginComponent/RequiredLoginComponent";
import useSendRequest from "../../hooks/useSendRequest";
import useErrorHandling from "../../hooks/useErrorHandling";
import { useContext, useEffect, useState } from "react";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";
import AuthContext from "../../contexts/authContext";

const ProblemsListContainer = () => {
  const MAX_PROBLEMS_PER_PAGE = 10;

  const authContext = useContext(AuthContext);
  const authContextUser = authContext.currentUser;
  const [currentUser, setCurrentUser] = useState(undefined);
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (authContextUser) {
      setCurrentUser(authContextUser);
      setUsername(authContextUser.email.split("@")[0]);
    }
  }, [authContextUser]);

  const params = useParams();
  const currentPage = Number(params.pageNumber);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("q");

  const navigate = useNavigate();

  const { sendRequest } = useSendRequest();
  const { handleError } = useErrorHandling();
  const [isGettingProblems, setIsGettingProblems] = useState(true);
  const [problems, setProblems] = useState([]);
  const [maxNumberOfPages, setMaxNumberOfPaqes] = useState(1);

  const previousPageButtonClickHandler = () => {
    let prevPageLink = `/problems/page/${currentPage - 1}`;
    if (searchQuery) {
      prevPageLink += `?q=${searchQuery}`;
    }
    navigate(prevPageLink);
    navigate(0);
  };

  const nextPageButtonClickHandler = () => {
    let nextPageLink = `/problems/page/${currentPage + 1}`;
    if (searchQuery) {
      nextPageLink += `?q=${searchQuery}`;
    }
    navigate(nextPageLink);
    navigate(0);
  };

  let problemsListJSX = (
    <>
      <ProblemsTable problems={problems} setProblems={setProblems} />
      <div className={classes.problemsListContainer__pageNavigatorContainer}>
        <PageNavigator
          minPage={1}
          maxPage={maxNumberOfPages}
          currentActivePage={currentPage}
          previousPageButtonClickHandler={previousPageButtonClickHandler}
          nextPageButtonClickHandler={nextPageButtonClickHandler}
        />
      </div>
    </>
  );

  if (
    isNaN(currentPage) ||
    currentPage > maxNumberOfPages ||
    currentPage <= 0
  ) {
    problemsListJSX = (
      <p className={classes.problemsListContainer__invalidPageNumber}>
        Invalid page number
      </p>
    );
  }

  useEffect(() => {
    const getProblems = async () => {
      let getProblemsURL = `${process.env.REACT_APP_BACKEND_BASE_URL}/currentUser/problem?limit=${MAX_PROBLEMS_PER_PAGE}&page=${currentPage}`;
      if (searchQuery) {
        getProblemsURL = `${process.env.REACT_APP_BACKEND_BASE_URL}/currentUser/problem/search?limit=${MAX_PROBLEMS_PER_PAGE}&page=${currentPage}&q=${searchQuery}`;
      }

      try {
        setIsGettingProblems(true);

        const response = await sendRequest(getProblemsURL);
        const content = await response.json();

        if (content.status !== "success") {
          throw new Error(content.message);
        }

        const { problems, maxNumberOfPages } = content.data;
        setProblems(problems);
        setMaxNumberOfPaqes(maxNumberOfPages);
      } catch (err) {
        handleError(err);
      }
      setIsGettingProblems(false);
    };

    if (!isNaN(currentPage) && currentPage > 0) getProblems();
    else setIsGettingProblems(false);
  }, [currentPage, handleError, searchQuery, sendRequest]);

  return (
    <RequiredLoginComponent>
      <div className={classes.problemsListContainer}>
        <Navbar />
        <p className={classes.problemsListContainer__welcomeMessage}>
          Welcome back <span>{username}</span>
        </p>
        <SearchBar />
        {isGettingProblems && <LoadingSpinner />}
        {!isGettingProblems && problemsListJSX}
      </div>
    </RequiredLoginComponent>
  );
};

export default ProblemsListContainer;
