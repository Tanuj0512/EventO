import { StrictMode } from "react";
import ReactDOM from "react-dom";

import ChatbotBox from "./Chatbot";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <ChatbotBox />
  </StrictMode>,
  rootElement
);
