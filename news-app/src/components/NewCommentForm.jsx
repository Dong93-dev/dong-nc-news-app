import React, { Component } from "react";
import { postComment } from "../api";
import Spinner from "react-bootstrap/Spinner";

class NewCommentForm extends Component {
  state = {
    body: "",
    isLoading: false,
    postCommentErrMsg: "",
  };
  handleChange = (event) => {
    this.setState({ body: event.target.value, postCommentErrMsg: "" }, () => {
      if (this.props.username)
        localStorage.setItem("body", JSON.stringify(event.target.value));
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const comment = { body: this.state.body, username: this.props.username };

    this.setState({ body: "", isLoading: true }, () => {
      postComment(this.props.articleId, comment, this.props.authorization)
        .then(({ comment }) => {
          this.props.postNewComment(comment);
        })
        .then(() => localStorage.removeItem("body"))
        .then(() => this.setState({ isLoading: false }))
        .catch((err) => {
          this.setState((currentState) => {
            return {
              postCommentErrMsg: "you are offline",
              isLoading: false,
            };
          });
        });
    });
  };

  componentDidMount() {
    const body = JSON.parse(localStorage.getItem("body"));
    if (body) this.setState({ body });
  }
  render() {
    return (
      <div className="newcommentblock">
        <form onSubmit={this.handleSubmit} className="newcommentblock_form">
          {this.props.authorization ? (
            <label>
              leave your comment:
              <textarea
                value={this.state.body}
                type="text"
                onChange={this.handleChange}
                id="newcomment"
              />
            </label>
          ) : (
            <label>
              Please login
              <textarea
                value={this.state.body}
                type="text"
                onChange={this.handleChange}
                id="newcomment"
                disabled
              />
            </label>
          )}

          {this.state.body ? (
            <button className="newcommentblock_submitbutton --inservice">
              Submit
            </button>
          ) : (
            <button
              disabled={true}
              className="newcommentblock_submitbutton --ingrey"
            >
              Submit
            </button>
          )}
        </form>
        {this.state.postCommentErrMsg ? (
          <p className="cnewomment__err requesterror">
            {this.state.postCommentErrMsg}
          </p>
        ) : null}
        {this.state.isLoading ? <Spinner animation="border" /> : null}
      </div>
    );
  }
}

export default NewCommentForm;
