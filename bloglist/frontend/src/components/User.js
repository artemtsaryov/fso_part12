import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// Although this way of implementing the user's view was probably implied by the exercise
// In a real project we'd rather need to turn user data in our store to a short-living cache
const User = () => {
  let params = useParams();

  const user = useSelector((state) =>
    state.users.find((u) => u.id === params.id)
  );
  if (!user) {
    return null;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => {
          return <li key={blog.id}>{blog.title}</li>;
        })}
      </ul>
    </div>
  );
};

export default User;
