import React, { Component } from "react";
import * as api from "../api";
import TopicCard from "./TopicCard";
import NewTopicForm from "./NewTopicForm";
import { Link } from "@reach/router";

class TopicList extends Component {
  state = {
    topics: [],

    isLoading: true,
  };

  componentDidMount() {
    api.fetchAllTopics().then(({ topics }) => {
      this.setState({ topics: topics, isLoading: false });
    });
  }

  render() {
    if (this.state.isLoading) return <div>loading...</div>;
    return (
      <div className="topiclist">
        {this.props.path === "/" ? (
          <p className="topiclist__p">Any topic prefer ?</p>
        ) : null}
        <ul className="topiclist__ul">
          {this.state.topics.map((topic) => (
            <TopicCard key={topic.slug} {...topic} path={this.props.path} />
          ))}
        </ul>
        {this.props.path === "/" ? (
          <Link to="/topics/newtopic">
            <button className="topiclist__addTopicButton">+</button>
          </Link>
        ) : (
          <Link to="/topics/newtopic">
            <button className="topiclist__addTopicButton--text">
              Add a topic
            </button>
          </Link>
        )}

        {this.props.path === "/" ? (
          <p className="topiclist__p">Straight in</p>
        ) : null}
      </div>
    );
  }
}

export default TopicList;
