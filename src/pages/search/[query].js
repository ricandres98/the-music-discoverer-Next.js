import AlbumCard from "components/AlbumCard";
import ArtistCard from "components/ArtistCard";
import Header from "containers/Header";
import TrackCard from "components/TrackCard";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import apiInstance from "utils/apiInstance";
import TrackContainer from "containers/TrackContainer";
import BoxGridContainer from "containers/BoxGridContainer";
import styles from "styles/Search-results.module.scss";

const Search = () => {
  const router = useRouter();

  const [tracks, setTracks] = useState([]);
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    async function callApi() {
      try {
        const query = router.query.query;
        const api = apiInstance();
        const response = await api("search/", {
          params: {
            type: "multi",
            q: query,
            limit: 10,
          },
        });
        const data = response.data;
        console.log({ data });
        setTracks(data?.tracks.items.map((item) => item.data));
        setAlbums(data?.albums.items.map((item) => item.data));
        setArtists(data?.artists.items.map((item) => item.data));
      } catch (err) {
        setTracks("Sorry, no data could be found 😥");
        throw new Error(err);
      }
    }
    if (router && router.query.query) {
      console.log(router);
      callApi();
    }
    return () => {
      setAlbums([]);
      setArtists([]);
      setTracks([]);
    };
  }, [router]);

  return (
    <>
      <Head>
        <title>{router.query.query} - The music discoverer</title>
      </Head>

      <Header page="search" />
      {typeof tracks === "object" ? (
        <section className={styles["search-results-list"]}>
          <div className={styles["results__tracks"]}>
            <h2>Tracks</h2>
            <TrackContainer>
              {tracks?.map((track, index, arr) => (
                <TrackCard
                  title={track.name}
                  artists={track.artists.items}
                  imageSources={track.albumOfTrack.coverArt.sources}
                  id={track.id}
                  key={track.id}
                  list={arr}
                  from={["search", router.query.query]}
                />
              ))}
            </TrackContainer>
          </div>

          <div className={styles["results__albums"]}>
            <h2>Albums</h2>
            <BoxGridContainer type="album">
              {albums?.map((album) => (
                <AlbumCard
                  title={album.name}
                  imageSources={album.coverArt.sources}
                  key={album.uri.split(":")[2]}
                  id={album.uri.split(":")[2]}
                />
              ))}
            </BoxGridContainer>
          </div>

          <div className={styles["results__artist"]}>
            <h2>Artists</h2>
            <BoxGridContainer type="artist">
              {artists?.map((artist) => (
                <ArtistCard
                  name={artist.profile.name}
                  srcImg={artist.visuals.avatarImage?.sources[0].url}
                  key={artist.uri.split(":")[2]}
                  id={artist.uri.split(":")[2]}
                />
              ))}
            </BoxGridContainer>
          </div>
        </section>
      ) : (
        <section className={styles["search-results-error"]}>
          <p>{tracks}</p>
        </section>
      )}
    </>
  );
};

export default Search;
