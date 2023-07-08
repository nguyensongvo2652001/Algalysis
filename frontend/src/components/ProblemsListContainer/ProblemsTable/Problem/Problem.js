import Tag from "../../../UI/Tag/Tag";
import MyLink from "../../../MyLink/MyLink";
import classes from "./Problem.module.css";
import { formatDate } from "../../../../utils/date";
import { debounce } from "../../../../utils/debounce";
import { useState } from "react";
import ConfirmDeleteProblemModal from "../../../ConfirmModals/ConfirmDeleteProblemModal/ConfirmDeleteProblemModal";
import useSendRequest from "../../../../hooks/useSendRequest";
import { successAlert } from "../../../../utils/alert";

const Problem = (props) => {
  const { problem, setProblems } = props;

  const [
    shouldShowConfirmDeleteProblemModal,
    setShouldShowConfirmDeleteProblemModal,
  ] = useState(false);
  const { sendRequest } = useSendRequest();

  let displayName = problem.name;
  if (!displayName) displayName = "Untitled problem";

  const { analyzeResult } = problem;
  const tags = analyzeResult?.tags;
  let tagWithHighestProb;
  if (tags) {
    tagWithHighestProb = tags[0].label;
  }

  const notAnalyzedText = "Not analyzed";

  const showConfrmDeleteProblemModal = () => {
    setShouldShowConfirmDeleteProblemModal(true);
  };

  const closeConfirmDeleteProblemModal = () => {
    setShouldShowConfirmDeleteProblemModal(false);
  };

  const deleteProblem = async () => {
    const deleteProblemURL = `${process.env.REACT_APP_BACKEND_BASE_URL}/problem/${problem._id}`;
    const response = await sendRequest(deleteProblemURL, { method: "DELETE" });
    const content = await response.json();
    if (content.status !== "success") {
      throw new Error(content.message);
    }

    setProblems((prevProblems) => {
      const newProblems = prevProblems.filter(
        (prevProblem) => prevProblem._id !== problem._id
      );
      return newProblems;
    });

    successAlert("Delete problem successfully");
  };

  return (
    <li className={classes.problem}>
      {shouldShowConfirmDeleteProblemModal && (
        <ConfirmDeleteProblemModal
          closeModal={closeConfirmDeleteProblemModal}
          confirmFunction={deleteProblem}
          problem={problem}
        />
      )}
      <div className={classes.problem__nameContainer}>
        <MyLink
          text={displayName}
          to={`/problems/${problem._id}`}
          className={classes.problem__nameValue}
        />
      </div>

      <div className={classes.problem__dateCreatedContainer}>
        <p className={classes.problem__dateCreatedValue}>
          {formatDate(problem.dateCreated)}
        </p>
      </div>

      <div className={classes.problem__difficultyContainer}>
        {analyzeResult && (
          <Tag value={analyzeResult.difficulty.toLowerCase()} />
        )}
        {!analyzeResult && (
          <p className={classes.problem__notAnalyzedText}>{notAnalyzedText}</p>
        )}
      </div>

      <div className={classes.problem__complexityContainer}>
        {analyzeResult && (
          <p
            className={classes.problem__complexityValue}
          >{`O(${analyzeResult.complexity})`}</p>
        )}
        {!analyzeResult && (
          <p className={classes.problem__notAnalyzedText}>{notAnalyzedText}</p>
        )}
      </div>

      <div className={classes.problem__tagContainer}>
        {analyzeResult && <Tag value={tagWithHighestProb.toLowerCase()} />}
        {!analyzeResult && (
          <p className={classes.problem__notAnalyzedText}>{notAnalyzedText}</p>
        )}
      </div>

      <div className={classes.problem__trashIconContainer}>
        <ion-icon
          name="trash-outline"
          onClick={showConfrmDeleteProblemModal}
        ></ion-icon>
      </div>
    </li>
  );
};

export default Problem;
