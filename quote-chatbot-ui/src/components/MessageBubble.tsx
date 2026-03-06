import { motion } from "framer-motion";

export type ChatMessage = {
  id: string;
  role: "user" | "bot";
  text: string;
  timestamp: Date;
};

type Props = {
  message: ChatMessage;
  index: number;
};

export function MessageBubble({ message, index }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      style={{
        background: message.role === "user" ? "#4f46e5" : "#eee",
        color: message.role === "user" ? "white" : "black",
        padding: 10,
        borderRadius: 10,
        margin: "10px 0",
        maxWidth: 600,
        alignSelf: message.role === "user" ? "flex-end" : "flex-start",
      }}
    >
      {message.text}
    </motion.div>
  );
}

export function TypingIndicator() {
  return <div style={{ color: "#888" }}>Bot is typing...</div>;
}