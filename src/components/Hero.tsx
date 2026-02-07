import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Download } from "lucide-react";
import Terminal from "./Terminal";

const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="home" ref={ref} className="relative min-h-screen flex items-center overflow-hidden grid-bg pt-24">
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-[120px]" style={{ background: "hsl(300 100% 50%)" }} />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-15 blur-[120px]" style={{ background: "hsl(180 100% 50%)" }} />

      {/* Scan line */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="w-full h-[2px] bg-primary/10 animate-scan-line" />
      </div>

      {/* Neon top line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] gradient-line" />

      <motion.div style={{ y, opacity }} className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-display text-xs tracking-[0.3em] text-primary mb-4 neon-text"
            >
              AI ENGINEER
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6"
            >
              HI, I'M
              <br />
              <span className="text-gradient">BANDARU</span>{" "}
              <span className="text-gradient">CHANDRA</span>
              <br />
              <span className="text-gradient">MOULI</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="font-display text-sm tracking-[0.15em] text-secondary mb-6 cyan-text"
            >
              MACHINE LEARNING & DEEP LEARNING ENTHUSIAST
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="text-muted-foreground max-w-md text-lg leading-relaxed mb-8"
            >
              A passionate AI enthusiast specializing in machine learning, deep learning, and building intelligent solutions that solve real-world problems.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="flex gap-4 flex-wrap"
            >
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="px-8 py-3 bg-primary text-primary-foreground font-display text-xs tracking-[0.2em] hover:shadow-[0_0_30px_hsl(300_100%_50%/0.5)] transition-all duration-300 cursor-none"
              >
                GET IN TOUCH
              </button>
              <button
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                className="px-8 py-3 border border-secondary text-secondary font-display text-xs tracking-[0.2em] hover:bg-secondary hover:text-secondary-foreground transition-all duration-300 cursor-none"
              >
                VIEW MY WORK
              </button>
              <a
                href="/resume.pdf"
                download="Chandra_Mouli_Resume.pdf"
                className="px-8 py-3 border border-primary text-primary font-display text-xs tracking-[0.2em] hover:bg-primary hover:text-primary-foreground transition-all duration-300 cursor-none flex items-center gap-2"
              >
                <Download size={16} />
                DOWNLOAD RESUME
              </a>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="hidden lg:flex justify-end"
          >
            <Terminal />
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground">SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-[1px] h-8 bg-primary/50"
        />
      </motion.div>
    </section>
  );
};

export default Hero;
