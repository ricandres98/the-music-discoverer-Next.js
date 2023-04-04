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
  const handleImageError = (e, name) => {
    let initials = "";
    if (name.includes(" ")) {
      initials = name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase();
    } else {
      initials = name.split("")[0].toUpperCase();
    }

    const placeholderImageURL = `https://via.placeholder.com/300x300/53a3a6/cfffe0?text=${initials}`;
    e.target.src = placeholderImageURL;
    console.log(e.target.src);
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
          onError={(e) => handleImageError(e)}
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
