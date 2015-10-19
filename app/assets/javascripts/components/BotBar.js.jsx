var BotBar = React.createClass({
  getInitialState: function(){
    return {waveSurfer: SongStore.waveSurfer(), waveSurfSong: SongStore.current()};
  },

  componentDidMount: function(){
    SongStore.addCurrentSongChangeListener(this._onChange);
    this.state.waveSurfer.init({
        container: document.querySelector('#wave'),
        waveColor: 'deeppink',
        progressColor: 'deepskyblue',
        cursorColor: "darkviolet",
        backend: 'MediaElement',
        cursorWidth: 1,
        barWidth: 3
    });
    this.state.waveSurfer.load("");
  },

  _onChange:function(){
    currentSong = SongStore.current();
    if ( currentSong !== this.state.waveSurfSong) {
      this.setState({ waveSurfSong: currentSong });
      this.state.waveSurfer.load(currentSong.url);
      this.state.waveSurfer.play();
    }
  },
  _play:function(){
    ApiUtil.updatePlayingStatus(true);
    this.state.waveSurfer.play();
  },
  _pause:function(){
    ApiUtil.updatePlayingStatus(false);
    this.state.waveSurfer.pause();
  },

  componentDidUpdate: function () {
    if(SongStore.playing() === true){
      this.state.waveSurfer.play();
    }
  },
  _setVolume: function(e){
    this.state.waveSurfer.setVolume(parseFloat(e.target.value)/100);
  },
  _nowPlaying: function(){
    if(this.state.waveSurfSong.user){
      return(
        <div className="NowPlaying">
          Now Playing:<a>{this.state.waveSurfSong.title}</a>
        <br/>
          By:<a>{this.state.waveSurfSong.user.username}</a>
        </div>
      );
      } else {
        return <div/>;
      }
    },
  render: function(){
    return(
      <div className="BotBar">
        <div className="AudioPlayer">
          <button onClick={this._play}>play</button>
          <button onClick={this._pause}>pause</button>
          <input id="volume" onChange={this._setVolume} type="range" name="volume" min="0" max="100" defaultValue="100"/>
          <div id="wave"/>
        </div>
        <div className="BotBarRight">
          <div className="SocialMedia">
            FB and resume icons and junk go here
          </div>
          {this._nowPlaying()}
        </div>
      </div>
    );
  }
});
