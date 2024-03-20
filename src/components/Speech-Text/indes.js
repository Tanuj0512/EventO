import React from "react";
import { useState } from "react";
import "./modal.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import useClipboard from "react-use-clipboard";

const TextSpeech = () => {
  const [copy, setCopy] = useState();
  const [isCopied, setCopied] = useClipboard(copy, {
    successDuration:1000
});

  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });

  const { transcript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return null;
  }
  return (
    <div className="TS-container">
      <p
        style={{
          fontWeight: "bold",
          fontSize: "25px",
          letterSpacing: "1px",
          wordSpacing: "2px",
          lineHeight: "1.6",
          marginTop: "-1vh",
        }}
      >
        Speech to Text Converter
      </p>
      <div className="TS-main-content" onClick={() => setCopy(transcript)}>
        {transcript}
      </div>
      <div className="TS-Buttons">
        <button onClick={setCopied}>
          {isCopied ? "Copied" : "Copy to Clipboard"}
        </button>
        <button onClick={startListening}>Start Listening</button>
        <button onClick={SpeechRecognition.stopListening}>
          Stop Listening
        </button>
      </div>
    </div>
  );
};

export default TextSpeech;
