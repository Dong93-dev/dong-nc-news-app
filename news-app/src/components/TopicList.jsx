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
    return (
      <nav className="topiclist">
        <Collapsible
          trigger={"▲ Topics"}
          triggerWhenOpen={"▼"}
          transitionTime={300}
          overflowWhenOpen="scroll"
        >
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
              <div className="topiclist__addTopic">
                <button className="topiclist__addTopicButton">+</button>
              </div>
            </Link>
          ) : (
            <Link to="/topics/newtopic">
              <div className="topiclist__addTopic">
                <button className="topiclist__addTopicButton--text">
                  Add a topic
                </button>
              </div>
            </Link>
          )}

          {this.props.path === "/" ? (
            <p className="topiclist__p">Straight in</p>
          ) : null}
        </Collapsible>
      </nav>
    );
  }
}

export default TopicList;
