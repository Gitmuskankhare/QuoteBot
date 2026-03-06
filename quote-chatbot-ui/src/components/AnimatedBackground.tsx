export function AnimatedBackground() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        background:
          "linear-gradient(135deg, #4f46e5, #7c3aed, #06b6d4)",
        opacity: 0.15,
      }}
    />
  );
}