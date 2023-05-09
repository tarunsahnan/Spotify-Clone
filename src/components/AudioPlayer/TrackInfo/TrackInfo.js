import { BsMusicNoteBeamed } from "react-icons/bs";
// import "../../styles/customize-progress-bar.css";
import { useEffect, useState } from "react";
import { useRef } from "react";
import ColorThief from "colorthief";
import { useDispatch, useSelector } from "react-redux";
import { setBackgroundColor } from "../../../state";

const TrackInfo = ({
  currentTrack,
  audioRef,
  setDuration,
  progressBarRef,
  handleNext,
}) => {
  const [url, setUrl] = useState(null);
  useEffect(() => {
    onLoadedMetadata();
    setUrl(currentTrack.url);
  }, [currentTrack]);
  const onLoadedMetadata = () => {
    const seconds = audioRef.current.duration;
    setDuration(seconds);
    progressBarRef.current.max = seconds;
  };
  const imgRef = useRef();
  const backgroundColor = useSelector((state) => state.slice.backgroundColor);
  const dispatch = useDispatch();

  const bgColorApp = () => {
    const colorThief = new ColorThief();
    const img = imgRef.current;
    const result = colorThief.getColor(img, 25);
    dispatch(
      setBackgroundColor({
        r: result[0],
        g: result[1],
        b: result[2],
      })
    );
  };

  return (
    <div style={{ width: "100%" }}>
      {currentTrack.url && (
        <audio
          src={currentTrack.url}
          ref={audioRef}
          onLoadedMetadata={onLoadedMetadata}
          onEnded={() => handleNext(true)}
        />
      )}
      <div className="audio-info">
        <div className="audio-image">
          {currentTrack && currentTrack.photo ? (
            <img
              style={{
                height: "400px",
                width: "400px",
                borderRadius: "8px",
                maxWidth: "100%",
              }}
              src={currentTrack.photo}
              alt="audio avatar"
            />
          ) : (
            <div className="icon-wrapper">
              <span className="audio-icon">
                <BsMusicNoteBeamed />
              </span>
            </div>
          )}
        </div>
      </div>

      <img
        crossOrigin={"anonymous"}
        ref={imgRef}
        src={"https://corsproxy.io/?" + encodeURIComponent(currentTrack.photo)}
        alt={"example"}
        style={{
          display: "none",
        }}
        className={"example__img"}
        onLoad={bgColorApp}
      />
    </div>
  );
};
export default TrackInfo;
