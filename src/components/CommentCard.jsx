import React, { Component } from "react";
import { patchCommentById, deleteComment } from "../api";
import ErrorDisplayer from "./ErrorDisplayer";

import Loader from "./Loader";
import VotePanel from "./VotePanel";

class CommentCard extends Component {
  state = { isLoading: true, errMsgVotePanel: "", errMsg: "" };

  componentDidMount() {
    this.setState({ comment: this.props.comment, isLoading: false });
  }

  render() {
    if (this.state.isLoading) return <Loader />;

    return (
      <div className="commentcard">
        {/* <div className="commentcard_avatar"><img src={this.state.} alt="placeholder"/></div> */}
        {this.state.errMsg ? <ErrorDisplayer msg={this.state.errMsg} /> : null}
        <p className="commentcard__authortime">
          {this.state.comment.author} at{" "}
          {`${this.state.comment.created_at
            .split("T")[1]
            .split(":")
            .slice(0, 2)
            .join(":")} in ${this.state.comment.created_at.split("T")[0]}`}{" "}
          :
        </p>{" "}
        {this.state.comment.author === this.props.username ? (
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
          errMsg={this.state.errMsgVotePanel}
          username={this.props.username}
          authorization={this.props.authorization}
        />
      </div>
    );
  }

  handleClick = () => {
    deleteComment(this.state.comment.comment_id, this.props.authorization)
      .then(() => {
        this.props.removeComment(this.state.comment.comment_id);
      })
      .catch((err) =>
        this.setState((currentState) => {
          return {
            errMsg: err.response.data.msg.includes("Bad request")
              ? "this comment already deleted"
              : "you are offline",
          };
        })
      );
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
          errMsgVotePanel: "",
        };
      },
      () => {
        patchCommentById(
          this.state.comment.comment_id,
          vote,
          this.props.authorization
        ).catch((err) => {
          this.setState((currentState) => {
            return {
              comment: {
                ...currentState.comment,
                votes: currentState.comment.votes - vote,
              },

              errMsgVotePanel: err.response.data.msg.includes("No comment")
                ? "this comment already deleted"
                : "you are offline",
            };
          });
        });
      }
    );
  };
}

export default CommentCard;
