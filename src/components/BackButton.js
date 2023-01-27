import { useRouter } from 'next/router';
import styles from 'styles/Header.module.scss';

const BackButton = () => {
  const router = useRouter();

  const handleClick = () => {
    if (history.length <= 2){
      router.push('/')
    } else {
      history.back();
    }
  };

  return (
      <button 
        className={styles["header__back-button"]}
        onClick={handleClick}
      >
        &lt;
      </button>
  ) 
};

export default BackButton;
