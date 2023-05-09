import { useQuery } from "@apollo/client";
import spotify from "../../assets/images/spotifyLogo.svg";
import "./styles.css";
import { GET_PLAYLISTS } from "../../apolloClient/queries";
import userpic from "../../assets/images/userpic.svg";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setPlaylistIndex, setListOfPlaylists } from "../../state";
import CircularLoader from "../CircularLoader";

const Sidebar = () => {
  const { data } = useQuery(GET_PLAYLISTS);

  const [selectedPlaylist, setSelectedPlaylist] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data != null) {
      dispatch(setListOfPlaylists(data.getPlaylists));
    }
  }, [data, dispatch]);

  function updateSelectedPlaylist(index) {
    setSelectedPlaylist(index);
    dispatch(
      setPlaylistIndex({
        playlist: index + 1,
      })
    );
  }

  return (
    <div className="sidebar">
      <div>
        <img src={spotify} alt="spotifyLogo" />
      </div>
      {data != null ? (
        <div className="nav-items">
          {data.getPlaylists.map((item, index) => (
            <p
              className="nav"
              style={{ opacity: index === selectedPlaylist ? "1" : "0.4" }}
              onClick={() => updateSelectedPlaylist(index)}
              key={item.id}
            >
              {item.title}
            </p>
          ))}
        </div>
      ) : (
        <div className="loader-div">
          <CircularLoader />
        </div>
      )}
      <img className="user-pic" src={userpic} alt="userImage" />
    </div>
  );
};

export default Sidebar;
