import React, { Component } from "react";
import { patchCommentById } from "../api";
import Loader from "./Loader";
import VotePanel from "./VotePanel";

class CommentCard extends Component {
  state = { isLoading: true };

  componentDidMount() {
    this.setState({ comment: this.props.comment, isLoading: false });
  }

  render() {
    if (this.state.isLoading) return <Loader />;
    return (
      <div className="commentcard">
        <h1 className="commentcard__author">{this.state.comment.author}</h1>
        <p className="commentcard__body">{this.state.comment.body}</p>

        <p className="commentcard__time">{this.state.comment.created_at}</p>
        <VotePanel
          changeVote={this.changeVote}
          blockName="commentcard"
          votes={this.state.comment.votes}
        />
        {this.state.comment.author === "dong" ? (
          <button className="commentcard_delbutton" onClick={this.handleClick}>
            delete
          </button>
        ) : null}
      </div>
    );
  }

  handleClick = () => {
    this.props.removeComment(this.state.comment.comment_id);
  };
  changeVote = (isUpVote) => {
    const vote = isUpVote ? 1 : -1;
    this.setState(
      (currentState) => {
        return {
          comment: {
            ...currentState.comment,
            votes: currentState.comment.votes + vote,
          },
        };
      },
      () => {
        patchCommentById(this.state.comment.comment_id, vote);
      }
    );
  };
}

export default CommentCard;
