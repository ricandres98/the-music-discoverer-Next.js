import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import TrackCard from "components/TrackCard";
import Header from "containers/Header";
import Head from "next/head";
import useApiInstance from "hooks/useApiInstance";
import Image from "next/image";
import TrackContainer from "containers/TrackContainer";
import corchea from "assets/icons/corchea.svg";
import styles from "styles/Album.module.scss";

const albumView = (props) => {
  const [album, setAlbum] = useState();
  const [tracks, setTracks] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const id = router.query.album;

    async function callApi() {
      const api = useApiInstance();
      const { data } = await api("albums/", {
        params: {
          ids: id,
        },
      });

      setAlbum(data.albums[0]);
      setTracks(data.albums[0].tracks.items);
    }

    if (router && router.query.album) {
      callApi();
      console.log(album, tracks);
    }
  }, [router]);

  return (
    <>
      <Head>
        <title>Album - The music discoverer</title>
      </Head>
      <Header page="back-button" />
      <section className={styles["album-info-section"]}>
        <div className={styles["album-info"]}>
          <div
            className={
              album?.images
                ? `${styles["album-info__cover"]}`
                : `${styles["album-info__cover"]} ${styles["skeleton"]}`
            }
          >
            <Image
              src={album?.images ? album?.images[0]?.url : corchea}
              alt={album?.name}
              width={200}
              height={200}
            />
            {console.log(album)}
          </div>
          <div className={styles["album-info__data"]}>
            <h1 className={styles["album-info__title"]}>{album?.name}</h1>
            <h2 className={styles["album-info__artist"]}>
              {album?.artists.map((artist) => artist.name).join(", ")}
            </h2>
          </div>
        </div>
      </section>
      <section className="generic-list--tracks">
        <TrackContainer>
          {tracks?.map((track, index, arr) => (
            <TrackCard
              title={track.name}
              artists={track.artists.items}
              imageSources={album.images}
              id={track.id}
              key={track.id}
              list={arr}
              from={["album", router.query.album]}
            />
          ))}
        </TrackContainer>
      </section>
    </>
  );
};

export default albumView;
