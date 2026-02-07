import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);

  const lines = [
    "> Initializing system...",
    "> Loading neural networks...",
    "> Compiling portfolio data...",
    "> Status: ONLINE",
    "> Welcome, visitor.",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 600);
          return 100;
        }
        return p + 2;
      });
    }, 40);
    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    const t = setInterval(() => setPhase((p) => Math.min(p + 1, lines.length)), 400);
    return () => clearInterval(t);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background grid-bg"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md px-8"
      >
        <h2 className="font-display text-primary text-sm tracking-[0.3em] mb-8 neon-text">
          BANDARU CHANDRA MOULI
        </h2>
        <div className="space-y-2 font-mono text-sm mb-8">
          {lines.slice(0, phase).map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={i === 3 ? "text-secondary cyan-text" : "text-muted-foreground"}
            >
              {line}
            </motion.p>
          ))}
          {phase < lines.length && (
            <span className="inline-block w-2 h-4 bg-primary animate-blink" />
          )}
        </div>
        <div className="w-full h-[2px] bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary"
            style={{ boxShadow: "0 0 10px hsl(300 100% 50% / 0.8)" }}
            animate={{ width: `${progress}%` }}
          />
        </div>
        <p className="font-mono text-xs text-muted-foreground mt-2">{progress}%</p>
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;
