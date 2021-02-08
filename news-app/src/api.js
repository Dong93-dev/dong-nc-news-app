import axios from "axios";

const request = axios.create({
  baseURL: "https://dong-nc-news.herokuapp.com/api",
});

export const fetchAllTopics = () => {
  return request.get("/topics").then(({ data }) => {
    return data;
  });
};

export const postTopic = (topic) => {
  return request.post("/topics", topic);
};
