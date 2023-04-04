import styles from "styles/AlbumCard.module.scss";
import Link from "next/link";
import { MyImage } from "./MyImage";

const AlbumCard = (props) => {
  const imageSize = 100;

  // const handleImageError = (e, name) => {
  //   let initials = "";
  //   if (name.includes(" ")) {
  //     initials = name
  //       .split(" ")
  //       .map((word) => word[0])
  //       .join("")
  //       .toUpperCase();
  //   } else {
  //     initials = name.split("")[0].toUpperCase();
  //   }

  //   const placeholderImageURL = `https://via.placeholder.com/300x300/53a3a6/CFFFE0.jpg?text=${initials}`;
  //   e.target.src = placeholderImageURL;
  // };

  return (
    <Link
      href={`/album/${props.id}`}
      className={styles["album-item"]}
      // onClick={handleClick}
    >
      <div className={styles["album-cover"]}>
        <MyImage
          src={
            props.imageSources.filter(
              (source) => !(source.width <= imageSize)
            )[0].url
          }
          alt={props.title}
          width={imageSize}
          height={imageSize}
          // onError={(e) => handleImageError(e, props.name)}
        />
      </div>
      <span className={styles["album-title"]}>{props.title}</span>
    </Link>
  );
};

export default AlbumCard;
