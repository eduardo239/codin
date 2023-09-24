import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App.tsx";
import "./css/reset.css";
import "./css/grid.css";
import "./css/main.css";
import { app } from "./helpers/firebase.tsx";
import { UserContextProvider } from "./context/UserContext.tsx";
import { DataProvider } from "./context/DataContext.tsx";
app;

import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserContextProvider>
      <DataProvider>
        <Router>
          <App />
        </Router>
      </DataProvider>
    </UserContextProvider>
  </React.StrictMode>
);
