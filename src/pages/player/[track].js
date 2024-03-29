import corchea from "assets/icons/corchea.svg";
import Image from "next/image";
import Header from "containers/Header";
import { useState, useEffect, useContext, useRef } from "react";
import { useRouter } from "next/router";
import apiInstance from "utils/apiInstance";
import PlayButton from "components/PlayButton";
import PreviousTrackButton from "components/PreviousTrackButton";
import LoopButton from "components/LoopButton";
import NextTrackButton from "components/NextTrackButton";
import ShuffleButton from "components/ShuffleButton";
import AppContext from "context/AppContext";
import ProgressBar from "components/ProgressBar";
import styles from "styles/Player.module.scss";

const Player = () => {
  const { setPlaylist } = useContext(AppContext);

  const [playing, setPlaying] = useState(false);
  const [track, setTrack] = useState({
    images: corchea,
  });
  const router = useRouter();
  const audioElement = useRef();

  useEffect(() => {
    const id = router.query.track;

    const getPlaylist = () => {
      const [, hash] = router.asPath
        ? router.asPath.split("#")
        : [undefined, undefined];
      const [from, value] = hash ? hash.split("=") : "";
      let playlist = [];

      (async () => {
        try {
          const query = decodeURI(value);
          const api = apiInstance();
          switch (from) {
            case "search": {
              const { data } = await api("search/", {
                params: {
                  type: "multi",
                  q: query,
                  limit: 10,
                },
              });
              playlist = data.tracks.items.map((item) => item.data);
              break;
            }

            case "album": {
              const albumId = value;
              const { data } = await api("albums/", {
                params: {
                  ids: albumId,
                },
              });
              playlist = data.albums[0].tracks.items;
              break;
            }
          }
          setPlaylist(playlist);
        } catch (err) {
          console.error(err);
        }
      })();
    };

    async function callApi() {
      try {
        const api = apiInstance();
        const { data } = await api("tracks/", {
          params: {
            ids: id,
          },
        });
        setTrack(data.tracks[0]);
      } catch (error) {
        console.error(error);
      }
    }

    if (router && router.query.track) {
      getPlaylist();
      callApi();
      if (audioElement.current.readyState === 4) {
        audioElement.current.play();
        // PRUEBA ELIMINAR LA LINEA SUPERIOR
        audioElement.current.autoplay = true;
      }
      setPlaying(!audioElement.current.paused);
      console.log({ audio: audioElement.current });
    }
  }, [router, router.query.track]);

  return (
    <>
      <Header page="back-button" />
      <section className={styles.player}>
        <div className={styles["player__image-section"]}>
          <div className={styles["player__image-section__container"]}>
            <Image
              src={
                track.album
                  ? track.album.images.filter((image) => image.width > 200)[0]
                      .url
                  : corchea
              }
              alt="album cover"
              className="default"
              width={200}
              height={200}
            />
          </div>
        </div>
        <div className={styles["player__info"]}>
          <h3 className={styles["player__info__track-name"]}>
            {track.name ? track.name : "..."}
          </h3>
          <h4 className={styles["player__info__artist"]}>
            {track.artists
              ? track.artists.map((artist) => artist.name).join(", ")
              : "..."}
          </h4>
          <ProgressBar audio={audioElement.current} playing={playing} />
        </div>
        <div className={styles["player__buttons-panel"]}>
          <LoopButton audio={audioElement.current} />
          <PreviousTrackButton track={track} />
          <PlayButton
            audio={audioElement.current}
            setPlaying={setPlaying}
            playing={playing}
          />
          <NextTrackButton track={track} />
          <ShuffleButton />
        </div>
        <audio ref={audioElement} src={track.preview_url}></audio>
      </section>
    </>
  );
};

export default Player;
