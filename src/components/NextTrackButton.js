import Image from "next/image";
import nextIcon from "assets/icons/Next.svg";
import { useContext } from "react";
import AppContext from "context/AppContext";
import { useRouter } from "next/router";

const NextTrackButton = (props) => {
  const { state } = useContext(AppContext);
  const currentTrack = props.track;
  const router = useRouter();

  const handleClick = () => {
    // props.setSuperPlaying(false);
    const currentPlaylist = state.shuffle
      ? state.randomPlaylist
      : state.playlist;
    if (currentPlaylist) {
      const [, hash] = router.asPath
        ? router.asPath.split("#")
        : [undefined, undefined];
      const index = currentPlaylist.findIndex(
        (track) => track.id === currentTrack.id
      );
      let newRoute = "";
      if (index + 1 < currentPlaylist.length) {
        newRoute = hash
          ? `${currentPlaylist[index + 1].id}#${hash}`
          : `${state.playlist[index + 1].id}`;
      } else {
        newRoute = hash
          ? `${currentPlaylist[0].id}#${hash}`
          : `${state.playlist[0].id}`;
      }
      router.push(newRoute);
    }
  };

  return (
    <button type="button" onClick={handleClick}>
      <Image src={nextIcon} alt="Next" />
    </button>
  );
};

export default NextTrackButton;
