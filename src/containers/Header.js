import BackButton from 'components/BackButton';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from 'styles/Header.module.scss';
import SearchBox from '../components/SearchBox';

const Header = (props) => {
  const page = props.page;
  const router = useRouter();
  const { query } = router.query;
  const [scrollValue, setScrollValue] = useState(0);
  
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
    
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollValue(position);
      console.log(scrollValue);
    }

    const onScroll = () => window.requestAnimationFrame(handleScroll)

    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollValue]);

  return (
    <header className={scrollValue < 5 ? styles.header : `${styles.header} ${styles.shadow}`}>
        {headerSwitch(page)}
    </header>
  );
};

export default Header;
