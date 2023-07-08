import ProblemTag from "./ProblemTag/ProblemTag";
import classes from "./TagsList.module.css";

const TagsList = (props) => {
  return (
    <ul className={classes.tags}>
      <ProblemTag label="Dynamic Programming" prob="52%" />
      <ProblemTag label="Hashmap" prob="27%" />
      <ProblemTag label="Implementation" prob="8%" />
      <ProblemTag label="Trie" prob="6%" />
      <ProblemTag label="DFS" prob="6%" />
    </ul>
  );
};

export default TagsList;
