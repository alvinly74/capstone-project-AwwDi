ApiUtil = {
  fetchAllSongs: function(){
    $.ajax({
      url:"/api/songs",
      method:"get",
      success: function(songs){
        ApiActions.receiveAllSongs(songs);
      }
    });
  },

  updateSongLike:function(song, likeUnlike){
    var status;
    if (likeUnlike ===1){
      status = 'post';
    } else {
      status = 'delete';
    }
    $.ajax({
      url:"/api/songs/" + song.id + "/like",
      method: status,
      success: function(response){
          ApiActions.updateSong(response);
        }
    });
  },
  updateUserFollow: function(followToId, followUnfollow){
    var status;
    if (followUnfollow ===1){
      status = 'post';
    } else {
      status = 'delete';
    }
    $.ajax({
      url:"/api/users/" + followToId +"/follow",
      method: status,
      success: function(response){
        ApiActions.updateUserFollow(response);
      }
    });
  },

  fetchRandomUser: function(){
    $.ajax({
      url:"/api/users/rand",
      method:"get",
      success: function(response){
        ApiActions.addSongsToStore(response.uploaded_songs);
        ApiActions.addRandomUser(response);
      }
    });
  },
  fetchUser: function(userId){
    $.ajax({
      url:"/api/users/" + userId,
      method:"get",
      success: function(user){
        ApiActions.addSongsToStore(user.uploaded_songs);
        ApiActions.addUsersToStore([user]);
      }
    });
  },
  fetchFollowingUsers: function(){
    $.ajax({
      url: "/api/users/following",
      method: "get",
      success: function(users){
        var totalSongs = [];
          ApiActions.addUsersToStore(users);
        users.forEach(function(user){
          user.uploaded_songs.forEach(function(song){
            totalSongs.push(song);
          });
        });
          ApiActions.addSongsToStore(totalSongs);
      }
    });
  },

  updatePlayingStatus: function(status){
    ApiActions.updatePlayingStatus(status);
  },
  updateCurrentSong: function(song){
    ApiActions.updateCurrentSong(song);
  },
  changeWindowSongId: function(songId){
    $.ajax({
      url: "api/songs/"+ songId,
      method: 'get',
      data:{id:songId},
      success: function(song){
        ApiActions.addSongsToStore([song]);
        ApiActions.changeWindowSongId(song.id);
      }
    });
  },

  LogOut: function(){
    $.ajax({
      url:"/session",
      method:'delete',
      success: function(){}
    });
  },
  guestLog: function(){
    $.ajax({
      url: "/api/users/guest",
      method: "get",
      success: function(){
        window.location = "/";
      }
    });
  },
};
