import React from "react";

function ErrorDisplayer({ msg }) {
  return <h1>{msg ? msg : "whoops! wrong path"}</h1>;
}

export default ErrorDisplayer;
