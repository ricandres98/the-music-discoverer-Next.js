import styles from 'styles/Header.module.scss';

const BackButton = () => {
  const handleClick = () => {
    history.back();
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
