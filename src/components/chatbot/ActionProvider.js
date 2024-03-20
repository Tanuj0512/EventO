class ActionProvider {
  constructor(createChatBotMessage, setStateFunc, createClientMessage) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
  }
  handleOptions = (options) => {
    const message = this.createChatBotMessage(
      "How can I help you? Below are some possible options.",
      {
        widget: "overview",
        loading: true,
        terminateLoading: true,
        ...options,
      }
    );

    this.addMessageToState(message);
  };

  handleRegistrationAssistance = () => {
    const message = this.createChatBotMessage(
      "Here's how you can register for a event.",
      {
        widget: "registrationAssistance",
        loading: true,
        terminateLoading: true,
        withAvatar: true,
      }
    );

    this.addMessageToState(message);
  };

  handleCreateEvent = () => {
    const message = this.createChatBotMessage(
      "Here's how you can create a new event.",
      {
        widget: "createEvent",
        loading: true,
        terminateLoading: true,
        withAvatar: true,
      }
    );

    this.addMessageToState(message);
  };

  handleContact = () => {
    const message = this.createChatBotMessage(
      "Call  for unsolved doubts.",
      {
        widget: "emergencyContact",
        loading: true,
        terminateLoading: true,
        withAvatar: true,
      }
    );

    this.addMessageToState(message);
  };

  handleFaq = () => {
    const message = this.createChatBotMessage(
      "Get some common queries sorted !! :)",
      {
        widget: "Faq",
        loading: true,
        terminateLoading: true,
        withAvatar: true,
      }
    );

    this.addMessageToState(message);
  };

  handleJoke = () => {
    var jokes = [
      "What falls, but never needs a bandage? The rain.",
      "I was going to tell you a joke about boxing but I forgot the punch line.",
      "I'm not a fan of spring cleaning. Let's be honest, I'm not into summer, fall, or winter cleaning either.",
      "Why did the egg hide? It was a little chicken.",
      "What did the dirt say to the rain? If you keep this up, my name will be mud!",
      "Why couldn't the sunflower ride its bike? It lost its petals.",
      "What's an egg's favorite vacation spot? New Yolk City.",
      "How does a penguin build its house? Igloos it together.",
      "What's the difference between a piano and a fish? You can tune a piano, but you can't tuna fish.",
      "Why don't oysters donate to charity? Because they're shellfish.",
    ];

    var randomJoke = jokes[Math.floor(Math.random() * jokes.length)];

    const message = this.createChatBotMessage(randomJoke);

    this.addMessageToState(message);
  };

  handleThanks = () => {
    const message = this.createChatBotMessage("You're welcome, and stay safe!");

    this.addMessageToState(message);
  };

  addMessageToState = (message) => {
    this.setState((state) => ({
      ...state,
      messages: [...state.messages, message],
    }));
  };
}

export default ActionProvider;
