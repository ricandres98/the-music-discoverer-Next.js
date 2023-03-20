import styles from "styles/Search-results.module.scss";
import TrackSkeleton from "components/TrackSkeleton";

const TrackContainer = ({ children }) => {
  // children = children ? children : 'hola';
  const trackSkeletonArray = () => {
    const array = [];
    for (let i = 0; i < 10; i++) {
      array.push(<TrackSkeleton key={i} />);
    }
    return array;
  };

  return (
    <div className={styles["tracks-list"]}>
      {children.length ? children : trackSkeletonArray()}
    </div>
  );
};

export default TrackContainer;
