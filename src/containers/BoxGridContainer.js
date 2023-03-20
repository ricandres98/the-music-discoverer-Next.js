import styles from "styles/Search-results.module.scss";
import AlbumSkeleton from "components/AlbumSkeleton";
import ArtistSkeleton from "components/ArtistSkeleton";

const BoxGridContainer = ({ children, type }) => {
  const albumSkeletonArray = () => {
    const array = [];
    for (let i = 0; i < 10; i++) {
      array.push(<AlbumSkeleton key={i} />);
    }
    return array;
  };

  const artistSkeletonArray = () => {
    const array = [];
    for (let i = 0; i < 10; i++) {
      array.push(<ArtistSkeleton key={i} />);
    }
    return array;
  };

  const currentSkeleton = () => {
    if (type === "album") {
      return albumSkeletonArray();
    }
    if (type === "artist") {
      return artistSkeletonArray();
    }
  };

  return (
    <div className={styles["artists-list"]}>
      {children.length ? children : currentSkeleton()}
    </div>
  );
};

export default BoxGridContainer;
