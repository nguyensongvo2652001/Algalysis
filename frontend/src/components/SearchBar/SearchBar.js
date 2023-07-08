import { useRef } from "react";
import classes from "./SearchBar.module.css";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const searchInputRef = useRef();
  const navigate = useNavigate();

  const searchIconClickHandler = () => {
    const input = searchInputRef.current.value;

    if (input === "") return;

    navigate(`/problems/page/1?q=${input}`);
    navigate(0);
  };

  return (
    <div className={classes.searchBar__container}>
      <input
        className={classes.searchBar__input}
        placeholder="Search for problems"
        ref={searchInputRef}
      />
      <ion-icon
        name="search-outline"
        className={classes.searchBar__glassIcon}
        onClick={searchIconClickHandler}
      ></ion-icon>
    </div>
  );
};

export default SearchBar;
