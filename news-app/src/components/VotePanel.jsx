import React from "react";
import { navigate } from "@reach/router";

function VotePanel(props) {
  const handleClick = (event) => {
    if (!props.authorization) navigate("/login");
    else {
      if (event.target.value === "upvote") {
        props.changeVote(true);
      } else {
        props.changeVote(false);
      }
    }
  };
  return (
    <div className={`${props.blockName}__votepanelblock`}>
      <div className={`${props.blockName}__votepanelblock--bordermodifier`}>
        <button
          value="upvote"
          onClick={handleClick}
          className={`${props.blockName}__votepanelblock__upvote`}
        >
          ⬆
        </button>
        <span className={`${props.blockName}__votepanelblock__votes`}>
          {props.votes}
        </span>
        <button
          value="downvote"
          onClick={handleClick}
          className={`${props.blockName}__votepanelblock__downvote`}
        >
          ⬇
        </button>
      </div>
      {props.errMsg ? (
        <p className={`${props.blockName}__err`}>{props.errMsg}</p>
      ) : null}
    </div>
  );
}

export default VotePanel;
