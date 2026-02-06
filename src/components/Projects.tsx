import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const projects = [
  {
    title: "Temperature Prediction using LSTM",
    description: "Built an LSTM-based temperature prediction system that forecasts the next 4 hours for any selected location with interactive map visualization.",
    tech: ["Python", "TensorFlow", "LSTM", "Flask", "Leaflet.js"],
    color: "primary",
  },
  {
    title: "Plant Disease Detection",
    description: "Developed a CNN-based model to detect plant diseases from leaf images with high accuracy. Built a web interface for instant disease prediction.",
    tech: ["Python", "CNN", "TensorFlow", "OpenCV", "Flask"],
    color: "secondary",
  },
  {
    title: "Water Well Prediction",
    description: "Machine learning model to predict the functionality of water wells. Performed data preprocessing, feature engineering, and model training for real-world reliability.",
    tech: ["Python", "Scikit-learn", "Pandas", "NumPy", "Matplotlib"],
    color: "primary",
  },
  {
    title: "Face Mask Detection",
    description: "CNN and OpenCV-based model to detect whether a person is wearing a face mask in real time via live video streams.",
    tech: ["Python", "CNN", "OpenCV", "NumPy", "ANN"],
    color: "secondary",
  },
];

const Projects = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [hovered, setHovered] = useState<number | null>(null);

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
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              whileHover={{ y: -5 }}
              className={`glass-card rounded-xl p-8 cursor-none transition-all duration-500 ${
                hovered === i
                  ? project.color === "primary"
                    ? "neon-border"
                    : "cyan-border"
                  : ""
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
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
              <h3 className="text-xl font-bold mb-3 text-foreground">{project.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[10px] tracking-wider px-3 py-1 rounded-full border border-border text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
