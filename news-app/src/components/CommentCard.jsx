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
        <p className="commentcard__authortime">
          {this.state.comment.author} at {this.state.comment.created_at} :
        </p>{" "}
        {this.state.comment.author === "jessjelly" ? (
          <div className="commentcard__delbuttonblock">
            <button
              className="commentcard__delbuttonblock__delbutton"
              onClick={this.handleClick}
            >
              delete
            </button>
          </div>
        ) : null}
        <p className="commentcard__body">{this.state.comment.body}</p>
        <VotePanel
          changeVote={this.changeVote}
          blockName="commentcard"
          votes={this.state.comment.votes}
        />
      </div>
    );
  }

  handleClick = () => {
    this.props.removeComment(this.state.comment.comment_id);
  };
  changeVote = (isUpVote) => {
    const vote = isUpVote ? 1 : -1;

    patchCommentById(this.state.comment.comment_id, vote).then(() => {
      this.setState((currentState) => {
        return {
          comment: {
            ...currentState.comment,
            votes: currentState.comment.votes + vote,
          },
        };
      });
    });
  };
}

export default CommentCard;
