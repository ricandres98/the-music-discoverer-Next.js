import Image from "next/image";
import shuffleIcon from "assets/icons/Shuffle.svg";
import { useContext, useEffect } from "react";
import styles from "styles/Player.module.scss";
import AppContext from "context/AppContext";

const ShuffleButton = () => {
  const { state, setShuffle, shuffle, setState } = useContext(AppContext);

  const handleClick = () => {
    setShuffle((prev) => !prev);
  };

  useEffect(() => {
    if (shuffle) {
      const list = [...state.playlist];
      list.sort(() => Math.random() - 0.5);
      setState((prev) => {
        return {
          ...prev,
          randomPlaylist: list,
        };
      });
    }
  }, [shuffle]);

  return (
    <button
      type="button"
      onClick={handleClick}
      className={shuffle ? styles["loop-on"] : ""}
    >
      <Image src={shuffleIcon} alt="Shuffle" />
    </button>
  );
};

export default ShuffleButton;
