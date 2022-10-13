import React from "react";
import ReactDOM from "react-dom";
import Todo from "./Todo";

it("renders without crashing", () => {
  const div = document.createElement("div");

  const todo = {
    text: "Smoke test",
    done: false,
  };

  ReactDOM.render(
    <Todo todo={todo} onClickComplete={() => {}} onClickDelete={() => {}} />,
    div
  );
});
