import { useEffect, useState } from "react";
import Image from "next/image";
import playIcon from "assets/icons/Play.svg";
import pauseIcon from "assets/icons/pause.svg";
import styles from "styles/Player.module.scss";

const PlayButton = (props) => {
  const [playing, setPlaying] = useState(!props.audio?.paused);

  const handleClick = () => {
    props.audio.paused 
      ? props.audio.play()
      : props.audio.pause();
      
      setPlaying(!playing);
      props.setSuperPlaying(!playing);
      
      console.log(`${props.audio.paused}!!!!!!!!!!!!!!!!!!!!`)
    };
    
    useEffect(() => {
      props.audio?.paused 
        ? setPlaying(false)
        : setPlaying(true);

      const interval = setInterval(()=>{
        const trackIsOver = props.audio?.currentTime - props.audio?.duration < 0.05;
        if(trackIsOver) {
          setPlaying(false);
        }
      }, 150);

      return () => {
        clearInterval(interval);
      }
    });
  

  return (
    <button
      type="button"
      className={playing ? `${styles.big} ${styles.pause}` : styles.big}
      onClick={handleClick}
    >
      <Image
        src={playing ? pauseIcon : playIcon}
        alt={playing ? "Pause" : "Play"}
      />
    </button>
  );
};

export default PlayButton;
