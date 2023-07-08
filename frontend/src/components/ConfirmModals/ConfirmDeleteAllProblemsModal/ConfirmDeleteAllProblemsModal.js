import ConfirmModal from "../ConfirmModal/ConfirmModal";

const ConfirmDeleteAllProblemsModal = (props) => {
  const { closeModal, confirmFunction } = props;

  return (
    <ConfirmModal
      question={`Are you sure you want to delete ALL problems ? `}
      closeModal={closeModal}
      confirmFunction={confirmFunction}
    />
  );
};

export default ConfirmDeleteAllProblemsModal;
