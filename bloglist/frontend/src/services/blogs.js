import axios from "axios";
const baseUrl = "/api/blogs";

const buildTokenHeader = (token) => {
  return `bearer ${token}`;
};

const getAll = (token) => {
  const request = axios.get(baseUrl, {
    headers: { Authorization: buildTokenHeader(token) },
  });
  return request.then((response) => response.data);
};

const create = (blog, token) => {
  const request = axios.post(baseUrl, blog, {
    headers: { Authorization: buildTokenHeader(token) },
  });
  return request.then((response) => response.data);
};

const addLike = (blog, token) => {
  const request = axios.put(
    `${baseUrl}/${blog.id}`,
    {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    },
    { headers: { Authorization: buildTokenHeader(token) } }
  );
  return request.then((response) => response.data);
};

const addBlogComment = (blog, comment, token) => {
  const request = axios.post(
    `${baseUrl}/${blog.id}/comments`,
    {
      comments: [comment],
    },
    { headers: { Authorization: buildTokenHeader(token) } }
  );

  return request.then((response) => response.data);
};

const remove = (blog, token) => {
  const request = axios.delete(`${baseUrl}/${blog.id}`, {
    headers: { Authorization: buildTokenHeader(token) },
  });
  return request.then((response) => response.data);
};

const exportedApi = { getAll, create, addLike, addBlogComment, remove };

export default exportedApi;
