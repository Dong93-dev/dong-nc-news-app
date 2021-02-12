import React from "react";

function ErrorDisplayer({ msg }) {
  return <h1 className="requesterror">{msg ? msg : "whoops! wrong path"}</h1>;
}

export default ErrorDisplayer;
