import React from "react";
import { Link } from "@reach/router";
function TopicCard(props) {
  return (
    <Link
      className={
        props.path === "/"
          ? "topicpage__ul__topiccard_link"
          : "topiclist__ul__topiccard_link"
      }
      to={`/topics/articles/${props.slug}`}
    >
      <li
        className={
          props.path === "/"
            ? "topicpage__ul__topiccard"
            : "topiclist__ul__topiccard"
        }
      >
        <h1
          className={
            props.path === "/"
              ? "topicpage__ul__topiccard_h1"
              : "opiclist__ul__topiccard_h1"
          }
        >
          {props.slug}
        </h1>
        {props.path === "/" ? (
          <p className="opiclist__ul__topiccard_p">{props.description}</p>
        ) : null}
      </li>
    </Link>
  );
}

export default TopicCard;
