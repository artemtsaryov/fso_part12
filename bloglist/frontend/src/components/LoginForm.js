import { useState } from "react";
import PropTypes from "prop-types";
import { TextField, Button } from "@mui/material";

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onLoginFormSubmit = (event) => {
    event.preventDefault();

    handleLogin(username, password);
    setUsername("");
    setPassword("");
  };

  return (
    <div>
      <form onSubmit={onLoginFormSubmit}>
        <div>
          <TextField
            variant="standard"
            margin="normal"
            label="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>

        <div>
          <TextField
            variant="standard"
            margin="normal"
            label="password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <Button variant="contained" color="primary" type="submit">
          login
        </Button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};

export default LoginForm;
