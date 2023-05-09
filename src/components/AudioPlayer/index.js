import "./styles.css";
import { useSelector } from "react-redux";
import CircularLoader from "../CircularLoader/index";
import Menu from "../Menu";
import Player from "./Player";

const MusicPlayer = () => {
  const data = useSelector((state) => state.slice.listOfSongs);
  const currIndex = useSelector((state) => state.slice.currSongIndex);

  return (
    <div className="player">
      <Menu />
      {data.length != 0 ? (
        <div>
          <p className="music-name bcBoldFont">{data[currIndex].title}</p>
          <p className="artist-name">{data[currIndex].artist}</p>
          <div className="controls">
            <Player />
          </div>
        </div>
      ) : (
        <div className="loader-div">
          <CircularLoader />
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;
