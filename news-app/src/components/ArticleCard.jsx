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
      <p className="articlecard__author">{props.article.author}</p>
      <p className="articlecard__createdat">{props.article.created_at}</p>
      <p className="articlecard__votes">{props.article.votes}</p>
    </div>
  );
}

export default ArticleCard;
