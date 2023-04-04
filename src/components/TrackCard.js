import Image from "next/image";
import { useContext } from "react";
import AppContext from "context/AppContext";
import Link from "next/link";
import styles from "styles/TrackCard.module.scss";

const TrackCard = (props) => {
  const imageSize = 100;
  const { setPlaylist } = useContext(AppContext);

  const handleClick = () => {
    // router.push(`/player/${props.id}#${props.from[0]}=${props.from[1]}`);
    setPlaylist(props.list);
  };
  const handleKey = (e) => {
    // router.push(`/player/${props.id}#${props.from[0]}=${props.from[1]}`);
    if (e.target === "Enter") {
      setPlaylist(props.list);
    }
  };

  return (
    <Link
      href={`/player/${props.id}#${props.from[0]}=${props.from[1]}`}
      className={styles["track-item"]}
      onClick={handleClick}
      onKeyDown={(e) => handleKey(e)}
    >
      <div className={styles["track-image"]}>
        <Image
          src={props.imageSources.sort((a, b) => b.width - a.width)[2].url}
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
    </Link>
  );
};

export default TrackCard;
