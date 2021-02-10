import React, { Component } from "react";
import { Link } from "@reach/router";
import SingleArticle from "./SingleArticle";
import CommentsList from "./CommentsList";
import TopicList from "./TopicList";
import Loader from "./Loader";
function ArticlePage(props) {
  return (
    <div className="articlePage">
      <SingleArticle
        articleId={props.articleId}
        username={props.username}
        authorization={props.authorization}
      />

      <CommentsList
        articleId={props.articleId}
        username={props.username}
        authorization={props.authorization}
      />

      <TopicList />
    </div>
  );
}

export default ArticlePage;
