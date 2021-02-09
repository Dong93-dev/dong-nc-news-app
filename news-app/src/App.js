import "./App.css";
import Title from "./components/Title";
import { Router, Link } from "@reach/router";
import TopicList from "./components/TopicList";
import NewTopicForm from "./components/NewTopicForm";
import ArticleList from "./components/ArticleList";
import ArticlePage from "./components/ArticlePage";
import ErrorDisplayer from "./components/ErrorDisplayer";

function App() {
  return (
    <>
      <Title />
      <Router>
        <TopicList path="/" />
        <TopicList path="/topics" />
        <NewTopicForm path="/topics/newtopic" />
        <ArticleList path="/topics/articles/*" />
        <ArticlePage path="/article/:articleId" />
        <ErrorDisplayer default />
      </Router>
    </>
  );
}

export default App;
