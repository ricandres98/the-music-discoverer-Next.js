import Image from "next/image";
import loopIcon from 'assets/icons/Loop.svg';

const LoopButton = () => {
    return (
        <button type="button">
            <Image src={loopIcon} alt="Repeat" />
          </button>
    );
}

export default LoopButton;