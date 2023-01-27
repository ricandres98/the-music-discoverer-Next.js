import Image from "next/image";
import previousIcon from 'assets/icons/Previous.svg';

const PreviousTrackButton = () => {
    return (
        <button type="button">
            <Image src={previousIcon} alt="Previous" />
          </button>
    );
}

export default PreviousTrackButton;