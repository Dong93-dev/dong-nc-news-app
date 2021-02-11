import React, { Component } from "react";
import * as api from "../api";
import { Link } from "@reach/router";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

class NewTopicForm extends Component {
  state = { slug: "", description: "", warningMsg: "", topics: [] };
  componentDidMount() {
    api.fetchAllTopics().then(({ topics }) => {
      this.setState({ topics: topics });
    });
  }

  render() {
    return (
      <div className="newtopicformblock">
        <form onSubmit={this.handleSubmit} className="newtopicform__form">
          <label className="newtopicform__form__slug">
            Please give a slug
            <input
              type="text"
              id="slug"
              value={this.state.slug}
              onChange={this.handleInput}
            />
          </label>
          <label className="newtopicform__form__description">
            Please give a description for this slug
            <input
              type="text"
              id="description"
              value={this.state.description}
              onChange={this.handleInput}
            />
          </label>
          {this.state.warningMsg ? (
            <p className="newtopicform__form_wanring">this.state.warningMsg</p>
          ) : null}
          <button
            type="submit"
            onClick={this.handleSubmit}
            className="newtopicform__form__submitbutton"
          >
            Create
          </button>
          <Link to="/">
            <button>Home Page</button>
          </Link>
        </form>
        <h1 className="newtopicformblock__title">Let's create a new topic</h1>
        <Form
          className="newtopicformblock__newtopicform"
          onSubmit={this.handleSubmit}
        >
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>New topic name</Form.Label>
            <Form.Control type="text" placeholder="New topic name" />
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={4} />
          </Form.Group>
          <Button
            disabled={!this.props.authorization}
            variant="primary"
            type="submit"
            className=" btn-lg btn-block"
          >
            Create
          </Button>
          <Button
            variant="primary"
            type="discard"
            className=" btn-lg btn-block"
          >
            Discard
          </Button>
        </Form>
      </div>
    );
  }

  handleInput = (event) => {
    this.setState({ [event.target.id]: event.target.value, warningMsg: "" });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.slug, "slug", this.state.description, "description");
    console.log(this.state.slug !== "" && this.state.description !== "");
    // to consider the the same slug is posted
    if (this.state.slug !== "" && this.state.description !== "") {
      api.postTopic({
        slug: this.state.slug,
        description: this.state.description,
      });
      this.setState({ slug: "", description: "" });
    } else {
      this.setState({ warningMsg: "slug or description cannot be empty" });
    }
  };
}

export default NewTopicForm;
