"use client";

import { useState, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export default function VoiceInteraction({ id }: { id: string }) {
  const [aiResponse, setAiResponse] = useState("");
  const { transcript, resetTranscript, listening } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      handleVoiceInput(transcript);
    }
  }, [transcript]);

  const handleVoiceInput = async (input: string) => {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [{ role: "user", content: input }],
        id,
      }),
    });

    if (response.ok) {
      const { message } = await response.json();
      setAiResponse(message);
      speak(message);
    }

    resetTranscript();
  };

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="p-4">
      <button
        className="bg-blue-500 text-white p-2 rounded"
        onClick={() => SpeechRecognition.startListening({ continuous: true })}
      >
        {listening ? "Listening..." : "Start Listening"}
      </button>
      <p className="mt-4">You said: {transcript}</p>
      <p className="mt-4">AI response: {aiResponse}</p>
    </div>
  );
}
