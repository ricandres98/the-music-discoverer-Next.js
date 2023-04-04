import Image from "next/image";
import Link from "next/link";
import styles from "styles/ArtistCard.module.scss";

const ArtistCard = (props) => {
  const imageSize = 100;

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

    const placeholderImageURL = `https://via.placeholder.com/300x300/53a3a6/CFFFE0.jpg?text=${initials}`;
    e.target.src = placeholderImageURL;
  };

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
          onError={(e) => handleImageError(e, props.name)}
        />
      </div>
      <span className={styles["artist-name"]}>{props.name}</span>
    </Link>
  );
};

export default ArtistCard;
