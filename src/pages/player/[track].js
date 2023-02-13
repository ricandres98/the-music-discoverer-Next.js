import corchea from 'assets/icons/corchea.svg'
import Image from 'next/image';
import Header from 'containers/Header';
import { useState, useEffect, useContext, useRef} from 'react';
import { useRouter } from 'next/router';
import useApiInstance from 'hooks/useApiInstance';
import PlayButton from 'components/PlayButton';
import PreviousTrackButton from 'components/PreviousTrackButton';
import LoopButton from 'components/LoopButton';
import NextTrackButton from 'components/NextTrackButton';
import ShuffleButton from 'components/ShuffleButton';
import AppContext from 'context/AppContext';
import ProgressBar from 'components/ProgressBar';
import styles from 'styles/Player.module.scss';

const Player = () => {
  const { state, setPlaylist } = useContext(AppContext);
  
  const [superPlaying, setSuperPlaying] = useState(false)
  const [track, setTrack] = useState({
    images: corchea,
  });
  const router = useRouter();
  const audioElement = useRef();

  useEffect(() => {
    const id = router.query.track;

    const getPlaylist = () => {
      const [_, hash] = router.asPath?.split("#");
      const [from, value] = hash ? hash.split("=") : '';
      // console.log({ from, value });
      let callback = () => console.log('nothing yet');
      let playlist = [];

      switch (from) {
        case "search":
          callback = async function callApi() {
            try {
              const query = value;
              const api = useApiInstance();
              const response = await api("search/", {
                params: {
                  type: "multi",
                  q: query,
                  limit: 10,
                },
              });
  
              const { data } = response;
              playlist = data.tracks.items.map(item => item.data);
              setPlaylist(playlist);
              // console.log(playlist);
            } catch(error) {
              console.error(error);
            }
          };
          break;
      }

      callback();
    };
    
    async function callApi() {
      try{
        const api = useApiInstance();
        const { data } = await api('tracks/', {
          params: {
            'ids': id,
          }
        });
        setTrack(data.tracks[0]);
      } catch(error) {
        console.error(error);
      }
    }
    
    if(router && router.query.track) {
      getPlaylist();
      callApi();
      audioElement.current.play();
      audioElement.current.paused ? setSuperPlaying(false) : setSuperPlaying(true);
    }
    
  }, [router]);
  
  // if (audioElement.current?.src && audioElement.current.paused) audioElement.current.play();

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
         <ProgressBar audio={audioElement.current} superPlaying={superPlaying} />
        </div>
        <div className={styles["player__buttons-panel"]}>
          <LoopButton audio={audioElement.current} />
          <PreviousTrackButton track={track} />
          <PlayButton audio={audioElement.current} setSuperPlaying={setSuperPlaying} superPlaying={superPlaying}/>
          <NextTrackButton track={track}/>
          <ShuffleButton />
        </div>
        <audio ref={audioElement} src={track.preview_url}></audio>
      </section>
    </>
  );
};

export default Player;