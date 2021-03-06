var BotBar = React.createClass({
  mixins: [ReactRouter.History],
  getInitialState: function(){
    return {waveSurfer: SongStore.waveSurfer(), waveSurfSong: SongStore.current()};
  },

  componentDidMount: function(){
    SongStore.addCurrentSongChangeListener(this._onChange);

    if (SongStore.playing()){
        // this.state.waveSurfer.play();
    } else {
      this.state.waveSurfer.init({
          container: document.querySelector('#wave'),
          waveColor: 'deeppink',
          progressColor: 'deepskyblue',
          cursorColor: "orange",
          backend: 'MediaElement',
          cursorWidth: 3,
          barWidth: 3,
          height: 94
      });

      this.state.waveSurfer.on("finish", function(){
        ApiUtil.updatePlayingStatus(false);
        ApiUtil.randomNextSong();
      });
    }
  },

  _onChange:function(){
    currentSong = SongStore.current();
    if(currentSong && this.state.waveSurfSong){
      if ( currentSong.id === this.state.waveSurfSong.id) {
        this.setState({waveSurfSong: currentSong});
        return;
      }
    }
    if ( currentSong !== this.state.waveSurfSong) {
      this.setState({ waveSurfSong: currentSong });
      this.state.waveSurfer.load(currentSong.url);
      this.state.waveSurfer.play();
    }
  },


  _showUser: function(){
    this.history.pushState(null,"users/" + this.state.waveSurfSong.user_id);
  },

  showSong: function(){
    this.history.pushState(null,"songs/" + this.state.waveSurfSong.id);
  },

  _setVolume: function(e){
    this.state.waveSurfer.setVolume(parseFloat(e.target.value)/100);
  },
  _nowPlaying: function(){
    if(this.state.waveSurfSong){
      return(
        <div className="NowPlaying">
          <p>
            Now Playing: <a onClick={this.showSong}>{this.state.waveSurfSong.title}</a>
          <br/>
            By: <a onClick={this._showUser}>{this.state.waveSurfSong.user_name}</a>
          </p>
          <LikeUnlike likeCount={this.state.waveSurfSong.likeCount}
            song={this.state.waveSurfSong}
            liked={this.state.waveSurfSong.current_user_likes}/>
        </div>
      );
      } else {
        return <div/>;
      }
    },
  _songLoad: function(){
    if (this.state.waveSurfSong){
      return <PlayPause song={this.state.waveSurfSong}/>;
    }
  },
  goResume:function(){
    window.location.replace("https://www.linkedin.com/");
  },
  goPortfolio:function(){
    window.location.replace("https://www.alvinly.com/");
  },
  render: function(){
    return(
      <footer className="BotBar" key="BotBar">
        <div className="AudioPlayer">
          <div id="wave"/>
          <div id="controls">
            <p>Vol:</p>
            <input id="volume" onChange={this._setVolume} type="range" name="volume" min="0" max="100" defaultValue="50"/>
            {this._songLoad()}
          </div>
        </div>
        <div className="BotBarRight">
          {this._nowPlaying()}
          <p className="SocialMedia">
            <a onClick={this.goResume}>LinkedIn</a>  <a onClick={this.goPortfolio}>Portfolio</a>
          </p>
        </div>
      </footer>
    );
  }
});
