import corchea from 'assets/icons/corchea.svg';
import { useState } from "react";
const initialState = {
  track: {},
  playlist: [],
  randomPlaylist: [],
  shuffle: false,
};

const useInitialState = () => {
  const [state, setState] = useState(initialState);

  const setTrack = (newTrack) => {
    setState({
        track: newTrack,
        ...state,
    });
  };

  const setPlaylist = (list) => {
    setState({
      ...state,
      playlist: list,
    });
  };

  const setShuffle = (boolean) => {
    setState({
      ...state,
      shuffle: boolean,
    });
  }

  return {
    state,
    setState,
    setTrack,
    setPlaylist,
    setShuffle,
  };
};

export default useInitialState;
