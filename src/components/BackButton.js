import { useRouter } from 'next/router';
import styles from 'styles/Header.module.scss';

const BackButton = () => {
  const router = useRouter();

  const handleClick = () => {
    if (history.length <= 2) {
      router.push("/");
    } else {
      history.back();
    }
  };

  return (
    <button className={styles["header__back-button"]} onClick={handleClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        class="w-5 h-5"
      >
        <path
          fill-rule="evenodd"
          d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
  );
};

export default BackButton;
