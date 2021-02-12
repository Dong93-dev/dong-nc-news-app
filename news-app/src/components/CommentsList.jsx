import React, { Component } from "react";
import { fetchCommentsByArticleId, postComment, deleteComment } from "../api";
import CommentCard from "./CommentCard";
import ConditionQuery from "./ConditionQuery";
import ErrorDisplayer from "./ErrorDisplayer";
import Loader from "./Loader";
import NewCommentForm from "./NewCommentForm";
import { Link, navigate } from "@reach/router";
import Pagination from "react-bootstrap-4-pagination";

class CommentsList extends Component {
  state = {
    isLoading: true,
    comments: [],
    errMsg: "",
    limit: 10,
    page: 1,
  };

  componentDidMount() {
    fetchCommentsByArticleId(
      this.props.articleId,
      this.state.limit,
      this.state.page
    )
      .then(({ total_count, comments }) => {
        this.setState((currentState) => {
          return {
            comments,
            comment_count: Number(total_count),
            isLoading: false,
            paginationConfig: {
              totalPages: Math.ceil(Number(total_count) / this.state.limit),
              currentPage: currentState.page,
              showMax: 5,
              size: "sm",
              threeDots: true,
              prevNext: true,
              onClick: (page) => {
                this.setState({ page });
              },
            },
          };
        });
      })
      .catch((err) => this.setState({ errMsg: err.msg, isLoading: false }));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      fetchCommentsByArticleId(
        this.props.articleId,
        this.state.limit,
        this.state.page
      )
        .then(({ total_count, comments }) => {
          this.setState((currentState) => {
            return {
              comments,
              comment_count: Number(total_count),
              isLoading: false,
              paginationConfig: {
                totalPages: Math.ceil(Number(total_count) / this.state.limit),
                currentPage: currentState.page,
                showMax: 5,
                size: "sm",
                threeDots: true,
                prevNext: true,
                onClick: (page) => {
                  this.setState({ page });
                },
              },
            };
          });
        })
        .catch((err) => this.setState({ errMsg: err.msg, isLoading: false }));
    }
  }
  render() {
    if (this.state.isLoading) return <Loader />;
    if (this.state.errMsg) return <ErrorDisplayer msg={this.state.errMsg} />;

    return (
      <div className="CommentsListBlock">
        <NewCommentForm
          postNewComment={this.postNewComment}
          articleId={this.props.articleId}
          username={this.props.username}
          authorization={this.props.authorization}
        />

        <h1 className="CommentsListBlock__commentcount">
          Total comment: {this.state.comment_count}
        </h1>
        <div
          className={
            this.props.authorization
              ? "CommentsListBlock__cardlist"
              : "CommentsListBlock__cardlist listdisabled"
          }
        >
          {this.state.comments.map((comment) => (
            <CommentCard
              key={comment.comment_id}
              comment={comment}
              removeComment={this.removeComment}
              username={this.props.username}
              authorization={this.props.authorization}
            />
          ))}
        </div>
        <Pagination {...this.state.paginationConfig} />

        {this.props.authorization ? null : (
          <div className="articlePage__othercomments">
            <button
              className="articlePage__othercomments__button"
              onClick={() => {
                navigate("/login");
              }}
            >
              want to see more? ▼
            </button>
          </div>
        )}
      </div>
    );
  }

  postNewComment = (comment) => {
    this.setState((currentState) => {
      return {
        comments: [comment, ...currentState.comments],
        comment_count: currentState.comment_count + 1,
      };
    });
  };

  removeComment = (commentId) => {
    const commentsBeforeDel = [...this.state.comments];
    this.setState(
      (currentState) => {
        const commentsAfterDel = currentState.comments.filter(
          (comment) => comment.comment_id !== commentId
        );
        return {
          comments: commentsAfterDel,
          comment_count: currentState.comment_count - 1,
        };
      },
      () => {
        deleteComment(commentId).catch((err) =>
          this.setState((currentState) => {
            return {
              comments: commentsBeforeDel,
              comment_count: currentState.comment_count + 1,
            };
          })
        );
      }
    );
  };
}

export default CommentsList;
