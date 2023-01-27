import Image from 'next/image';
import nextIcon from 'assets/icons/Next.svg';

const NextTrackButton = () => {
    return (
        <button type="button">
            <Image src={nextIcon} alt="Next" />
          </button>
    );
}

export default NextTrackButton;