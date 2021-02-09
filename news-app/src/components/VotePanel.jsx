import React from "react";

function VotePanel(props) {
  const handleClick = (event) => {
    if (event.target.value === "upvote") {
      props.changeVote(true);
    } else {
      props.changeVote(false);
    }
  };
  return (
    <div className={`${props.blockName}__votepanelblock`}>
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
  );
}

export default VotePanel;
