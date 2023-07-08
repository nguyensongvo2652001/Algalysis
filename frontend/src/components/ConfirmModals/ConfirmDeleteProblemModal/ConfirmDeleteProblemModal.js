import ConfirmModal from "../ConfirmModal/ConfirmModal";

const ConfirmDeleteProblemModal = (props) => {
  const { closeModal, confirmFunction, problem } = props;

  return (
    <ConfirmModal
      question={`Are you sure you want to delete problem ${problem.name} ? `}
      closeModal={closeModal}
      confirmFunction={confirmFunction}
    />
  );
};

export default ConfirmDeleteProblemModal;
