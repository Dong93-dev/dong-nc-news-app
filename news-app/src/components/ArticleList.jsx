import React, { Component } from "react";
import TopicList from "./TopicList";
import { Router } from "@reach/router";
import Articles from "./Articles";

class ArticleList extends Component {
  state = { topic: "" };

  render() {
    return (
      <div className="articleslistpage">
        <TopicList path={this.props.path} changeTopic={this.changeTopic} />
        <Router>
          <Articles path="/:topic" />
        </Router>
      </div>
    );
  }
  changeTopic = (topic) => {
    this.setState({ topic });
  };
}

export default ArticleList;
