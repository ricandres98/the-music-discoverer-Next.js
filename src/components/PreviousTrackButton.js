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
        if (state.playlist.length) {
            const [_, hash] = router.asPath?.split("#");
            const index = state.playlist.findIndex(track => track.id === currentTrack.id)
            if (index > 0) {
                const newRoute = hash ? `${state.playlist[index - 1].id}#${hash}` : `${state.playlist[index + 1].id}`
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