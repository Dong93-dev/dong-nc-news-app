import React, { Component } from "react";
import * as api from "../api";
import { Link, navigate } from "@reach/router";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

class NewTopicForm extends Component {
  state = { slug: "", description: "", topics: [], warnMsg: "" };
  componentDidMount() {
    const slug = JSON.parse(localStorage.getItem("slug"));
    const description = JSON.parse(localStorage.getItem("description"));
    api.fetchAllTopics().then(({ topics }) => {
      const stateObj = {};
      if (slug) stateObj.slug = slug;
      if (description) stateObj.description = description;
      this.setState({ topics, ...stateObj });
    });
  }

  render() {
    return (
      <div className="newtopicformblock">
        <h1 className="newtopicformblock__title">Let's create a new topic</h1>
        <Form
          className="newtopicformblock__newtopicform"
          onSubmit={this.handleSubmit}
        >
          <Form.Group controlId="slug">
            <Form.Label>New topic name</Form.Label>
            <Form.Control
              type="text"
              placeholder="New topic name"
              value={this.state.slug}
              onChange={this.handleInput}
            />
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              onChange={this.handleInput}
              value={this.state.description}
              placeholder="An attractive description"
            />
          </Form.Group>
          {this.state.warnMsg ? <p>{this.state.warnMsg}</p> : null}
          <Button
            disabled={!this.state.slug || !this.state.description}
            variant="primary"
            type="submit"
            className=" btn-lg btn-block createbtn"
          >
            Create
          </Button>
          <Link to="/">
            <Button
              variant="primary"
              type="discard"
              className=" btn-lg btn-block"
              onClick={() => {
                localStorage.removeItem("slug");
                localStorage.removeItem("description");
              }}
            >
              Discard
            </Button>
          </Link>
        </Form>
      </div>
    );
  }

  handleInput = (event) => {
    this.setState({ [event.target.id]: event.target.value }, () => {
      localStorage.setItem(event.target.id, JSON.stringify(event.target.value));
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const isTopicExist =
      this.state.topics.filter((topic) => topic.slug === event.target[0].value)
        .length > 0;
    if (isTopicExist) {
      this.setState({ warnMsg: "this topic has existed" });
    } else {
      api
        .postTopic({
          slug: this.state.slug,
          description: this.state.description,
        })
        .then(() => {
          navigate("/");
          localStorage.removeItem("slug");
          localStorage.removeItem("description");
        });
    }
  };
}

export default NewTopicForm;
