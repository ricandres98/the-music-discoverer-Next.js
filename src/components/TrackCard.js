import styles from "styles/TrackCard.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext } from "react";
import AppContext from "context/AppContext";

const TrackCard = (props) => {
  const imageSize = 100;
  const router = useRouter();
  const { state, setPlaylist } = useContext(AppContext);

  const handleClick = () => {
    router.push(`/player/${props.id}#${props.from[0]}=${props.from[1]}`);
    setPlaylist(props.list);
  };

  return (
    <div className={styles["track-item"]} onClick={handleClick}>
      <div className={styles["track-image"]}>
        <Image
          src={
            props.imageSources.sort((a, b) => b.width - a.width)[2]
              .url
          }
          alt={props.title}
          width={imageSize}
          height={imageSize}
        />
      </div>
      <div className={styles["track-info"]}>
        <span className={styles["track-title"]}>{props.title}</span>
        <span className={styles["track-artist"]}>
          {props.artists?.map((artist) => artist.profile.name).join(", ")}
        </span>
      </div>
    </div>
  );
};

export default TrackCard;
