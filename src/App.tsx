import React from "react";
import Hello from "./lib/Hello";
import World from "./lib/World";
import "./App.less";

type Props = {
  [key: string]: any;
};

const App = (props: Props) => {
  return (
    <>
      <div>App</div>
      <img src="./assets/logo.png" width="100px" height="100px" alt="logo" />
      <Hello />
      <World />
    </>
  );
};

export default App;
