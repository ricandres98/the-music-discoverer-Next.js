import Image from "next/image";
import loopIcon from 'assets/icons/Loop.svg';
import styles from 'styles/Player.module.scss';
import { useState } from "react";

const LoopButton = (props) => {
    const [ isLoopOn, setIsLoopOn ] = useState(false);

    const handleClick = () => {
        props.audio.loop = !props.audio.loop;
        setIsLoopOn(props.audio.loop);
    }

    return (
        <button type="button" onClick={handleClick} className={isLoopOn ? styles['loop-on'] : ''}>
            <Image src={loopIcon} alt="Repeat" />
          </button>
    );
}

export default LoopButton;