(function(root) {
  'use strict';

  var signUp = function(){
    window.location = "/users/new";
    };
  var signIn = function(){
    window.location = "session/new";
  };
  var logOut = function(){
    ApiUtil.LogOut();
    window.location = "session/new";
  };
  var guestLog = function(){
    ApiUtil.guestLog();
  };

  var LogOutOrIn;
  var SignInOrOut;
  var status;
  var logOutButtons = (
    <ul className="NavBarRight">
      <li onClick={logOut}>Log Out</li>
    </ul>
  );
  var SignInOrUpButtons = (
    <ul className="NavBarRight">
      <li onClick={guestLog}>Log In as Guest</li>
      <li onClick={signUp}>Sign Up</li>
      <li onClick={signIn}> Log In</li>
    </ul>
  );

  root.NavBar = React.createClass({
    mixins: [ReactRouter.History],
    getInitialState: function(){
      return({ LogOutOrIn: status});
    },
    determineLogin: function () {
      if(window.CURRENT_USER_ID){
        status = logOutButtons;
      } else {
        status = SignInOrUpButtons;
      }
    },

    componentDidMount: function(){
      this.determineLogin();
      this.setState({ logOutOrIn: status});
    },
    userShow: function(){
      this.history.pushState(null,"users/" + window.CURRENT_USER_ID);
    },
    goHome: function(){
      if (window.location.hash[2] === "?"){
        ApiUtil.fetchRandomUser();
        return;
      } else {
      this.history.pushState(null,"/");
      }
    },
    goFollowing: function(){
      this.history.pushState(null,"/following");
    },
    goLiking: function(){
      this.history.pushState(null,"/liking");
    },
    _showDiscover: function(){
      if (window.CURRENT_USERNAME){
        return <li onClick={this.goHome}>Discover a Fellow User</li>;
      } else {
        return <li onClick={this.goHome}>Discover a User</li>;
      }
    },
    _showUsername: function(){
      if (window.CURRENT_USERNAME){
        return <li onClick={this.userShow}>{window.CURRENT_USERNAME}</li>;
      }
    },
    _showFollowing: function(){
      if (window.CURRENT_USERNAME){
        return <li onClick={this.goFollowing}>Manage Following</li>;
      }
    },
    _showLiking: function(){
      if (window.CURRENT_USERNAME){
        return <li onClick={this.goLiking}>Manage Likes</li>;
      }
    },
    render: function(){
      return(
        <nav className="NavBar group">
          <ul className="NavBarLeft Left">
            <li onClick={this.goHome}>AwWDI</li>
            {this._showDiscover()}
            {this._showUsername()}
            {this._showFollowing()}
            {this._showLiking()}
            <li id="Search"><SearchBar/></li>
        </ul>
            {this.state.logOutOrIn}
        </nav>
      );
    }
  });
}(this));
