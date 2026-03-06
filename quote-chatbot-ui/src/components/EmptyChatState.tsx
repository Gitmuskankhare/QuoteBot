import React from "react";

type Props = {
  visible: boolean;
  onSuggestionClick: (text: string) => void;
};

export function EmptyChatState({ visible, onSuggestionClick }: Props) {
  if (!visible) return null;

  return (
    <div
      style={{
        width: "100%",        // ✅ THE FIX: was missing, causing left-alignment
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: "white",
      }}
    >
      <h1 style={{ fontSize: "32px", marginBottom: "10px" }}>
        Quote Chatbot ✨
      </h1>

      <p style={{ opacity: 0.8, marginBottom: "25px" }}>
        Ask me for motivation, inspiration, love, humor, or success quotes.
      </p>

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" }}>
        <button
          style={buttonStyle}
          onClick={() => onSuggestionClick("Give me a motivation quote")}
        >
          Motivation
        </button>

        <button
          style={buttonStyle}
          onClick={() => onSuggestionClick("Give me an inspiration quote")}
        >
          Inspiration
        </button>

        <button
          style={buttonStyle}
          onClick={() => onSuggestionClick("Tell me something funny")}
        >
          Humor
        </button>

        <button
          style={buttonStyle}
          onClick={() => onSuggestionClick("Give me a love quote")}
        >
          Love
        </button>

        <button
          style={buttonStyle}
          onClick={() => onSuggestionClick("Give me a success quote")}
        >
          Success
        </button>
      </div>
    </div>
  );
}

const buttonStyle: React.CSSProperties = {
  padding: "10px 16px",
  borderRadius: "10px",
  border: "none",
  background: "#4f46e5",
  color: "white",
  cursor: "pointer",
  fontSize: "14px",
};