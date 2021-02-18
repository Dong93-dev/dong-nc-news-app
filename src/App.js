import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Title from "./components/Title";
import { Router, Link, navigate } from "@reach/router";
import TopicList from "./components/TopicList";
import NewTopicForm from "./components/NewTopicForm";
import ArticlePage from "./components/ArticlePage";
import ErrorDisplayer from "./components/ErrorDisplayer";
import RegisterPage from "./components/RegisterPage";
import UserPage from "./components/UserPage";
import LogIn from "./components/LogIn";
import React, { Component } from "react";
import ArticlesBoard from "./components/ArticlesBoard";
import Loader from "./components/Loader";

class App extends Component {
  state = {
    username: "",
    token: "",
    authorization: "",
    keyword: "secret",
    isLoading: true,
  };

  componentDidMount() {
    const userConfig = JSON.parse(localStorage.getItem("userConfig"));
    if (userConfig) this.setState({ ...userConfig, isLoading: false });
    else this.setState({ isLoading: false });
  }

  render() {
    if (this.state.isLoading) return <Loader />;
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
          <TopicList
            path="/"
            authorization={this.state.authorization}
            username={this.state.username}
          />
          {/* <TopicList
            path="/topics"
            authorization={this.state.authorization}
            username={this.state.username}
          /> */}

          <NewTopicForm
            path="/topics/newtopic"
            authorization={this.state.authorization}
            username={this.state.username}
          />

          <ArticlesBoard
            path="/topics/articles/*"
            authorization={this.state.authorization}
            username={this.state.username}
          />
          <ArticlePage
            path="/article/:articleId"
            authorization={this.state.authorization}
            username={this.state.username}
          />

          <UserPage
            path="/user/:userid"
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
