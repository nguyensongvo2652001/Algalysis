import { useState } from "react";
import classes from "./ProblemsTableHeader.module.css";
import ConfirmDeleteAllProblemsModal from "../../../ConfirmModals/ConfirmDeleteAllProblemsModal/ConfirmDeleteAllProblemsModal";
import { useNavigate } from "react-router-dom";
import useSendRequest from "../../../../hooks/useSendRequest";
import { successAlert } from "../../../../utils/alert";

const ProblemsTableHeader = () => {
  const [
    shouldShowConfirmDeleteAllProblemsModal,
    setShouldShowConfirmDeleteAllProblemsModal,
  ] = useState(false);
  const navigate = useNavigate();
  const { sendRequest } = useSendRequest();

  const openConfirmDeleteAllProblemsModal = () => {
    setShouldShowConfirmDeleteAllProblemsModal(true);
  };

  const closeConfirmDeleteAllProblemsModal = () => {
    setShouldShowConfirmDeleteAllProblemsModal(false);
  };

  const deleteAllProblems = async () => {
    const deleteAllProblemsURL = `${process.env.REACT_APP_BACKEND_BASE_URL}/currentUser/problem`;
    const response = await sendRequest(deleteAllProblemsURL, {
      method: "DELETE",
    });
    const content = await response.json();
    if (content.status !== "success") {
      throw new Error(content.message);
    }

    successAlert("Delete all problems successfully");
    navigate("/problems");
  };

  return (
    <header className={classes.problemsTableHeader}>
      {shouldShowConfirmDeleteAllProblemsModal && (
        <ConfirmDeleteAllProblemsModal
          closeModal={closeConfirmDeleteAllProblemsModal}
          confirmFunction={deleteAllProblems}
        />
      )}
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
        <button
          className={classes.problemsTableHeader__deleteAllButton}
          onClick={openConfirmDeleteAllProblemsModal}
        >
          Delete all
        </button>
      </div>
    </header>
  );
};

export default ProblemsTableHeader;
