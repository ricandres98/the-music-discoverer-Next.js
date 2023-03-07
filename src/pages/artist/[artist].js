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
        if (cleanData.length === 0) setAlbums('No data could be found')
        else setAlbums(cleanData);
        
      } catch(err) {
        setAlbums('No data could be found');
        // throw(new Error(err));
      }
    };

    if (router && router.query.artist) {
      getArtistData();
      getAlbumsFromArtist();
      console.log(artist);
    }
  }, [router]);

  const seeMoreAlbums = () => {
    const id = router.query.artist;
    router.push(`/artist/albums/${id}`);
  }

  return (
    <>
      <Header page="back-button" />
      <Head>
        <title>{`${artist ? artist.name : "Artist"} - The music Discoverer`}</title>
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
          <div className={styles["artist-data"]}>
            <h1 className={styles["artist-name"]}>{artist?.name}</h1>
            <ul className={styles["artist-genres"]}>
              {artist?.genres.map(genre => (
                <li key={`gender-${genre}`}>{genre}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className={styles["artist__albums"]}>
          <div
            className={`${styles["artist__albums__title"]} ${styles["artist-section-title"]}`}
          >
            <h2>Albums</h2>
            <button 
              type="button" 
              className={styles["see-more-button"]}
              onClick={seeMoreAlbums}
            >
              See more
            </button>
          </div>
          <BoxGridContainer type="album">
            {typeof albums === "object"
              ? albums?.map((album) => (
                  <AlbumCard
                    title={album.name}
                    imageSources={album.coverArt.sources}
                    key={album.id}
                    id={album.id}
                  />
                ))
              : albums}
          </BoxGridContainer>
        </div>
      </section>
    </>
  );
};

export default artistPage;