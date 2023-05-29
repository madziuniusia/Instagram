import React from "react";
import ReactDOM from "react-dom/client";
import Main from "./Main";
import LoginMain from "./LoginMain";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<React.StrictMode>{localStorage.getItem("token") ? <Main /> : <LoginMain />}</React.StrictMode>);
