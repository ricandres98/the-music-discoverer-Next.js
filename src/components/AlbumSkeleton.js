import styles from "styles/AlbumCard.module.scss";
import skeleton from "styles/skeleton.module.scss";

const AlbumSkeleton = () => {
  return (
    <div className={styles["album-item"]}>
      <div
        className={`${styles["album-cover"]} ${skeleton["album-cover"]} ${skeleton.skeleton}`}
      ></div>
      <span className={`${styles["album-title"]} ${skeleton.skeleton}`}></span>
    </div>
  );
};

export default AlbumSkeleton;
