import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";
import { initBlogs, addBlog } from "../reducers/blogs";
import { notifyWithTimeout } from "../reducers/notifications";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(initBlogs())
        .unwrap()
        .catch((error) => {
          dispatch(
            notifyWithTimeout(
              `failed to retrieve blogs due to "${error}"`,
              true
            )
          );
        });
    }
  }, []);

  const togglableBlogFormRef = useRef();

  const handleCreate = (blog) => {
    dispatch(addBlog(blog))
      .unwrap()
      .then(() => {
        dispatch(
          notifyWithTimeout(`blog ${blog.title} has successfully been added`)
        );
      })
      .catch((error) => {
        dispatch(
          notifyWithTimeout(`failed to add a new blog due to ${error}`, true)
        );
      });

    togglableBlogFormRef.current.close();
  };

  return (
    <div>
      <Togglable label="create new" ref={togglableBlogFormRef}>
        <BlogForm handleCreateNew={handleCreate} />
      </Togglable>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">Author</TableCell>
              <TableCell align="right">URL</TableCell>
              <TableCell align="right">Likes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blogs.map((b) => (
              <TableRow
                key={b.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Link to={b.id}>{b.title}</Link>
                </TableCell>
                <TableCell align="right">{b.author}</TableCell>
                <TableCell align="right">{b.url}</TableCell>
                <TableCell align="right">{b.likes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Blogs;
