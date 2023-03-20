import Image from "next/image";
import Link from "next/link";
import styles from "styles/ArtistCard.module.scss";

const ArtistCard = (props) => {
  const imageSize = 100;

  // const handleClick = () => {
  //   router.push(`/artist/${props.id}`);
  // };

  return (
    <Link
      href={`/artist/${props.id}`}
      className={styles["artist-item"]}
      // onClick={handleClick}
    >
      <div className={styles["artist-avatar"]}>
        <Image
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
