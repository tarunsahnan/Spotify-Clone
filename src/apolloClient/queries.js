import { gql } from "@apollo/client";

//query for fetching playlists
export const GET_PLAYLISTS = gql`
  query {
    getPlaylists {
      id
      title
    }
  }
`;

//query for fetching songs
//it requires Playlist id as Required Param and Search as optional
export const GET_SONGS = gql`
  query ($playlistId: Int!, $search: String) {
    getSongs(playlistId: $playlistId, search: $search) {
      _id
      artist
      duration
      photo
      title
      url
    }
  }
`;
