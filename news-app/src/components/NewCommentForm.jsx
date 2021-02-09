import React, { Component } from "react";

class NewCommentForm extends Component {
  state = {
    body: "",
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const comment = { body: this.state.body, user: "dong" };
    this.setState({ body: "" }, () => {
      this.props.postNewComment(comment);
    });
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
          <button className="newcommentblock_submitbutton">Submit</button>
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
