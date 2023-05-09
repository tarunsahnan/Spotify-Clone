import "./styles.css";
import searchIcon from "../../assets/images/searchIcon.svg";
import { GET_SONGS } from "../../apolloClient/queries";
import { useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { setListOfSongs, setCurrSongIndex } from "../../state";
import { useEffect, useState } from "react";
import CircularIndeterminate from "../CircularLoader";

const Playlist = () => {
  const [responseData, setResponseData] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedSong, setSelectedSong] = useState(1);
  const selectedPlaylistIndex = useSelector((state) => state.slice.playlist);
  const playListData = useSelector((state) => state.slice.listOfPlaylists);

  const curInd = useSelector((state) => state.slice.currSongIndex);
  const listDataInPlayer = useSelector((state) => state.slice.listOfSongs);

  const { loading, error, data } = useQuery(GET_SONGS, {
    variables: {
      playlistId: selectedPlaylistIndex,
      search: search,
    },
  });
  const dispatch = useDispatch();

  const handlePlayerDate = (index) => {
    setSelectedSong(index + 1);
    dispatch(
      setCurrSongIndex({
        currSongIndex: index,
      })
    );
    if (listDataInPlayer != responseData) {
      //to prevent unnecessary updating data in case of same list
      dispatch(
        setListOfSongs({
          listOfSongs: responseData,
        })
      );
    }
  };

  useEffect(() => {
    if (data) {
      setResponseData(data.getSongs);
      if (listDataInPlayer.length == 0) {
        //first time add data in player to show first song played
        dispatch(
          setListOfSongs({
            listOfSongs: data.getSongs,
          })
        );
      }
    }
  }, [data, search]);

  return (
    <div className="playlist">
      <div className="tab-name bcBoldFont">
        <p>{playListData[selectedPlaylistIndex - 1]?.title}</p>
      </div>
      <div className="search-box">
        <input
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Song, Artist"
        ></input>
        <img
          height={19.33}
          width={19.33}
          style={{ opacity: "0.1" }}
          src={searchIcon}
          alt="search icon"
        />
      </div>
      <div className="music-list">
        {responseData ? (
          responseData.map((item, index) => {
            return (
              <div
                onClick={() => handlePlayerDate(index)}
                style={{
                  background:
                    item === listDataInPlayer[curInd]
                      ? "rgba(255, 255, 255, 0.08)"
                      : "",
                }}
                key={item._id}
                className="music-div"
              >
                <div className="logo-name">
                  <img className="photo" src={item.photo} />
                  <div className="music-bar">
                    <div className="music-name">
                      <p className="music-text">{item.title}</p>
                      <p className="artist-name">{item.artist}</p>
                    </div>

                    <div>
                      <p className="time">
                        {Math.floor(item.duration / 60)}:
                        {item.duration % 60 < 10
                          ? "0" + (item.duration % 60)
                          : item.duration % 60}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="loader-div">
            <CircularIndeterminate />
          </div>
        )}
      </div>
    </div>
  );
};

export default Playlist;
