import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const trailX = useSpring(cursorX, { stiffness: 300, damping: 25 });
  const trailY = useSpring(cursorY, { stiffness: 300, damping: 25 });
  const trail2X = useSpring(cursorX, { stiffness: 150, damping: 20 });
  const trail2Y = useSpring(cursorY, { stiffness: 150, damping: 20 });
  const trail3X = useSpring(cursorX, { stiffness: 80, damping: 18 });
  const trail3Y = useSpring(cursorY, { stiffness: 80, damping: 18 });
  const particles = useRef<{ x: number; y: number; id: number }[]>([]);
  const [clickParticles, setClickParticles] = useState<{ x: number; y: number; id: number }[]>([]);
  let idCounter = useRef(0);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const down = (e: MouseEvent) => {
      setClicking(true);
      // Spawn click particles
      const newParticles = Array.from({ length: 8 }, (_, i) => ({
        x: e.clientX,
        y: e.clientY,
        id: idCounter.current++,
      }));
      setClickParticles(newParticles);
      setTimeout(() => setClickParticles([]), 600);

      // Gentle water-drop click sound
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(1200, ctx.currentTime);
      filter.Q.setValueAtTime(5, ctx.currentTime);
      osc.type = "sine";
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(1400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.06);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.1);
    };

    const up = () => setClicking(false);

    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], input, textarea, select")) {
        setHovering(true);
      }
    };
    const out = () => setHovering(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    window.addEventListener("mouseover", over);
    window.addEventListener("mouseout", out);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mouseout", out);
    };
  }, []);

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          animate={{
            scale: clicking ? 0.5 : hovering ? 1.8 : 1,
            rotate: clicking ? 45 : 0,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 20 }}
          className="w-3 h-3 bg-primary rounded-full mix-blend-difference"
          style={{ boxShadow: "0 0 12px hsl(300 100% 50% / 0.8), 0 0 24px hsl(300 100% 50% / 0.4)" }}
        />
      </motion.div>

      {/* Trail ring 1 */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{ x: trailX, y: trailY, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          animate={{
            scale: clicking ? 0.6 : hovering ? 2 : 1,
            borderWidth: hovering ? "1px" : "1.5px",
          }}
          transition={{ type: "spring", stiffness: 400, damping: 22 }}
          className="w-8 h-8 rounded-full border-primary/60"
          style={{
            borderStyle: "solid",
            borderColor: hovering ? "hsl(180 100% 50% / 0.6)" : "hsl(300 100% 50% / 0.5)",
            boxShadow: hovering
              ? "0 0 15px hsl(180 100% 50% / 0.3)"
              : "0 0 10px hsl(300 100% 50% / 0.2)",
            transition: "border-color 0.3s, box-shadow 0.3s",
          }}
        />
      </motion.div>

      {/* Trail ring 2 - ghost */}
      <motion.div
        className="fixed top-0 left-0 z-[9997] pointer-events-none"
        style={{ x: trail2X, y: trail2Y, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          animate={{ scale: clicking ? 0.4 : hovering ? 1.5 : 1, opacity: 0.3 }}
          className="w-5 h-5 rounded-full border border-secondary/40"
        />
      </motion.div>

      {/* Trail ring 3 - faint ghost */}
      <motion.div
        className="fixed top-0 left-0 z-[9996] pointer-events-none"
        style={{ x: trail3X, y: trail3Y, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          animate={{ scale: clicking ? 0.3 : 1, opacity: 0.15 }}
          className="w-4 h-4 rounded-full bg-primary/30"
        />
      </motion.div>

      {/* Click burst particles */}
      {clickParticles.map((p, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const dist = 40 + Math.random() * 30;
        return (
          <motion.div
            key={p.id}
            className="fixed top-0 left-0 z-[9999] pointer-events-none"
            initial={{ x: p.x, y: p.y, scale: 1, opacity: 1 }}
            animate={{
              x: p.x + Math.cos(angle) * dist,
              y: p.y + Math.sin(angle) * dist,
              scale: 0,
              opacity: 0,
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: i % 2 === 0 ? "hsl(300 100% 50%)" : "hsl(180 100% 50%)",
                boxShadow: `0 0 6px ${i % 2 === 0 ? "hsl(300 100% 50%)" : "hsl(180 100% 50%)"}`,
              }}
            />
          </motion.div>
        );
      })}

      {/* Click ripple */}
      {clicking && (
        <motion.div
          className="fixed top-0 left-0 z-[9998] pointer-events-none"
          style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }}
        >
          <motion.div
            initial={{ scale: 0.3, opacity: 0.8 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-10 h-10 rounded-full border border-primary"
          />
        </motion.div>
      )}
    </>
  );
};

export default CustomCursor;
