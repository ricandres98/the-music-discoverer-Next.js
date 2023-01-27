import { useState } from "react";
const initialState = {
    track: {
        preview_url: '',
    }, 
    playlist: [],
}

const useInitialState = () => {
    const [state, setState] = useState(initialState);

    const setTrack = (track) => {
        setState({
            ...state,
            track: track
        });    
    }

    const setPlaylist = (list) => {
        setState({
            ...state,
            playlist: list,
        })
    }

    return {
        state,
        setTrack,
        setPlaylist,
    }
}

export default useInitialState;