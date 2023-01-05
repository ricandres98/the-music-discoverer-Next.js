import Image from "next/image";
import styles from "styles/ArtistCard.module.scss";

const ArtistCard = (props) => {
  const imageSize = 100;
  return (
    <div className={styles["artist-item"]}>
      <div className={styles["artist-avatar"]}>
        <Image src={props.srcImg} alt={props.name} width={imageSize} height={imageSize} />
      </div>
      <span className={styles["artist-name"]}>{props.name}</span>
    </div>
  );
};

export default ArtistCard;
