import { createChatBotMessage } from "react-chatbot-kit";
import Overview from "./widgets/Overview";
import RegistrationAssistance from "./widgets/RegistrationAssistance";
import CreateEvent from "./widgets/CreateEvent";
import Contact from "./widgets/Contact";
import Faq from "./widgets/FAQ";
import CoBotAvatar from "./CoBotAvatar";

const config = {
  lang: "no",
  botName: "Assist Bot",
  customStyles: {
    botMessageBox: {
      backgroundColor: "#2196F3",
    },
    chatButton: {
      backgroundColor: "#0f5faf",
    },
  },
  initialMessages: [
    createChatBotMessage(
      "Hello! I'm a Assist Bot here to help you with any questions you might have !!"
    ),
    createChatBotMessage(
      "Here's a quick overview of what I can help you with. You can also type in.",
      {
        withAvatar: false,
        delay: 400,
        widget: "overview",
      }
    ),
  ],
  state: {},
  customComponents: { botAvatar: (props) => <CoBotAvatar {...props} /> },
  widgets: [
    {
      widgetName: "overview",
      widgetFunc: (props) => <Overview {...props} />,
      mapStateToProps: ["messages"],
    },
    {
      widgetName: "registrationAssistance",
      widgetFunc: (props) => <RegistrationAssistance />,
    },
    {
      widgetName: "createEvent",
      widgetFunc: (props) => <CreateEvent />,
    },
    {
      widgetName: "emergencyContact",
      widgetFunc: (props) => <Contact />,
    },
    {
      widgetName: "Faq",
      widgetFunc: (props) => <Faq />,
    },
  ],
};

export default config;
