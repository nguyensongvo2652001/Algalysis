import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import Modal from "../Modal";
import classes from "./LoadingModal.module.css";

const LoadingModal = (props) => {
  return (
    <Modal overlayClassName={classes.loadingModal__overlay}>
      <LoadingSpinner />
    </Modal>
  );
};

export default LoadingModal;
