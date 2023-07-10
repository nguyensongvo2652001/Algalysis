import RelatedProblem from "./RelatedProblem/RelatedProblem";
import classes from "./RelatedProblems.module.css";

const RelatedProblems = (props) => {
  const { relatedProblems } = props;

  return (
    <div className={classes.relatedProblems__container}>
      <p className={classes.relatedProblems__title}>Related problems</p>
      <ul className={classes.relatedProblems__list}>
        {relatedProblems.map((problem, index) => {
          return (
            <RelatedProblem key={index} text={problem.name} to={problem.link} />
          );
        })}
      </ul>
    </div>
  );
};

export default RelatedProblems;
