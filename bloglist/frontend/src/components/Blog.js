import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { removeBlog, likeBlog, addBlogComment } from "../reducers/blogs";
import { notifyWithTimeout } from "../reducers/notifications";

// Although this way of implementing the user's view was probably implied by the exercise
// In a real project we'd rather need to turn user data in our store to a short-living cache
const Blog = () => {
  const [newComment, setNewComment] = useState("");

  const params = useParams();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  const blog = useSelector((state) =>
    state.blogs.find((b) => b.id === params.id)
  );

  const dispatch = useDispatch();

  if (!blog) {
    return null;
  }

  const handleLike = () => {
    dispatch(likeBlog(blog))
      .unwrap()
      .then(() => {
        dispatch(
          notifyWithTimeout(`blog ${blog.title} has received a new like`)
        );
      })
      .catch((error) => {
        dispatch(
          notifyWithTimeout(`failed to send like to blog due to ${error}`, true)
        );
      });
  };

  const handleRemove =
    user && user.username === blog.user.username
      ? () => {
          dispatch(removeBlog(blog))
            .unwrap()
            .then(() => {
              dispatch(
                notifyWithTimeout(`blog ${blog.title} has been removed`)
              );
              navigate("../blogs", { replace: true });
            })
            .catch((error) => {
              dispatch(
                notifyWithTimeout(`failed to remove blog due to ${error}`, true)
              );
            });
        }
      : null;

  const handleAddComment = (event) => {
    event.preventDefault();
    dispatch(addBlogComment({ blog, comment: newComment }))
      .unwrap()
      .then(() => {
        dispatch(notifyWithTimeout(`new comment on ${blog.title}`));
      })
      .catch((error) => {
        dispatch(
          notifyWithTimeout(`failed to add comment due to ${error}`, true)
        );
      });
    setNewComment("");
  };

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} likes <button onClick={handleLike}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
      {handleRemove && <button onClick={handleRemove}>remove</button>}
      <h3>comments</h3>
      <form onSubmit={handleAddComment}>
        <input
          type="text"
          value={newComment}
          onChange={(event) => setNewComment(event.currentTarget.value)}
        />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments.map((c, index) => {
          // In this app comments indices cannot change since the only operation is to add new comments with higher indices, so we will leave indices as keys for now even though it is an unfortunate choice
          return <li key={index}>{c}</li>;
        })}
      </ul>
    </div>
  );
};

export default Blog;
