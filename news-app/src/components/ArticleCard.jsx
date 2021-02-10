import React from "react";
import { Link } from "@reach/router";

function ArticleCard(props) {
  return (
    <div className="articlecard">
      <h1 className="articlecard__h1">
        <Link
          to={`/article/${props.article.article_id}`}
          className="articlecard__h1__link"
        >
          {props.article.title}
        </Link>
      </h1>
      <p className="articlecard__author">Author: {props.article.author}</p>
      <p className="articlecard__createdat">
        Created at: {props.article.created_at}
      </p>
      <p className="articlecard__votes">Votes {props.article.votes}</p>
    </div>
  );
}

export default ArticleCard;
