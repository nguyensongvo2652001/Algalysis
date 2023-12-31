import React from "react";
import ReactDOM from "react-dom";

import Card from "../Card/Card";
import classes from "./Modal.module.css";

export const Backdrop = (props) => {
  const allClasses = `${props.className} ${classes.backdrop}`;

  const backdrop = <div className={allClasses} onClick={props.onClick} />;

  return backdrop;
};

const ModalOverlay = (props) => {
  const allClasses = `${classes.modal} ${props.className}`;
  return (
    <Card className={allClasses} noHoverStyle={true}>
      {props.children}
    </Card>
  );
};

const Modal = (props) => {
  const backdrop = ReactDOM.createPortal(
    <Backdrop
      onClick={props.backdropOnClick}
      className={props.backdropClassName}
    />,
    document.getElementById("backdrop-root")
  );
  const modalOverlay = ReactDOM.createPortal(
    <ModalOverlay className={props.overlayClassName}>
      {props.children}
    </ModalOverlay>,
    document.getElementById("overlay-root")
  );

  return (
    <>
      {backdrop}
      {modalOverlay}
    </>
  );
};

export default Modal;
