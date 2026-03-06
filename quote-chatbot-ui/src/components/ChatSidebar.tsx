type SidebarProps = {
  isOpen: boolean;
  onToggle: () => void;
  onNewChat: () => void;
  onCategoryClick: (category: string) => void;
};

export function ChatSidebar({
  isOpen,
  onToggle,
  onNewChat,
  onCategoryClick,
}: SidebarProps) {
  return (
    <div
      style={{
        width: 240,
        background: "#111",
        color: "white",
        padding: 20,
        display: isOpen ? "block" : "none",
      }}
    >
      <button onClick={onNewChat}>New Chat</button>

      <div style={{ marginTop: 20 }}>
        <button onClick={() => onCategoryClick("motivation")}>
          Motivation
        </button>
        <br />
        <button onClick={() => onCategoryClick("inspiration")}>
          Inspiration
        </button>
        <br />
        <button onClick={() => onCategoryClick("love")}>
          Love
        </button>
        <br />
        <button onClick={() => onCategoryClick("humor")}>
          Humor
        </button>
        <br />
        <button onClick={() => onCategoryClick("success")}>
          Success
        </button>
      </div>

      <button style={{ marginTop: 20 }} onClick={onToggle}>
        Toggle
      </button>
    </div>
  );
}