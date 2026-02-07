import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const terminalLines = [
  { text: "> Initializing system...", delay: 0 },
  { text: "> Loading portfolio data...", delay: 0.4 },
  { text: "> Welcome to my digital space!", delay: 0.8 },
  { text: "> Status: ONLINE", delay: 1.2, highlight: true },
  { text: "> Ready to create amazing things.", delay: 1.6 },
];

const Terminal = () => {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setVisibleLines((v) => {
        if (v >= terminalLines.length) {
          clearInterval(t);
          return v;
        }
        return v + 1;
      });
    }, 500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="cyan-border border rounded-lg overflow-hidden w-full max-w-lg">
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-card border-b border-border">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-destructive" />
          <div className="w-3 h-3 rounded-full" style={{ background: "hsl(45 100% 50%)" }} />
          <div className="w-3 h-3 rounded-full" style={{ background: "hsl(120 100% 40%)" }} />
        </div>
        <span className="font-mono text-xs text-muted-foreground">chandramouli@portfolio:~</span>
      </div>
      {/* Body */}
      <div className="bg-background p-6 font-mono text-sm space-y-3 min-h-[200px]">
        {terminalLines.slice(0, visibleLines).map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className={line.highlight ? "text-secondary cyan-text" : "text-foreground"}
          >
            {line.text}
          </motion.p>
        ))}
        <span className="inline-block w-2.5 h-5 bg-secondary animate-blink" />
      </div>
    </div>
  );
};

export default Terminal;
