import "./App.css";
import MusicQueue from "./components/MusicQueue";
import MusicPlayer from "./components/AudioPlayer";
import { useDispatch, useSelector } from "react-redux";
import Playlist from "./components/Playlist";

const App = () => {
  const backgroundColor = useSelector((state) => state.slice.backgroundColor);

  return (
    <div
      className="App bcRegularFont"
      style={{
        backgroundImage: `linear-gradient(to right,rgba(${
          backgroundColor.r / 4
        }, ${backgroundColor.g / 4}, ${
          backgroundColor.b * (1 / 4)
        }, 1),rgba(0, 0, 0, 1))`,
      }}
    >
      <Playlist />
      <MusicQueue />
      <MusicPlayer />
    </div>
  );
};

export default App;
