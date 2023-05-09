import { useEffect, useRef, useState } from "react";

import "../../../styles/customize-progress-bar.css";
import DisplayTrack from "../DisplayTrack";
import Controls from "../Controls";
import ProgressBar from "../ProgressBar";
import { useDispatch, useSelector } from "react-redux";
import { setCurrSongIndex } from "../../../state";

const AudioPlayer = () => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const tracks = useSelector((state) => state.slice.listOfSongs);
  const curInd = useSelector((state) => state.slice.currSongIndex);
  const [trackIndex, setTrackIndex] = useState(0);

  const audioRef = useRef();
  const progressBarRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    setCurrentTrack(tracks[curInd]);
    setTrackIndex(curInd);
  }, [useSelector((state) => state.slice.listOfSongs)]);

  useEffect(() => {
    setCurrentTrack(tracks[curInd]);
    setTrackIndex(curInd);
    if (audioRef.current != null && progressBarRef.current != null) {
      audioRef.current.currentTime = 0;
      progressBarRef.current.value = 0;
    }
  }, [curInd]);

  const handleNext = (autoplay = false) => {
    if (trackIndex >= tracks.length - 1) {
      setTrackIndex(0);
      setCurrentTrack(tracks[0]);
      dispatch(
        setCurrSongIndex({
          currSongIndex: 0,
        })
      );
    } else {
      setTrackIndex((prev) => prev + 1);
      dispatch(
        setCurrSongIndex({
          currSongIndex: trackIndex + 1,
        })
      );
      setCurrentTrack(tracks[trackIndex + 1]);
    }
    if (audioRef.current.paused && autoplay == true) {
      /* when audioplayer ends the previous audio by completing its duration, it will reach its paused state,
         so in this case we need to force audio player to play the audio */
      audioRef.current.play();
    }
  };

  return (
    <>
      <div className="audio-player">
        <div className="inner">
          {currentTrack && (
            <>
              <DisplayTrack
                {...{
                  currentTrack,
                  audioRef,
                  setDuration,
                  progressBarRef,
                  handleNext,
                }}
              />
              <ProgressBar
                {...{ progressBarRef, audioRef, timeProgress, duration }}
              />
              <Controls
                {...{
                  audioRef,
                  progressBarRef,
                  duration,
                  setTimeProgress,
                  tracks,
                  trackIndex,
                  setTrackIndex,
                  setCurrentTrack,
                  handleNext,
                }}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default AudioPlayer;
