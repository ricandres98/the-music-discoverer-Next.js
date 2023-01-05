import { useState } from "react";
import styles from 'styles/Header.module.scss';
import { useRouter } from "next/router";

const SearchBox = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const router = useRouter();

  const handleChange = (inputElement) => {
    setSearchQuery(inputElement.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    router.push(`/search/${searchQuery}`);
  }

  const handleKeyDown = (e) => {
    if(e.key == 'Enter') {
        e.preventDefault();
        router.push(`/search/${searchQuery}`);
    }
  }

  return (
    <div className={styles["header__search"]}>
      <form action="">
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => handleChange(e.target)}
          onKeyDown={(e) => handleKeyDown(e)}
        />
        <button 
          onClick={(e) => handleClick(e)} 
        >
          🔍
        </button>
      </form>
    </div>
  );
};

export default SearchBox;
