import React, { Component } from "react";
import { fetchCommentsByArticleId, postComment } from "../api";
import CommentCard from "./CommentCard";
import ConditionQuery from "./SortSelector";
import ErrorDisplayer from "./ErrorDisplayer";
import Loader from "./Loader";
import NewCommentForm from "./NewCommentForm";
import { Link, navigate } from "@reach/router";
import Pagination from "react-bootstrap-4-pagination";

class CommentsList extends Component {
  state = {
    isLoading: true,
    reloading: false,
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
            reloading: false,
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
      .catch((err) =>
        this.setState({ errMsg: err.response.data.msg, isLoading: false })
      );
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      this.setState({ reloading: true }, () => {
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
                reloading: false,
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
      });
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
        {this.state.reloading ? (
          <Loader />
        ) : (
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
        )}

        {this.props.authorization ? (
          <Pagination {...this.state.paginationConfig} />
        ) : null}

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
    this.setState((currentState) => {
      const commentsAfterDel = currentState.comments.filter(
        (comment) => comment.comment_id !== commentId
      );
      return {
        comments: commentsAfterDel,
        comment_count: currentState.comment_count - 1,
      };
    });
  };
}

export default CommentsList;
