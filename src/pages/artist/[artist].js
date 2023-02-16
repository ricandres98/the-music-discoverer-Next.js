import BoxGridContainer from "containers/BoxGridContainer";
import Header from "containers/Header";
import Image from "next/image";
import useApiInstance from "hooks/useApiInstance";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from 'styles/ArtistPage.module.scss';
import AlbumCard from "components/AlbumCard";

const artistPage = () => {
  const router = useRouter();
  const [ artist, setArtist ] = useState(undefined);
  const [ albums, setAlbums ] = useState([]);

  useEffect(() => {
    const id = router.query.artist;
    const api = useApiInstance();

    const getArtistData = async () => {
      try {
        const { data } = await api("artists/", {
          params: {
            ids: id,
          },
        });
        console.log(data);
        console.log(data.artists[0]);
        setArtist(data.artists[0]);
      } catch (err) {
        console.error(err);
      }
    };

    const getAlbumsFromArtist = async () => {
      try {
        const { data } = await api("artist_albums/", {
          params: {
            id: id,
            limit: 10,
          }
        });
        console.log("data2: ", data);
        console.log(data.data.artist.discography.albums.items.map(item => item.releases.items[0]));

        const cleanData = data.data.artist.discography.albums.items.map(item => item.releases.items[0]);
        setAlbums(cleanData);
        
      } catch(err) {
        throw(new Error(err));
      }
    };

    if (router && router.query.artist) {
      getArtistData();
      getAlbumsFromArtist();
      console.log(artist);
    }
  }, [router]);

  return (
    <>
      <Header page="back-button" />
      <Head>
        <title>{artist ? artist.name : 'Artist'} - The music Discoverer</title>
      </Head>
      <section className={styles.artist}>
        <div className={styles["artist__profile"]}>
          <div className={styles["artist-image"]}>
            <picture>
              <source media="(min-width: 600px)" srcSet="" />
              <Image
                src={artist ? artist.images[0].url : "/"}
                width={600}
                height={600}
                alt={artist ? artist.name : "default artist image"}
              />
            </picture>
          </div>
          <h1 className={styles["artist-name"]}>{artist?.name}</h1>
        </div>
        <div className={styles["artist__albums"]}>
          <div
            className={`${styles["artist__albums__title"]} ${styles["artist-section-title"]}`}
          >
            <h2>Albums</h2>
            <button type="button" className={styles["see-more-button"]}>
              See more
            </button>
          </div>
          <BoxGridContainer type='album'>
            {albums?.map(album => (
            <AlbumCard 
              title={album.name}
              imageSources={album.coverArt.sources}
              key={album.id}
              id={album.id}            
            />
            ))}
          </BoxGridContainer>
        </div>
      </section>
    </>
  );
};

export default artistPage;