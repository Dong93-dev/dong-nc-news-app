import React, { Component } from "react";
import { fetchCommentsByArticleId, postComment, deleteComment } from "../api";
import CommentCard from "./CommentCard";
import ConditionQuery from "./ConditionQuery";
import ErrorDisplayer from "./ErrorDisplayer";
import Loader from "./Loader";
import NewCommentForm from "./NewCommentForm";

class CommentsList extends Component {
  state = {
    isLoading: true,
    comments: [],
    errMsg: "",
  };

  componentDidMount() {
    fetchCommentsByArticleId(this.props.articleId)
      .then(({ total_count, comments }) => {
        this.setState({
          comments,
          comment_count: Number(total_count),
          isLoading: false,
        });
      })
      .catch((err) => this.setState({ errMsg: err.msg, isLoading: false }));
  }

  render() {
    if (this.state.isLoading) return <Loader />;
    if (this.state.errMsg) return <ErrorDisplayer msg={this.state.errMsg} />;

    return (
      <div className="CommentsListBlock">
        <NewCommentForm postNewComment={this.postNewComment} />
        <h1 className="CommentsListBlock__commentcount">
          total comment: {this.state.comment_count}
        </h1>
        <ConditionQuery
          blockName="CommentsListBlock"
          selectOptions={{ created_at: Date, votes: "Votes" }}
        />
        {this.state.comments.map((comment) => (
          <CommentCard
            key={comment.comment_id}
            comment={comment}
            removeComment={this.removeComment}
          />
        ))}
      </div>
    );
  }

  postNewComment = (comment) => {
    postComment(this.props.articleId, comment).then(({ comment }) =>
      this.setState((currentState) => {
        return {
          comments: [comment, ...currentState.comments],
          total_count: currentState.total_count + 1,
        };
      })
    );
  };

  removeComment = (commentId) => {
    deleteComment(commentId).then(() =>
      this.setState((currentState) => {
        const commentsAfterDel = currentState.comments.filter(
          (comment) => comment.comment_id !== commentId
        );
        return {
          comments: commentsAfterDel,
          total_count: currentState.total_count - 1,
        };
      })
    );
  };
}

export default CommentsList;
