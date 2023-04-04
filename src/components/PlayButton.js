import { useEffect } from "react";
import Image from "next/image";
import playIcon from "assets/icons/Play.svg";
import pauseIcon from "assets/icons/pause.svg";
import styles from "styles/Player.module.scss";

const PlayButton = (props) => {
  // const [playing, setPlaying] = useState(
  //   props.audio ? !props.audio.paused : null
  // );

  const handleClick = () => {
    props.audio?.paused ? props.audio.play() : props.audio.pause();
    props.setPlaying(!props.audio.paused);
    // props.setSuperPlaying(!playing);
  };

  useEffect(() => {
    props.audio?.paused ? props.setPlaying(false) : props.setPlaying(true);
    const interval = setInterval(() => {
      // const trackIsOver = props.audio?.currentTime - props.audio?.duration < 0.05;
      if (props.audio?.ended) {
        props.setPlaying(false);
        clearInterval(interval);
      }
    }, 150);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <button
      type="button"
      className={props.playing ? `${styles.big} ${styles.pause}` : styles.big}
      onClick={handleClick}
    >
      <Image
        src={props.playing ? pauseIcon : playIcon}
        alt={props.playing ? "Pause" : "Play"}
      />
    </button>
  );
};

export default PlayButton;
