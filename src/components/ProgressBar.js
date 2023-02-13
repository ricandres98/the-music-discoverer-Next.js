import { useEffect, useState } from "react";
import useFormatTime from "hooks/useFormatTime";
import styles from "styles/ProgressBar.module.scss";

const ProgressBar = ({ audio, superPlaying }) => {
  //   const [playing, setPlaying] = useState(superPlaying);

  const [stylesIn, setStylesIn] = useState({
    width: `${(audio?.currentTime / audio?.duration) * 100}%`,
  });

  useEffect(() => {
    if (superPlaying) {
      const interval = setInterval(() => {
        setStylesIn({
          width: `${(audio?.currentTime / audio?.duration) * 100}%`,
        });

        // if(audio.ended && !audio.paused) {
        //   console.log('CHACABÓ');
        // }
      }, 150);
      
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
      <span className={styles["progress-bar__time-passed"]}>
        {audio?.currentTime ? useFormatTime(audio?.currentTime) : '00:00'}
      </span>
      <span className={styles["progress-bar__time-left"]}>
        - {audio?.currentTime ? useFormatTime(audio?.duration - audio?.currentTime) : '00:00' }
      </span>
    </div>
  );
};

export default ProgressBar;
