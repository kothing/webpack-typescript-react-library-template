import React from "react";
import Hellow from "./lib/Hellow";

type Props = {
  [key: string]: any;
};

const App = (props: Props) => {
  return (
    <>
      <div>App</div>
      <img src="./assets/logo.png" width="100px" height="100px" alt="logo" />
      <Hellow />
    </>
  );
};

export default App;
