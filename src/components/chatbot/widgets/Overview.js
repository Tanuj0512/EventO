import Options from "./Options";

const GeneralOptions = (props) => {
  const options = [
    {
      name: "Registration Assistance",
      handler: props.actionProvider.handleRegistrationAssistance,
      id: 1
    },
    {
      name: "Event Information",
      handler: props.actionProvider.handleCreateEvent,
      id: 2
    },
    {
      name: "Contact Developer ",
      handler: props.actionProvider.handleContact,
      id: 3
    },
    {
      name: "FAQs ",
      handler: props.actionProvider.handleFaq,
      id: 4
    }
  ];
  return <Options options={options} title="Options" {...props} />;
};

export default GeneralOptions;
