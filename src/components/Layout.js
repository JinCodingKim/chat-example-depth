import React, { Component } from "react";
import io from "socket.io-client";
import { USER_CONNECTED, LOGOUT } from "../Events";
import LoginForm from "./LoginForm";

const socketUrl = "http://localhost:3231";

class Layout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      socket: null,
      user: null
    };

    this.setUser = this.setUser.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    this.initSocket();
  }

  // Initialize socket for us... arrow function, so we don't have to worry about the context of this component
  initSocket = () => {
    const socket = io(socketUrl);
    socket.on("connect", () => {
      console.log("Connected");
    });
    this.setState({
      socket
    });
  };

  setUser(user) {
    const { socket } = this.state;
    socket.emit(USER_CONNECTED, user);
    this.setState({
      user
    });
  }

  logout() {
    const { socket } = this.state;
    socket.emit(LOGOUT);
    this.setState({
      user: null
    });
  }

  render() {
    const { title } = this.props;
    const { socket } = this.state;
    return (
      <div className="container">
        <LoginForm socket={socket} setUser={this.setUser} />
      </div>
    );
  }
}

export default Layout;
