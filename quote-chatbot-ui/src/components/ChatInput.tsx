import { useState } from "react";

type Props = {
  onSend: (text: string) => void;
  disabled?: boolean;
};

export function ChatInput({ onSend, disabled }: Props) {
  const [text, setText] = useState("");

  const send = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <div
      style={{
        display: "flex",
        padding: 10,
        borderTop: "1px solid #ddd",
      }}
    >
      <input
        style={{ flex: 1, padding: 10 }}
        value={text}
        disabled={disabled}
        onChange={(e) => setText(e.target.value)}
        placeholder="Ask for a quote..."
        onKeyDown={(e) => {
          if (e.key === "Enter") send();
        }}
      />

      <button onClick={send}>Send</button>
    </div>
  );
}