//this component is seekbar which is present below music player
const Seekbar = ({ progressBarRef, audioRef }) => {
  const handleProgressChange = () => {
    audioRef.current.currentTime = progressBarRef.current.value;
  };

  return (
    <div className="progress">
      <input
        style={{ width: "100%", height: "6px", borderRadius: "16px" }}
        type="range"
        ref={progressBarRef}
        defaultValue="0"
        onChange={handleProgressChange}
      />
    </div>
  );
};

export default Seekbar;
