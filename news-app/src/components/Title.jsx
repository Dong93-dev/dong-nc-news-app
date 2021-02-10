import { Link } from "@reach/router";
import React from "react";
import RegisterAndLoginPanel from "./RegisterAndLoginPanel";
import WelcomeAndSignout from "./WelcomeAndSignout";

function Title(props) {
  return (
    <div className="title">
      <Link to="/" className="title__head1__link">
        <h1 className="title__head1">NC News</h1>
      </Link>
      {props.authorization ? (
        <WelcomeAndSignout
          username={props.username}
          emptyUserConfig={props.emptyUserConfig}
        />
      ) : (
        <RegisterAndLoginPanel />
      )}
    </div>
  );
}

export default Title;
