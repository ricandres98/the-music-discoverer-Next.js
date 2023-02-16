import styles from "styles/ArtistCard.module.scss";
import skeleton from 'styles/skeleton.module.scss';

const ArtistSkeleton = () => {
  return (
    <div className={styles["artist-item"]}>
      <div className={`${styles["artist-avatar"]} ${skeleton["artist-avatar"]} ${skeleton.skeleton}`}></div>
      <span className={`${styles["artist-name"]} ${skeleton["artist-name"]} ${skeleton.skeleton}`}></span>
    </div>
  );
};

export default ArtistSkeleton;
