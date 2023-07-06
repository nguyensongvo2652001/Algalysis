import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import classes from "./MyToastContainer.module.css";

// react-toastify needs a ToastContainer to show the alert.
const MyToastContainer = ({ errorMessage }) => {
  return (
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      className={classes.toastContainer}
    />
  );
};

export default MyToastContainer;
