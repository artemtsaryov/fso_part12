import { forwardRef, useState, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  useImperativeHandle(ref, () => {
    return {
      close: () => setVisible(false),
    };
  });

  return (
    <div style={{ marginBottom: "1em" }}>
      <div style={hideWhenVisible}>
        <Button variant="outlined" onClick={() => setVisible(!visible)}>
          {props.label}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button variant="outlined" onClick={() => setVisible(!visible)}>
          cancel
        </Button>
      </div>
    </div>
  );
});

Togglable.propTypes = {
  label: PropTypes.string.isRequired,
};

Togglable.displayName = "Togglable";

export default Togglable;
