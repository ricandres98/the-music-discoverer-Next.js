import BoxGridContainer from "containers/BoxGridContainer";
import Header from "containers/Header";
import Image from "next/image";
import useApiInstance from "hooks/useApiInstance";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from 'styles/ArtistPage.module.scss';

const artistPage = () => {
    const router = useRouter();
    const [ artist, setArtist ] = useState(undefined);

    useEffect(() => {
        const callApi = async () => {
            try {
                const id = router.query.artist;
                const api = useApiInstance();
                const { data } = await api ('artists/', {
                    params: {
                        ids: id,
                    }
                });
                console.log(data);
                console.log(data.artists[0])
                setArtist(data.artists[0]);
            } catch (err) {
                console.error(err);
            }
        }

        if (router && router.query.artist) {
            callApi();
            console.log(artist);
        }
    }, [router]);

  return (
    <>
      <Header page='back-button'/>
      <Head>
        <title>Artist - The music Discoverer</title>
      </Head>
      <section className={styles.artist}>
        <div className={styles["artist__profile"]}>
          <div className={styles["artist-image"]}>
            <picture>
              <source media="(min-width: 600px)" srcSet="" />
              <Image src={artist ? artist.images[0].url : '/'} width={500} height={500} alt={artist ? artist.name : '. . .'} />
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
          {/* <BoxGridContainer type='album'>
            {}
          </BoxGridContainer> */}
        </div>
      </section>
    </>
  );
};

export default artistPage;