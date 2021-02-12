import React, { Component } from "react";
import TopicList from "./TopicList";
import { Router } from "@reach/router";
import Articles from "./Articles";
import TopicsPanel from "./TopicsPanel";

class ArticleList extends Component {
  state = { topic: "" };

  render() {
    return (
      <div className="articleslistpage">
        <TopicsPanel
          authorization={this.props.authorization}
          username={this.props.username}
        />
        <TopicList path={this.props.path} changeTopic={this.changeTopic} />
        <Router>
          <Articles
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

export default ArticleList;
