import classes from "./SearchBar.module.css";

const SearchBar = () => {
  return (
    <div className={classes.searchBar__container}>
      <input
        className={classes.searchBar__input}
        placeholder="Search for problems"
        onChange={(e) => {
          e.currentTarget.value = e.currentTarget.value.toLowerCase();
        }}
      />
      <ion-icon
        name="search-outline"
        className={classes.searchBar__glassIcon}
      ></ion-icon>
    </div>
  );
};

export default SearchBar;
