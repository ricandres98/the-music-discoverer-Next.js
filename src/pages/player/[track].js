import playIcon from 'assets/icons/Play.svg';
import pauseIcon from 'assets/icons/pause.svg';
import previousIcon from 'assets/icons/Previous.svg';
import nextIcon from 'assets/icons/Next.svg';
import loopIcon from 'assets/icons/Loop.svg';
import shuffleIcon from 'assets/icons/Shuffle.svg';
import corchea from 'assets/icons/corchea.svg'
import Image from 'next/image';
import Header from 'containers/Header';
import { useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import useApiInstance from 'hooks/useApiInstance';
import styles from 'styles/Player.module.scss';

const Player = () => {
  const [track, setTrack] = useState({
    images: corchea
  });
  const router = useRouter();
  console.log(router);

  useEffect(() => {
    const id = router.query.track;
    async function callApi() {
      const api = useApiInstance();
      const { data } = await api('tracks/', {
        params: {
          'ids': id,
        }
      });
      setTrack(data.tracks[0]);
    }
    if(router && router.query.track) {
      callApi();
      console.log(track);
    }
    
  }, [router])
  

  return (
    <>
      <Header page='back-button'/>
      <section className={styles.player}>
        <div className={styles["player__image-section"]}>
          <div className={styles["player__image-section__container"]}>
            <Image
              src={track.album 
                ? track.album.images.filter(image => image.width > 200)[0].url
                : corchea}
              alt="album cover"
              className="default"
              width={200}
              height={200}
            />
          </div>
        </div>
        <div className={styles["player__info"]}>
          <h3 className={styles["player__info__track-name"]}>{track.name ? track.name : '...'}</h3>
          <h4 className={styles["player__info__artist"]}>
            {track.artists
            ? track.artists.map(artist => artist.name).join(', ')
            : '...'}
          </h4>
          <div className={styles["progress-bar"]}>
            <div
              className={`${styles["progress-bar--out"]} ${styles["progress-bar-shape"]}`}
            >
              <div
                className={`${styles["progress-bar--in"]} ${styles["progress-bar-shape"]}`}
              ></div>
            </div>
            <span className={styles["progress-bar__time-passed"]}>0:00</span>
            <span className={styles["progress-bar__time-left"]}>0:00</span>
          </div>
        </div>
        <div className={styles["player__buttons-panel"]}>
          <button type="button">
            <Image src={loopIcon} alt="Repeat" />
          </button>
          <button type="button">
            <Image src={previousIcon} alt="Previous" />
          </button>
          <button type="button" className={styles.big}>
            <Image src={playIcon} alt="Play" />
          </button>
          <button type="button">
            <Image src={nextIcon} alt="Next" />
          </button>
          <button type="button">
            <Image src={shuffleIcon} alt="Shuffle" />
          </button>
        </div>
        <audio src={track.preview_url}></audio>
      </section>
    </>
  );
};

export default Player;