import { useState } from "react";
import toast from "react-hot-toast";
import { FaSearch } from "react-icons/fa";

import css from "../SearchBar/SearchBar.module.css";

const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => setQuery(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      toast.error("Please enter a search term!");
      return;
    }
    onSubmit(query);
    setQuery("");
  };

  return (
    <header className={css.searchBar}>
      <form onSubmit={handleSubmit} className={css.inputWrapper}>
        <button type="submit" className={css.searchButton} aria-label="Search">
          <FaSearch className={css.searchIcon} size={18} />
        </button>

        <input
          className={css.input}
          type="text"
          placeholder="Search images and photos"
          value={query}
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

export default SearchBar;
