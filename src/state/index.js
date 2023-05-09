import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  playlist: 1,
  listOfPlaylists: [],
  listOfSongs: [],
  currSongIndex: 0,
  backgroundColor: {
    r: 32,
    g: 22,
    b: 6,
  },
};

export const slice = createSlice({
  name: "slice",
  initialState,
  reducers: {
    setPlaylistIndex: (state, action) => {
      state.playlist = action.payload.playlist;
    },
    setListOfPlaylists: (state, action) => {
      state.listOfPlaylists = action.payload;
    },
    setListOfSongs: (state, action) => {
      state.listOfSongs = action.payload.listOfSongs;
    },
    setCurrSongIndex: (state, action) => {
      state.currSongIndex = action.payload.currSongIndex;
    },
    setBackgroundColor: (state, action) => {
      state.backgroundColor = action.payload;
    },
  },
});

export const store = configureStore({
  reducer: {
    slice: slice.reducer,
  },
});

export const {
  setPlaylistIndex,
  setListOfPlaylists,
  setListOfSongs,
  setCurrSongIndex,

  setBackgroundColor,
} = slice.actions;

export default slice.reducer;
