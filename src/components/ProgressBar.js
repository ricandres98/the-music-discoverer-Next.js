import { useEffect, useState } from "react";
import styles from "styles/Player.module.scss";

const ProgressBar = ({ audio, superPlaying }) => {

//   const [playing, setPlaying] = useState(superPlaying);

  const [stylesIn, setStylesIn] = useState({
    width: "0%",
  });

  useEffect(() => {
    if(superPlaying) {
        const interval = setInterval(() => {
          setStylesIn({
            width: `${(audio?.currentTime / audio?.duration) * 100}%`,
          });
        }, 150);    
    
        // if (superPlaying === false) {
        //   clearInterval(interval);
        // }
    
        return () => {
          clearInterval(interval);
        };
    }
  }, [superPlaying]);

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
      <span className={styles["progress-bar__time-passed"]}>0:00</span>
      <span className={styles["progress-bar__time-left"]}>0:00</span>
    </div>
  );
};

export default ProgressBar;
