ApiActions = {
  receiveAllSongs: function(songs){
    AppDispatcher.dispatch({
      actionType: SongConstants.ALL_SONGS_RECEIVED,
      songs: songs
    });
  },
  addSongsToStore: function(songs){
    AppDispatcher.dispatch({
      actionType:SongConstants.ADD_SONGS_TO_STORE,
      songs:songs
    });
  },
  updateSong: function(song){
    AppDispatcher.dispatch({
      actionType:SongConstants.SONG_UPDATE,
      song: song,
    });
  },
  updateSearch: function(songIds){
    AppDispatcher.dispatch({
      actionType: SongConstants.SEARCHING_SONGS,
      songIds:songIds
    });
  },
  addRandomUser: function(user){
    AppDispatcher.dispatch({
      actionType: UserConstants.RANDOM_USER,
      user: user
    });
  },
  removeRandomUser: function(){
    AppDispatcher.dispatch({
      actionType: UserConstants.REMOVE_RANDOM_USER,
    });
  },
  addUsersToStore: function(users){
    AppDispatcher.dispatch({
      actionType: UserConstants.USERS_RECEIVED,
      users: users
    });
  },
  updatePlayingStatus: function(status){
    AppDispatcher.dispatch({
      actionType: SongConstants.SONG_STATUS_CHANGE,
      status:status
    });
  },
  randomNextSong: function(){
    AppDispatcher.dispatch({
      actionType:SongConstants.NEXT_SONG_PLAY
    });
  },
  updateCurrentSong: function(song){
    AppDispatcher.dispatch({
      actionType: SongConstants.CURRENT_SONG_CHANGE,
      song: song
    });
  },
  updateUserFollow: function(user){
    AppDispatcher.dispatch({
      actionType: UserConstants.UPDATE_USER_FOLLOW,
      user: user
    });
  }
};
