import BackButton from 'components/BackButton';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styles from 'styles/Header.module.scss';
import SearchBox from '../components/SearchBox';

const Header = (props) => {
  const page = props.page;
  const router = useRouter();
  const { query } = router.query;
  
  function headerSwitch (page) {
    switch (page) {
      case "home":
        return (
          <>
            <h1 className={styles["header__main-title"]}>
              The Music Discoverer
            </h1>
            <SearchBox />
          </>
        );
      case "search":
        return (
          <>
            <BackButton/>
            <SearchBox />
            <h1
              className={`${styles["header__section-title"]} ${styles["search-section-title"]}`}
            >
              Results for{" "}
              <span className={styles["search-query"]}>{query}</span>
            </h1>
          </>
        );
      case "back-button":
        return (
          <>
            <BackButton />
          </>
        );
    }
  }

  useEffect(() => {
    const scrollTop = window.scrollY;
    console.log(scrollTop);
  });

  return (
    <header className={styles.header}>
        {headerSwitch(page)}
    </header>
  );
};

export default Header;
