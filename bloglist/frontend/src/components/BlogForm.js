import { useState } from "react";
import { TextField, Button } from "@mui/material";

const BlogForm = ({ handleCreateNew }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const onBlogFormSubmit = (event) => {
    event.preventDefault();

    handleCreateNew({ title, author, url });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <h2>create new</h2>
      <form style={{ marginBottom: "1em" }} onSubmit={onBlogFormSubmit}>
        <div>
          <TextField
            variant="standard"
            margin="normal"
            label="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <TextField
            variant="standard"
            margin="normal"
            label="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <TextField
            variant="standard"
            margin="normal"
            label="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <Button variant="contained" color="primary" type="submit">
          create
        </Button>
      </form>
    </div>
  );
};

export default BlogForm;
