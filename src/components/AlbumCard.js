import styles from 'styles/AlbumCard.module.scss';
import Image from 'next/image';

const AlbumCard = (props) => {
  const imageSize = 100;
  return (
    <div className={styles["album-item"]}>
      <div className={styles["album-cover"]}>
        <Image 
          src={props.imageSources.filter(source => !(source.width <= imageSize))[0].url} 
          alt={props.title}
          width={imageSize}
          height={imageSize}
          />
      </div>
      <span className={styles["album-title"]}>{ props.title }</span>
    </div>
  );
};

export default AlbumCard;
