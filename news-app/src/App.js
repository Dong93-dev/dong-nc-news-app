import "./App.css";
import Title from "./components/Title";
import { Router, Link } from "@reach/router";
import TopicList from "./components/TopicList";
import NewTopicForm from "./components/NewTopicForm";

function App() {
  return (
    <>
      <Title />
      <Router>
        <TopicList path="/" />
        <TopicList path="/topics" />
        <NewTopicForm path="/topics/newtopic" />
      </Router>
    </>
  );
}

export default App;
