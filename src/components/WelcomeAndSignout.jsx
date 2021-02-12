import React from "react";
import { Link, navigate } from "@reach/router";

function WelcomeAndSignout(props) {
  return (
    <div className="welcomeandsignout">
      <p className="welcomeandsignout__greeting">Welcome {props.username}</p>

      <p
        className="welcomeandsignout__signout"
        onClick={() => {
          props.emptyUserConfig();
          localStorage.removeItem("userConfig");
          localStorage.removeItem("body");
        }}
      >
        Sign out
      </p>
    </div>
  );
}

export default WelcomeAndSignout;
