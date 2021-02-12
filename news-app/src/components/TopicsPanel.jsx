import React, { Component } from "react";
import * as api from "../api";
import TopicCard from "./TopicCard";
import NewTopicForm from "./NewTopicForm";
import Collapsible from "react-collapsible";
import Button from "react-bootstrap/Button";
import { Link } from "@reach/router";
import Loader from "./Loader";

class TopicsPanel extends Component {
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
    if (this.state.isLoading) return <Loader />;
    if (this.state.topics.length === 0) return <h1>No topics for now</h1>;
    return (
      <nav className="topicpanel">
        <h1 className="topicpanel__title">Choose a title</h1>
        <ul className="topicpanel__ul">
          {this.state.topics.map((topic) => (
            <TopicCard key={topic.slug} {...topic} path={this.props.path} />
          ))}
        </ul>
        <Link to={this.props.authorization ? "/topics/newtopic" : "/login"}>
          <div className="topicpanel__addTopic">
            <Button variant="primary" className="btn-lg btn-block" size="lg">
              Add a topic
            </Button>{" "}
          </div>
        </Link>
      </nav>
    );
  }
}

export default TopicsPanel;
