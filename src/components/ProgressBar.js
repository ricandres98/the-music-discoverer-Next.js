import { useEffect, useState } from "react";
import formatTime from "utils/formatTime";
import styles from "styles/ProgressBar.module.scss";

const ProgressBar = ({ audio, playing }) => {
  //   const [playing, setPlaying] = useState(playing);

  const [stylesIn, setStylesIn] = useState({
    width: `${(audio?.currentTime / audio?.duration) * 100}%`,
  });

  useEffect(() => {
    if (playing) {
      const interval = setInterval(() => {
        setStylesIn({
          width: `${(audio?.currentTime / audio?.duration) * 100}%`,
        });
      }, 150);
      return () => {
        clearInterval(interval);
      };
    }
  }, [playing]);

  return (
    <div className={styles["progress-bar"]}>
      <div
        className={`${styles["progress-bar--out"]} ${styles["progress-bar-shape"]}`}
      >
        <div
          className={`${styles["progress-bar--in"]} ${styles["progress-bar-shape"]}`}
          style={stylesIn}
        ></div>
      </div>
      <span className={styles["progress-bar__time-passed"]}>
        {audio?.currentTime ? formatTime(audio?.currentTime) : "00:00"}
      </span>
      <span className={styles["progress-bar__time-left"]}>
        -{" "}
        {audio?.currentTime
          ? formatTime(audio?.duration - audio?.currentTime)
          : "00:00"}
      </span>
    </div>
  );
};

export default ProgressBar;
