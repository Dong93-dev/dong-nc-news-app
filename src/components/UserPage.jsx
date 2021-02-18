import React, { Component } from "react";
import Loader from "./Loader";
import UserInfo from "./UserInfo";

function UserPage(props) {
  return (
    <div className="userpage">
      <UserInfo
        userId={props.userid}
        authorization={props.authorization}
        username={props.username}
      />
    </div>
  );
}

export default UserPage;
