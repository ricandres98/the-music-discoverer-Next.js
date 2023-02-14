import Image from "next/image";
import previousIcon from 'assets/icons/Previous.svg';
import { useContext } from 'react';
import AppContext from 'context/AppContext';
import { useRouter } from 'next/router';

const PreviousTrackButton = (props) => {
    const { state } = useContext(AppContext);
    const currentTrack = props.track;
    const router = useRouter();

    const handleClick = () => {
        const currentPlaylist = state.shuffle ? state.randomPlaylist : state.playlist;

        if (currentPlaylist.length) {
            const [_, hash] = router.asPath?.split("#");
            const index = currentPlaylist.findIndex(track => track.id === currentTrack.id)
            if (index > 0) {
                const newRoute = hash ? `${currentPlaylist[index - 1].id}#${hash}` : `${currentPlaylist[index + 1].id}`
                router.push(newRoute);
            }
        }
    }

    return (
        <button type="button"  onClick={handleClick}>
            <Image src={previousIcon} alt="Previous" />
          </button>
    );
}

export default PreviousTrackButton;