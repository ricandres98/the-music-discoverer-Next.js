import Image from "next/image";
import shuffleIcon from 'assets/icons/Shuffle.svg';


const ShuffleButton = () => {
  return (
    <button type="button">
      <Image src={shuffleIcon} alt="Shuffle" />
    </button>
  );
};

export default ShuffleButton;
