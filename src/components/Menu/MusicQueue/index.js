import "./styles.css";
import { GET_SONGS } from "../../../apolloClient/queries";
import { useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { setListOfSongs, setCurrSongIndex } from "../../../state";
import { useEffect, useState } from "react";

//This component will render list of songs when user clicks menu button (only used in mobile )
const MenuMusicQueue = () => {
  const [responseData, setResponseData] = useState(null);
  const selectedPlaylistIndex = useSelector((state) => state.slice.playlist);
  const curInd = useSelector((state) => state.slice.currSongIndex);

  const { data } = useQuery(GET_SONGS, {
    variables: {
      playlistId: selectedPlaylistIndex,
    },
  });
  const dispatch = useDispatch();

  const handlePlayerDate = (index) => {
    dispatch(
      setCurrSongIndex({
        currSongIndex: index,
      })
    );
    dispatch(
      setListOfSongs({
        listOfSongs: responseData,
      })
    );
  };

  useEffect(() => {
    if (data) {
      setResponseData(data.getSongs);
    }
  }, [data]);
  return (
    <div className="playlistt">
      <div className="music-list">
        {responseData &&
          responseData.map((item, index) => {
            return (
              <div
                onClick={() => handlePlayerDate(index)}
                style={{
                  background:
                    index === curInd ? "rgba(255, 255, 255, 0.08)" : "",
                }}
                key={item._id}
                className="music-div"
              >
                <div className="logo-name">
                  <img className="photo" src={item.photo} alt="imageCover" />
                  <div className="music-name">
                    <p className="music-text">{item.title}</p>
                    <p className="artist-name">{item.artist}</p>
                  </div>
                </div>
                <p className="time">
                  {Math.floor(item.duration / 60)}:{item.duration % 60}
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default MenuMusicQueue;
