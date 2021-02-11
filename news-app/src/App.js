import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Title from "./components/Title";
import { Router, Link } from "@reach/router";
import TopicList from "./components/TopicList";
import NewTopicForm from "./components/NewTopicForm";
import ArticleList from "./components/ArticleList";
import ArticlePage from "./components/ArticlePage";
import ErrorDisplayer from "./components/ErrorDisplayer";
import RegisterPage from "./components/RegisterPage";
import LogIn from "./components/LogIn";
import React, { Component } from "react";

class App extends Component {
  state = {
    username: "",
    token: "",
    authorization: "",
    keyword: "secret",
  };

  componentDidMount() {
    const userConfig = JSON.parse(localStorage.getItem("userConfig"));
    if (userConfig) this.setState({ ...userConfig });
  }

  render() {
    return (
      <>
        <Title
          authorization={this.state.authorization}
          username={this.state.username}
          emptyUserConfig={this.emptyUserConfig}
        />
        <Router>
          <RegisterPage path="/newuser" changeUsername={this.changeUsername} />
          <LogIn path="/login" changeUsername={this.changeUsername} />
          <TopicList path="/" />
          <TopicList path="/topics" />
          <NewTopicForm
            path="/topics/newtopic"
            authorization={this.state.authorization}
            username={this.state.username}
          />
          <ArticleList path="/topics/articles/*" />
          <ArticlePage
            path="/article/:articleId"
            authorization={this.state.authorization}
            username={this.state.username}
          />
          <ErrorDisplayer default />
        </Router>
      </>
    );
  }

  emptyUserConfig = () => {
    this.setState({
      username: "",
      token: "",
      authorization: "",
      keyword: "secret",
    });
  };

  changeUsername = (username, token) => {
    this.setState(
      (currentState) => {
        return {
          username,
          token,
          authorization: `${currentState.keyword} ${token}`,
        };
      },
      () => {
        localStorage.setItem(
          "userConfig",
          JSON.stringify({
            username,
            token,
            authorization: `${this.state.keyword} ${token}`,
          })
        );
      }
    );
  };
}

export default App;
