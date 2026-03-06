import { useState, useRef, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu } from "lucide-react";
import { AnimatedBackground } from "../components/AnimatedBackground";
import { ChatSidebar } from "../components/ChatSidebar";
import { EmptyChatState } from "../components/EmptyChatState";
import { MessageBubble, TypingIndicator, type ChatMessage } from "../components/MessageBubble";
import { ChatInput } from "../components/ChatInput";

// Fallback quotes when backend is unavailable
const fallbackQuotes: Record<string, string[]> = {
  motivation: [
    `"The only way to do great work is to love what you do." — Steve Jobs`,
    `"Don't watch the clock; do what it does. Keep going." — Sam Levenson`,
    `"Believe you can and you're halfway there." — Theodore Roosevelt`,
  ],
  inspiration: [
    `"The future belongs to those who believe in the beauty of their dreams." — Eleanor Roosevelt`,
    `"In the middle of difficulty lies opportunity." — Albert Einstein`,
    `"Be the change you wish to see in the world." — Mahatma Gandhi`,
  ],
  love: [
    `"The best thing to hold onto in life is each other." — Audrey Hepburn`,
    `"Love is composed of a single soul inhabiting two bodies." — Aristotle`,
    `"Where there is love there is life." — Mahatma Gandhi`,
  ],
  humor: [
    `"I'm not superstitious, but I am a little stitious." — Michael Scott`,
    `"Behind every great man is a woman rolling her eyes." — Jim Carrey`,
    `"I used to think I was indecisive. But now I'm not so sure." — Unknown`,
  ],
  success: [
    `"Success is not final, failure is not fatal: it is the courage to continue that counts." — Winston Churchill`,
    `"The road to success and the road to failure are almost exactly the same." — Colin R. Davis`,
    `"Success usually comes to those who are too busy to be looking for it." — Henry David Thoreau`,
  ],
};

function detectCategory(text: string): string {
  const lower = text.toLowerCase();
  if (lower.includes("motiv")) return "motivation";
  if (lower.includes("inspir")) return "inspiration";
  if (lower.includes("love") || lower.includes("romantic")) return "love";
  if (lower.includes("humor") || lower.includes("funny") || lower.includes("laugh")) return "humor";
  if (lower.includes("success") || lower.includes("achieve")) return "success";
  const keys = Object.keys(fallbackQuotes);
  return keys[Math.floor(Math.random() * keys.length)];
}

function getRandomQuote(category: string): string {
  const quotes = fallbackQuotes[category] || fallbackQuotes.motivation;
  return quotes[Math.floor(Math.random() * quotes.length)];
}

const Index = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const hasMessages = messages.length > 0;

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }, 100);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  const sendMessage = async (text: string) => {
    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);
    setSidebarOpen(false);

    try {
      const res = await fetch("http://localhost:5005/webhooks/rest/webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sender: "user", message: text }),
      });

      if (!res.ok) throw new Error("Backend unavailable");

      const data = await res.json();
      const botTexts: string[] = data
        .map((d: { text?: string }) => d.text)
        .filter(Boolean);

      await new Promise((r) => setTimeout(r, 800 + Math.random() * 600));
      setIsTyping(false);

      if (botTexts.length > 0) {
        botTexts.forEach((t, i) => {
          setTimeout(() => {
            setMessages((prev) => [
              ...prev,
              { id: crypto.randomUUID(), role: "bot", text: t, timestamp: new Date() },
            ]);
          }, i * 400);
        });
      } else {
        throw new Error("Empty response");
      }
    } catch {
      // Fallback to local quotes
      await new Promise((r) => setTimeout(r, 1000 + Math.random() * 500));
      setIsTyping(false);

      const category = detectCategory(text);
      const quote = getRandomQuote(category);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "bot",
          text: `Here's a ${category} quote for you:\n\n${quote}\n\nWould you like another one? 💫`,
          timestamp: new Date(),
        },
      ]);
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setSidebarOpen(false);
  };

  const handleCategoryClick = (category: string) => {
    sendMessage(`Give me a ${category.toLowerCase()} quote`);
  };

  return (
    <div className="h-screen flex overflow-hidden relative">
      <AnimatedBackground />

      <ChatSidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        onNewChat={handleNewChat}
        onCategoryClick={handleCategoryClick}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-14 flex items-center px-4 border-b border-border/30 backdrop-blur-md bg-background/50 flex-shrink-0">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors mr-3"
          >
            <Menu className="w-5 h-5" />
          </motion.button>
          <span className="font-display font-medium text-sm text-foreground/80">
            {hasMessages ? "Conversation" : "Start a new conversation"}
          </span>
        </header>

        {/* Messages Area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-thin">
          <AnimatePresence mode="wait">
            {!hasMessages ? (
              <EmptyChatState
                key="empty"
                visible={!hasMessages}
                onSuggestionClick={sendMessage}
              />
            ) : (
              <motion.div
                key="messages"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-3xl mx-auto px-4 py-6"
              >
                {messages.map((msg, i) => (
                  <MessageBubble key={msg.id} message={msg} index={i} />
                ))}
                <AnimatePresence>
                  {isTyping && <TypingIndicator />}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input */}
        <ChatInput onSend={sendMessage} disabled={isTyping} />
      </div>
    </div>
  );
};

export default Index;
