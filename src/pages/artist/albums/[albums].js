import Header from "containers/Header";
import useApiInstance from "hooks/useApiInstance";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import BoxGridContainer from "containers/BoxGridContainer";
import AlbumCard from "components/AlbumCard";
import styles from "styles/AlbumsPage.module.scss";

const albumsPage = () => {
  const router = useRouter();
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const id = router.query.albums;
    const api = useApiInstance();

    const getAlbumsFromArtist = async () => {
      try {
        const { data } = await api("artist_albums/", {
          params: {
            id: id,
            limit: 100,
          },
        });
        console.log("data2: ", data);
        console.log(
          data.data.artist.discography.albums.items.map(
            (item) => item.releases.items[0]
          )
        );

        const cleanData = data.data.artist.discography.albums.items.map(
          (item) => item.releases.items[0]
        );
        if (cleanData.length === 0) setAlbums("No data could be found");
        else setAlbums(cleanData);
      } catch (err) {
        setAlbums("No data could be found");
        // throw(new Error(err));
      }
    };

    if (router && router.query.albums) {
      getAlbumsFromArtist();
    }
  });

  return (
    <>
      <Header page="back-button-title" title={`Albums`} />
      <section className={styles["albums-container"]}>
        <BoxGridContainer>
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
      </section>
    </>
  );
};

export default albumsPage;
