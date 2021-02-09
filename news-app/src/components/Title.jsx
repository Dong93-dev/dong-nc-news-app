import { Link } from "@reach/router";
import React from "react";

function Title(props) {
  return (
    <div className="title">
      <Link to="/">
        <h1 className="title__head1">NC News</h1>
      </Link>
    </div>
  );
}

export default Title;
