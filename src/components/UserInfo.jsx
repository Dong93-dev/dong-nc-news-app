import React, { Component } from "react";
import Loader from "./Loader";
import ErrorDisplayer from "./ErrorDisplayer";
import { fetchUser } from "../api";

class UserInfo extends Component {
  state = { username: "", avatar_url: "", isLoading: true, errMsg: "" };
  componentDidMount() {
    console.log(this.props.authorization);
    fetchUser(this.props.userId, this.props.authorization)
      .then(({ user: { username, avatar_url } }) =>
        this.setState({ username, avatar_url, isLoading: false })
      )
      .catch((err) => {
        console.dir(err);
        this.setState({ errMsg: err.response.data.msg, isLoading: false });
      });
  }

  render() {
    if (this.state.isLoading) return <Loader />;
    if (!this.props.authorization) return <ErrorDisplayer msg="please login" />;
    if (this.state.errMsg) return <ErrorDisplayer msg={this.state.errMsg} />;

    return (
      <div className="userinfo">
        <ul className="userinfo__ul">
          <li className="userinfo__ul__avatar">
            <img
              src={this.state.avatar_url}
              alt="placeholder"
              width="100"
              height="100"
            />
          </li>
          <li>username: {this.state.username}</li>
        </ul>
      </div>
    );
  }
}

export default UserInfo;
