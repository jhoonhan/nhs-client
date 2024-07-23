import "./scss/App.scss";
import React, { useEffect, useContext, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import useContextValues from "./useContextValues";

export const AppContext = React.createContext();

function App() {
  const contextValues = useContextValues();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.value);
  };

  return (
    <div className="App">
      {/*    write me a five option dropdown */}
      <form onSubmit={handleSubmit}>
        <select>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
          <option value="4">Option 4</option>
          <option value="5">Option 5</option>
        </select>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
