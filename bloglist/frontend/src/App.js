import { useEffect } from "react";
import { Routes, Route, Navigate, NavLink } from "react-router-dom";
import NotificationStack from "./components/NotificationStack";
import Blogs from "./components/Blogs";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import Users from "./components/Users";
import User from "./components/User";
import { useSelector, useDispatch } from "react-redux";
import { initBlogs } from "./reducers/blogs";
import { loginUser, setUser } from "./reducers/user";
import { notifyWithTimeout } from "./reducers/notifications";
import { Container, AppBar, Toolbar, Button } from "@mui/material";

const App = () => {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    const authorizedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (authorizedUserJSON) {
      // This does not mean the token is still valid, it may have expired
      const authorizedUser = JSON.parse(authorizedUserJSON);
      dispatch(setUser(authorizedUser));
    }
  }, []);

  const login = (username, password) => {
    dispatch(loginUser({ username, password }))
      .unwrap()
      .then((authenticatedUser) => {
        window.localStorage.setItem(
          "loggedBlogAppUser",
          JSON.stringify(authenticatedUser)
        );

        dispatch(
          notifyWithTimeout(
            `${authenticatedUser.name} has successfully logged in`
          )
        );

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
      })
      .catch((error) => {
        dispatch(
          notifyWithTimeout(
            `failed to login as ${username} due to "${error}"`,
            true
          )
        );
      });
  };

  const logout = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    dispatch(setUser(null));
  };

  const showLogin = () => {
    return (
      <div>
        <h2>log in to blogs app</h2>
        <NotificationStack />
        <LoginForm handleLogin={login} />
      </div>
    );
  };

  const showApp = () => {
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit" component={NavLink} to="/blogs">
              blogs
            </Button>
            <Button color="inherit" component={NavLink} to="/users">
              users
            </Button>
            <em style={{ paddingRight: "1em" }}>{user.name} logged-in </em>
            <Button color="inherit" variant="outlined" onClick={logout}>
              logout
            </Button>
          </Toolbar>
        </AppBar>

        <h2>blogs app</h2>
        <NotificationStack />

        <Routes>
          <Route path="/" element={<Navigate replace to="/blogs" />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<Blog />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
        </Routes>
      </div>
    );
  };

  return (
    <Container>
      <div>{user ? showApp() : showLogin()}</div>
    </Container>
  );
};

export default App;
