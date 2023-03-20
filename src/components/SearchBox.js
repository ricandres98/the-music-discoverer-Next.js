import { useState } from "react";
import styles from "styles/Header.module.scss";
import { useRouter } from "next/router";

const SearchBox = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const router = useRouter();

  const handleChange = (inputElement) => {
    setSearchQuery(inputElement.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (searchQuery) {
      router.push(`/search/${searchQuery}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key == "Enter") {
      e.preventDefault();
      if (searchQuery) {
        router.push(`/search/${searchQuery}`);
      }
    }
  };

  return (
    <div className={styles["header__search"]}>
      <form action="">
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => handleChange(e.target)}
          onKeyDown={(e) => handleKeyDown(e)}
        />
        <button onClick={(e) => handleClick(e)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default SearchBox;
