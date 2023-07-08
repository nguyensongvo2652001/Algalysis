import classes from "./ProblemTag.module.css";

const ProblemTag = (props) => {
  const { label, prob } = props;
  return (
    <li className={classes.tag}>
      <span className={classes.tag__probBar} style={{ width: prob }}></span>
      <p className={classes.tag__label}>{label}</p>
      <p className={classes.tag__prob}>{prob}</p>
    </li>
  );
};

export default ProblemTag;
