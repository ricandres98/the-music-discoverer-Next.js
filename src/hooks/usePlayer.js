class Player {
  constructor({ currentTrack = {}, playlist = [], audioElement }) {
    this._currentTrack = currentTrack;
    this.playlist = playlist;
    this.audioElement = audioElement;
    this.playingIndex = 1;
  }

  async setPlaylist() {
    const { params } = readURL();

    if (Object.keys(params)[0] === "album") {
      const { data } = await api("albums/", {
        params: {
          ids: params.album,
        },
      });

      const tracks = data.albums[0].tracks.items;
      console.log(tracks);
      this.playlist = tracks;
    } else if (Object.keys(params)[0] === "search") {
      const { data } = await api("search/", {
        params: {
          type: "tracks",
          q: decodeURI(params.search),
          limit: 10,
        },
      });

      const tracks = data.tracks.items;
      this.playlist = [];
      tracks.forEach((track) => this.playlist.push(track.data));
      console.log(tracks);
    }

    this.playingIndex = this.playlist.indexOf(
      this.playlist.find((item) => item.id === this._currentTrack.id)
    );
  }

  set currentTrack(track) {
    this._currentTrack = track;
    this.audioElement.setAttribute("src", track.preview_url);

    if (Object.keys(readURL().params).length) {
      this.setPlaylist();
    }
  }

  nextTrack() {
    if (this.playingIndex < this.playlist.length) {
      const { params } = readURL();
      this.playingIndex += 1;

      let paramsString = "";
      const paramsArray = Object.entries(params).map(
        (param) => `${param[0]}=${param[1]}`
      );
      paramsString = paramsArray.reduce((prev, current) => {
        return prev.concat("&", current);
      });

      const id = this.playlist[this.playingIndex].id;
      location.hash = `#player=${id}?${paramsString}`;
    }
  }

  previousTrack() {
    if (this.playingIndex > 0) {
      const { params } = readURL();
      this.playingIndex -= 1;

      let paramsString = "";
      const paramsArray = Object.entries(params).map(
        (param) => `${param[0]}=${param[1]}`
      );
      paramsString = paramsArray.reduce((prev, current) => {
        return prev.concat("&", current);
      });

      const id = this.playlist[this.playingIndex].id;
      location.hash = `#player=${id}?${paramsString}`;
    }
  }

  playPause() {
    if (this.audioElement.paused) {
      this.audioElement.play();
      playPauseIcon.src = "./assets/pause.svg";
      playPauseButtonPlayer.classList.add("pause");
      progressBar();
    } else {
      this.audioElement.pause();
      playPauseIcon.src = "./assets/Play.svg";
      playPauseButtonPlayer.classList.remove("pause");
      progressBar();
    }
  }

  toggleLoop(button) {
    this.audioElement.loop = !this.audioElement.loop;

    this.audioElement.loop
      ? button.classList.add("loop-on")
      : button.classList.remove("loop-on");
  }
}

const usePlayer = () => {
  return Player;
};

export default usePlayer;
