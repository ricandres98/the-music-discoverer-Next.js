import { MyImage } from "./MyImage";
import Link from "next/link";
import styles from "styles/ArtistCard.module.scss";

const ArtistCard = (props) => {
  const imageSize = 100;

  console.log(props);
  return (
    <Link href={`/artist/${props.id}`} className={styles["artist-item"]}>
      <div className={styles["artist-avatar"]}>
        <MyImage
          src={props.srcImg}
          alt={props.name}
          width={imageSize}
          height={imageSize}
        />
      </div>
      <span className={styles["artist-name"]}>{props.name}</span>
    </Link>
  );
};

export default ArtistCard;
