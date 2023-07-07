import ConfirmModal from "../ConfirmModal/ConfirmModal";

const ConfirmLogOutModal = (props) => {
  const { confirmFunction, closeModal } = props;

  return (
    <ConfirmModal
      question="Are you sure you want to log out ?"
      confirmFunction={confirmFunction}
      closeModal={closeModal}
    />
  );
};

export default ConfirmLogOutModal;
