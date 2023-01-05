import styles from "styles/ArtistCard.module.scss";
import skeleton from 'styles/skeleton.module.scss';

const ArtistSkeleton = () => {
  return (
    <div class={styles["artist-item"]}>
      <div class={`${styles["artist-avatar"]} ${skeleton["artist-avatar"]} ${skeleton.skeleton}`}></div>
      <span class={`${styles["artist-name"]} ${skeleton["artist-name"]} ${skeleton.skeleton}`}></span>
    </div>
  );
};

export default ArtistSkeleton;
