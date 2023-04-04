import { useState } from "react";
const initialState = {
  track: {},
  playlist: [],
  randomPlaylist: [],
  shuffle: false,
};

const useInitialState = () => {
  const [state, setState] = useState(initialState);
  const [shuffle, setShuffle] = useState(false);

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

  // const setShuffle = (boolean) => {
  //   setState({
  //     ...state,
  //     shuffle: boolean,
  //   });
  // };

  return {
    state,
    setState,
    setTrack,
    setPlaylist,
    setShuffle,
    shuffle,
  };
};

export default useInitialState;
