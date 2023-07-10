import ProblemTag from "./ProblemTag/ProblemTag";
import classes from "./TagsList.module.css";

const TagsList = (props) => {
  const { tags } = props;

  return (
    <ul className={classes.tags}>
      {tags.map((tag, index) => {
        //Example: tag.prob = 0.5283 => prob = 53 => probText = "53%"
        const prob = Math.round(tag.prob * 100);
        const probText = `${prob}%`;
        return <ProblemTag label={tag.label} prob={probText} key={index} />;
      })}
    </ul>
  );
};

export default TagsList;
