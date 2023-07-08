import MyLink from "../../../MyLink/MyLink";
import classes from "./RelatedProblem.module.css";

const RelatedProblem = (props) => {
  const { text, to } = props;

  return (
    <li className={classes.relatedProblem}>
      <MyLink className={classes.relatedProblem__link} text={text} to={to} />
    </li>
  );
};

export default RelatedProblem;
