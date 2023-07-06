import React from "react";
import classes from "./LoadingSpinner.module.css"; // Import the CSS file for styling

const LoadingSpinner = (props) => {
  const allClasses = `${classes.loadingSpinner} ${props.className}`;
  return <div className={allClasses}></div>;
};

export default LoadingSpinner;
