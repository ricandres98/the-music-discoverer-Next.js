import styles from 'styles/TrackCard.module.scss';
import skeleton from 'styles/skeleton.module.scss';

const TrackSkeleton = () => {
  return (
    <div className={`${styles["track-item"]} ${skeleton["track-item"]} ${skeleton.skeleton}`}></div>
  );
};

export default TrackSkeleton;
