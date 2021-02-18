import React, { Component } from "react";
import TopicList from "./TopicList";
import { Router } from "@reach/router";
import ArticlesList from "./ArticlesList";
import TopicsPanel from "./TopicsPanel";

class ArticlesBoard extends Component {
  state = { topic: "" };

  render() {
    return (
      <div className="articleslistpage">
        <TopicsPanel
          authorization={this.props.authorization}
          username={this.props.username}
        />
        <TopicList
          path={this.props.path}
          changeTopic={this.changeTopic}
          authorization={this.props.authorization}
          username={this.props.username}
        />
        <Router>
          <ArticlesList
            path="/:topic"
            authorization={this.props.authorization}
            username={this.props.username}
          />
        </Router>
      </div>
    );
  }
  changeTopic = (topic) => {
    this.setState({ topic });
  };
}

export default ArticlesBoard;
