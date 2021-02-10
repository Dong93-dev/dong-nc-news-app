import React, { Component } from "react";

class NewCommentForm extends Component {
  state = {
    body: "",
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.body) {
      const comment = { body: this.state.body, username: "jessjelly" };
      this.setState({ body: "" }, () => {
        localStorage.setItem("body", JSON.stringify(""));
        this.props.postNewComment(comment);
      });
    }
  };

  componentDidMount() {
    const body = JSON.parse(localStorage.getItem("body"));
    this.setState({ body });
  }
  render() {
    return (
      <div className="newcommentblock">
        <form onSubmit={this.handleSubmit} className="newcommentblock_form">
          <label>
            leave your comment:
            <textarea
              value={this.state.body}
              type="text"
              onChange={this.handleChange}
              id="newcomment"
            />
          </label>
          {this.state.body ? (
            <button className="newcommentblock_submitbutton --inservice">
              Submit
            </button>
          ) : (
            <button className="newcommentblock_submitbutton --ingrey">
              Submit
            </button>
          )}
        </form>
      </div>
    );
  }
  handleChange = (event) => {
    this.setState({ body: event.target.value }, () => {
      localStorage.setItem("body", JSON.stringify(event.target.value));
    });
  };
}

export default NewCommentForm;
