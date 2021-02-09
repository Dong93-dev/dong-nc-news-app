import React, { Component } from "react";
import { fetchArticleById, patchArticleVotebyId } from "../api";
import ErrorDisplayer from "./ErrorDisplayer";
import VotePanel from "./VotePanel";
import Loader from "./Loader";

class SingleArticle extends Component {
  state = { isLoading: true, errMsg: "" };

  componentDidMount() {
    fetchArticleById(this.props.articleId)
      .then((data) => {
        this.setState({ article: data.article, isLoading: false });
      })
      .catch((err) => this.setState({ errMsg: err.msg, isLoading: false }));
  }
  render() {
    if (this.state.isLoading) return <Loader />;
    if (this.state.errMsg) return <ErrorDisplayer msg={this.state.errMsg} />;
    return (
      <div className="articlePage__singlearticle">
        <h1 className="articlePage__singlearticle_title">
          {" "}
          {this.state.article.title}
        </h1>
        <div className="articlePage__singlearticle_infoblock">
          <p>{this.state.article.author}</p>
          <p>{this.state.article.created_at}</p>
          <p>{this.state.article.topic}</p>
        </div>
        <div className="articlePage__singlearticle_bodylock">
          {this.state.article.body}
        </div>
        <VotePanel
          changeVote={this.changeVote}
          votes={this.state.article.votes}
          blockName="articlePage__singlearticle"
        />
      </div>
    );
  }

  changeVote = (isUpVote) => {
    const vote = isUpVote ? 1 : -1;
    this.setState(
      (currentState) => {
        return {
          article: {
            ...currentState.article,
            votes: currentState.article.votes + vote,
          },
        };
      },
      () => {
        patchArticleVotebyId(this.props.articleId, vote);
      }
    );
  };
}

export default SingleArticle;
