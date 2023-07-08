import { useState } from "react";
import Modal from "../../UI/Modal/Modal";

import classes from "./ConfirmModal.module.css";
import LoadingSpinner from "../../UI/LoadingSpinner/LoadingSpinner";
import useErrorHandling from "../../../hooks/useErrorHandling";

const ConfirmModal = (props) => {
  const { question, confirmFunction, closeModal } = props;

  const [isConfirming, setIsConfirming] = useState(false);
  const { handleError } = useErrorHandling();

  const confirmButtonClickHandler = async () => {
    try {
      setIsConfirming(true);
      await confirmFunction();
      closeModal();
    } catch (err) {
      handleError(err);
    }
    setIsConfirming(false);
  };

  return (
    <Modal overlayClassName={classes.confirmModal} backdropOnClick={closeModal}>
      <p className={classes.confirmModal__question}>{question}</p>
      <div className={classes.confirmModal__buttons}>
        {isConfirming && <LoadingSpinner />}
        {!isConfirming && (
          <>
            <button
              className={classes.confirmModal__confirmButton}
              onClick={confirmButtonClickHandler}
            >
              Confirm
            </button>
            <button
              className={classes.confirmModal__cancelButton}
              onClick={closeModal}
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </Modal>
  );
};

export default ConfirmModal;
