import React, { Component } from "react";
import * as api from "../api";
import TopicCard from "./TopicCard";
import NewTopicForm from "./NewTopicForm";
import Collapsible from "react-collapsible";
import { Link } from "@reach/router";
import Loader from "./Loader";

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
    if (this.state.isLoading) return <Loader />;
    if (this.state.topics.length === 0) return <h1>No topics for now</h1>;
    return this.props.path === "/" ? (
      <div className="topicpage">
        {" "}
        <p className="topicpage__prefertopic">PREFER ANY TOPIC?</p>
        <ul className="topicpage__ul">
          {this.state.topics.map((topic) => (
            <TopicCard key={topic.slug} {...topic} path={this.props.path} />
          ))}
          <Link to={this.props.authorization ? "/topics/newtopic" : "/login"}>
            <div className="topicpage__addTopic">
              <button className="topicpage__addTopicButton">+</button>
            </div>
          </Link>
        </ul>
        <Link to="/topics/articles/*">
          <p className="topicpage__straightin">All articles >></p>
        </Link>
      </div>
    ) : (
      <nav className="topiclist">
        <Collapsible
          trigger={"▲ Topics"}
          triggerWhenOpen={"▼"}
          transitionTime={300}
          overflowWhenOpen="scroll"
        >
          <ul className="topiclist__ul">
            {this.state.topics.map((topic) => (
              <TopicCard key={topic.slug} {...topic} path={this.props.path} />
            ))}
          </ul>
          <Link to={this.props.authorization ? "/topics/newtopic" : "/login"}>
            <div className="topiclist__addTopic">
              <button className="topiclist__addTopicButton--text">
                Add a topic
              </button>
            </div>
          </Link>
        </Collapsible>
      </nav>
    );
  }
}

export default TopicList;
