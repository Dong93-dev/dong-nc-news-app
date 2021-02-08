import React from "react";

function TopicCard(props) {
  console.log(props.path);
  return (
    <li className="topiclist__ul__topiccard">
      <h1 className="opiclist__ul__topiccard_h1">{props.slug}</h1>
      {props.path === "/" ? (
        <p className="opiclist__ul__topiccard_p">{props.description}</p>
      ) : null}
    </li>
  );
}

export default TopicCard;
