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

export const fetchAllArticlesByTopic = (topic, sort_by, order, limit, p) => {
  return request
    .get("/articles", { params: { topic, sort_by, order, limit, p } })
    .then(({ data }) => {
      return data;
    });
};

export const fetchCommentsByArticleId = (articleId, limit, p) => {
  return request
    .get(`/articles/${articleId}/comments`, { params: { limit, p } })
    .then(({ data }) => data);
};

export const patchCommentById = (commentId, vote) => {
  return request.patch(`/comments/${commentId}`, { inc_votes: vote });
};

export const fetchArticleById = (articleId) => {
  return request.get(`/articles/${articleId}`).then(({ data }) => data);
};

export const patchArticleVotebyId = (articleId, vote) => {
  return request.patch(`/articles/${articleId}`, { inc_votes: vote });
};

export const postComment = (articleId, { username, body }) => {
  return request
    .post(`/articles/${articleId}/comments`, { username, body })
    .then(({ data }) => data);
};

export const deleteComment = (commentId) => {
  return request.delete(`/comments/${commentId}`);
};

export const postUser = (
  username,
  password,
  name,
  avatar_url = "placeholder"
) => {
  return request
    .post(`/users`, { username, password, name, avatar_url })
    .then(({ data }) => data);
};

export const login = (username, password) => {
  return request
    .post(`/login`, { username, password })
    .then(({ data }) => data);
};
