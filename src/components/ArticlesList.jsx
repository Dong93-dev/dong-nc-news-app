import React, { Component } from "react";
import * as api from "../api";
import ArticleCard from "./ArticleCard";
import SortSelector from "./SortSelector";
import ErrorDisplayer from "./ErrorDisplayer";
import Loader from "./Loader";
import Pagination from "react-bootstrap-4-pagination";

class ArticlesList extends Component {
  state = {
    articles: [],
    limit: 10,
    page: 1,
    isLoading: true,
    errMsg: "",
    reLoading: false,
  };

  fetchArticlesByTopic = (topic, sort_by, order, limit, page) => {
    this.setState({ reLoading: true }, () => {
      api
        .fetchAllArticlesByTopic(
          topic === "all" ? undefined : topic,
          sort_by,
          order,
          limit,
          page
        )
        .then(({ articles, total_count }) => {
          this.setState({
            topic: this.props.topic,
            articles,
            total_count,
            sort_by,
            order,
            isLoading: false,
            reLoading: false,
            paginationConfig: {
              totalPages: Math.ceil(total_count / limit),
              currentPage: page,
              showMax: 3,
              size: "md",
              threeDots: true,
              prevNext: true,
              onClick: (page) => {
                this.setState({ page });
              },
            },
          });
        })
        .catch((err) => {
          console.log(err.response.data.msg);
          this.setState({ errMsg: err.response.data.msg, isLoading: false });
        });
    });
  };

  componentDidMount() {
    this.fetchArticlesByTopic(
      this.props.topic,
      this.state.sort_by,
      this.state.order,
      this.state.limit,
      this.state.page
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.topic !== this.props.topic) {
      this.fetchArticlesByTopic(
        this.props.topic,
        prevState.sort_by,
        prevState.order,
        prevState.limit,
        1
      );
    } else if (prevState.page !== this.state.page) {
      this.fetchArticlesByTopic(
        this.props.topic,
        prevState.sort_by,
        prevState.order,
        prevState.limit,
        this.state.page
      );
    }
  }

  render() {
    if (this.state.isLoading) return <Loader />;
    if (this.state.errMsg) return <ErrorDisplayer msg={this.state.errMsg} />;
    if (this.state.articles.length === 0)
      return <h1>No articles found for this topic</h1>;
    return (
      <div className="articleslistblock">
        <div className="articleslistblock__topicinfo">
          <h1 className="articleslistblock__title">
            {this.props.topic === "*"
              ? `All Topics`
              : `Topics: ${this.props.topic}`}
          </h1>
          <h1 className="articleslistblock__count">{`Number of articles: ${this.state.total_count}`}</h1>
        </div>
        <SortSelector
          changeSortBy={this.changeSortBy}
          changeOrder={this.changeOrder}
          blockName="articleslistblock"
        />
        {this.state.reLoading ? (
          <Loader />
        ) : (
          <ul className="articleslistblock_ul">
            {this.state.articles.map((article) => (
              <ArticleCard key={article.article_id} article={article} />
            ))}
          </ul>
        )}

        {this.props.authorization ? (
          <Pagination {...this.state.paginationConfig} className="pagination" />
        ) : null}
      </div>
    );
  }

  changeSortBy = (sort_by) => {
    this.fetchArticlesByTopic(
      this.state.topic,
      sort_by,
      this.state.order,
      this.state.limit,
      this.state.page
    );
  };
  changeOrder = (order) => {
    this.fetchArticlesByTopic(
      this.state.topic,
      this.state.sort_by,
      order,
      this.state.limit,
      this.state.page
    );
  };
}

export default ArticlesList;
