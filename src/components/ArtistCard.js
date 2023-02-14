import Image from "next/image";
import { useRouter } from "next/router";
import styles from "styles/ArtistCard.module.scss";

const ArtistCard = (props) => {
  const router = useRouter();
  const imageSize = 100;
  const handleClick = () => {
    router.push(`/artist/${props.id}`);
  }
  return (
    <div className={styles["artist-item"]} onClick={handleClick}>
      <div className={styles["artist-avatar"]}>
        <Image src={props.srcImg} alt={props.name} width={imageSize} height={imageSize} />
      </div>
      <span className={styles["artist-name"]}>{props.name}</span>
    </div>
  );
};

export default ArtistCard;
