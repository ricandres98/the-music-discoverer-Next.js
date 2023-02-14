import Image from "next/image";
import shuffleIcon from 'assets/icons/Shuffle.svg';
import { useContext, useEffect, useState } from "react";
import styles from 'styles/Player.module.scss';
import AppContext from "context/AppContext";


const ShuffleButton = () => {
  const { state, setShuffle, setState } = useContext(AppContext);

  const handleClick = () => {
    setShuffle(!state.shuffle);
  }
  
  useEffect(() => {
    console.log(state.shuffle);

    if (state.shuffle) {
      const list = [ ...state.playlist ];
      list.sort(() => Math.random() - 0.5);
      setState({
        ...state,
        randomPlaylist: list,
      });
      console.log(list);
      console.log(state)
    }
    
  },[state.shuffle])

  return (
    <button type="button" onClick={handleClick} className={state.shuffle ? styles['loop-on'] : ''}>
      <Image src={shuffleIcon} alt="Shuffle" />
    </button>
  );
};

export default ShuffleButton;
