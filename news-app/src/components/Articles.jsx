import React, { Component } from "react";
import * as api from "../api";
import ArticleCard from "./ArticleCard";
import ArticlesConditionQuery from "./ConditionQuery";
import ErrorDisplayer from "./ErrorDisplayer";
import Loader from "./Loader";

class Articles extends Component {
  state = {
    articles: [],
    isLoading: true,
    errMsg: "",
  };

  fetchArticlesByTopic = (topic, sort_by, order) => {
    api
      .fetchAllArticlesByTopic(topic, sort_by, order)
      .then(({ articles, total_count }) =>
        this.setState({
          topic: this.props.topic,
          articles,
          total_count,
          sort_by,
          order,
        })
      )
      .catch((err) => this.setState({ errMsg: err.msg, isLoading: false }));
  };

  componentDidMount() {
    this.fetchArticlesByTopic(
      this.props.topic,
      this.state.sort_by,
      this.state.order
    );
  }

  componentDidUpdate(prevProps) {
    if (prevProps.topic !== this.props.topic) {
      this.fetchArticlesByTopic(this.props.topic);
    }
  }

  render() {
    if (this.isLoading) return <Loader />;
    if (this.errMsg) return <ErrorDisplayer msg={this.errMsg} />;
    if (this.state.articles.length === 0)
      return <h1>No articles found for this topic</h1>;
    return (
      <div className="articleslistblock">
        <ArticlesConditionQuery
          changeSortBy={this.changeSortBy}
          changeOrder={this.changeOrder}
          blockName="articleslistblock"
          selectOptions={{
            created_at: "Date",
            comment_count: "Comments",
            votes: "Votes",
          }}
        />
        <ul className="articleslistblock_ul">
          {this.state.articles.map((article) => (
            <ArticleCard key={article.article_id} article={article} />
          ))}
        </ul>
      </div>
    );
  }

  changeSortBy = (sort_by) => {
    this.fetchArticlesByTopic(this.state.topic, sort_by, this.state.order);
  };
  changeOrder = (order) => {
    this.fetchArticlesByTopic(this.state.topic, this.state.sort_by, order);
  };
}

export default Articles;
