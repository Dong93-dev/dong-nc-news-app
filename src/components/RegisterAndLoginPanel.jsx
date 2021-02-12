import React from "react";
import { Link } from "@reach/router";

function RegisterAndLoginPanel(props) {
  return (
    <div className="RegisterAndLoginPanel">
      <Link to="/login">
        <p className="RegisterAndLoginPanel__loginlink">Login</p>
      </Link>
      <Link to="/newuser">
        <p className="RegisterAndLoginPanel__registerlink">Register</p>
      </Link>
    </div>
  );
}

export default RegisterAndLoginPanel;
