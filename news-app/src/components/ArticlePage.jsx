import React from "react";

import SingleArticle from "./SingleArticle";
import CommentsList from "./CommentsList";
import TopicList from "./TopicList";
function ArticlePage(props) {
  return (
    <div className="articlePage">
      <SingleArticle articleId={props.articleId} />
      <CommentsList articleId={props.articleId} />
      <TopicList />
    </div>
  );
}

export default ArticlePage;
