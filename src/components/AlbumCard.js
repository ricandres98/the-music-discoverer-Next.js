import styles from "styles/AlbumCard.module.scss";
import Image from "next/image";
import Link from "next/link";

const AlbumCard = (props) => {
  const imageSize = 100;

  // const handleClick = () => {
  //   router.push(`/album/${props.id}`);
  // };

  return (
    <Link
      href={`/album/${props.id}`}
      className={styles["album-item"]}
      // onClick={handleClick}
    >
      <div className={styles["album-cover"]}>
        <Image
          src={
            props.imageSources.filter(
              (source) => !(source.width <= imageSize)
            )[0].url
          }
          alt={props.title}
          width={imageSize}
          height={imageSize}
        />
      </div>
      <span className={styles["album-title"]}>{props.title}</span>
    </Link>
  );
};

export default AlbumCard;
