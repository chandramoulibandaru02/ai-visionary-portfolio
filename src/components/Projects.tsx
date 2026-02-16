import { motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { useRef, useState, MouseEvent } from "react";

const projects = [
  {
    title: "Temperature Prediction using LSTM",
    description: "Built an LSTM-based temperature prediction system that forecasts the next 4 hours for any selected location with interactive map visualization.",
    tech: ["Python", "TensorFlow", "LSTM", "Flask", "Leaflet.js"],
    color: "primary",
    demo: "https://chandramoulibandaru02.github.io/Temperature_prediction_using_LSTM/",
  },
  {
    title: "Plant Disease Detection",
    description: "Developed a CNN-based model to detect plant diseases from leaf images with high accuracy. Built a web interface for instant disease prediction.",
    tech: ["Python", "CNN", "TensorFlow", "OpenCV", "Flask"],
    color: "secondary",
    demo: "https://github.com/chandramouli/plant-disease-detection",
  },
  {
    title: "Multi-Language Translation using LLM",
    description: "Built an AI-powered multilingual translation system using Large Language Models (LLMs). Implemented prompt engineering, API integration, and dynamic language handling to translate text across multiple languages with high accuracy.",
    tech: ["Python", "OpenAI API", "LangChain", "Streamlit", "Prompt Engineering"],
    color: "primary",
    demo: "https://multi-language-translation-by-chandra-mouli-bandaru.streamlit.app",
  },
  {
    title: "Multiple PDF Explainer using RAG",
    description: "Developed a Retrieval-Augmented Generation (RAG) system to analyze and explain content from multiple PDF documents. Implemented PDF ingestion, semantic search, vector indexing, and natural language QA to deliver concise explanations from large datasets.",
    tech: ["Python", "LangChain", "OpenAI API", "FAISS", "PDF Parsing"],
    color: "secondary",
    demo: "https://multiple-pdf-explainer-using-rag-by-chandramouli-bandaru.streamlit.app/",
  },
];

const ProjectCard = ({ project, i, inView }: { project: typeof projects[0]; i: number; inView: boolean }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-150, 150], [8, -8]);
  const rotateY = useTransform(mouseX, [-150, 150], [-8, 8]);
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: i * 0.15 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      className="relative cursor-none group"
    >
      {/* Glow behind card */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.8 }}
        transition={{ duration: 0.3 }}
        className="absolute -inset-1 rounded-xl blur-xl"
        style={{
          background: project.color === "primary"
            ? "hsl(300 100% 50% / 0.15)"
            : "hsl(180 100% 50% / 0.15)",
        }}
      />

      <div
        className={`relative glass-card rounded-xl p-8 transition-all duration-500 overflow-hidden ${
          hovered
            ? project.color === "primary"
              ? "neon-border"
              : "cyan-border"
            : ""
        }`}
        style={{ transform: "translateZ(20px)" }}
      >
        {/* Animated gradient overlay on hover */}
        <motion.div
          animate={{ opacity: hovered ? 0.05 : 0 }}
          className="absolute inset-0 rounded-xl"
          style={{
            background: project.color === "primary"
              ? "radial-gradient(circle at 50% 50%, hsl(300 100% 50%), transparent 70%)"
              : "radial-gradient(circle at 50% 50%, hsl(180 100% 50%), transparent 70%)",
          }}
        />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ scale: hovered ? [1, 1.4, 1] : 1 }}
                transition={{ duration: 0.6, repeat: hovered ? Infinity : 0, repeatDelay: 1 }}
                className={`w-2 h-2 rounded-full ${
                  project.color === "primary" ? "bg-primary" : "bg-secondary"
                }`}
                style={{
                  boxShadow:
                    project.color === "primary"
                      ? "0 0 8px hsl(300 100% 50%)"
                      : "0 0 8px hsl(180 100% 50%)",
                }}
              />
              <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
            </div>
            <motion.a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`font-display text-[10px] tracking-[0.15em] px-4 py-1.5 rounded-full border cursor-none transition-all duration-300 ${
                project.color === "primary"
                  ? "border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground"
                  : "border-secondary/40 text-secondary hover:bg-secondary hover:text-secondary-foreground"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              LIVE DEMO →
            </motion.a>
          </div>

          <motion.h3
            animate={{ x: hovered ? 4 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-xl font-bold mb-3 text-foreground"
          >
            {project.title}
          </motion.h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-6">{project.description}</p>

          <div className="flex flex-wrap gap-2">
            {project.tech.map((t, idx) => (
              <motion.span
                key={t}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.15 + idx * 0.05 + 0.3 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className={`font-mono text-[10px] tracking-wider px-3 py-1 rounded-full border cursor-none transition-colors duration-200 ${
                  project.color === "primary"
                    ? "border-primary/20 text-muted-foreground hover:border-primary/60 hover:text-primary"
                    : "border-secondary/20 text-muted-foreground hover:border-secondary/60 hover:text-secondary"
                }`}
              >
                {t}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-32 relative grid-bg-dense">
      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="font-display text-xs tracking-[0.3em] text-primary mb-4 neon-text">03 — PROJECTS</p>
          <div className="gradient-line mb-12" />
          <h2 className="text-3xl sm:text-4xl font-bold mb-12">
            Featured <span className="text-gradient">Work</span>
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} i={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
