import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const timeline = [
  {
    period: "April 2025 — June 2025",
    title: "Machine Learning Intern",
    org: "FeyNN Labs Consultancy Services — Remote",
    description: "Developed ML models for predictive analysis and automation. Worked with large datasets, performing data cleaning, feature engineering, and model tuning.",
  },
  {
    period: "Sept 2023 — Present",
    title: "B.Tech in Computer Science (AI & ML)",
    org: "Vellore Institute of Technology, AP",
    description: "Pursuing specialization in Artificial Intelligence and Machine Learning. GPA: 8.61/10.00",
  },
  {
    period: "Sept 2021 — April 2023",
    title: "Higher Secondary Education (MPC)",
    org: "Sri Viswa Junior College, Visakhapatnam",
    description: "Mathematics, Physics & Chemistry. Percentage: 94.7%",
  },
];

const Experience = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-32 relative">
      <div className="max-w-4xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="font-display text-xs tracking-[0.3em] text-primary mb-4 neon-text">04 — JOURNEY</p>
          <div className="gradient-line mb-12" />
          <h2 className="text-3xl sm:text-4xl font-bold mb-16">
            Experience & <span className="text-gradient">Education</span>
          </h2>
        </motion.div>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[19px] top-0 bottom-0 w-[2px]" style={{ background: "linear-gradient(180deg, hsl(300 100% 50%), hsl(180 100% 50%), transparent)" }} />

          <div className="space-y-12">
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="flex gap-6"
              >
                <div className="relative flex-shrink-0">
                  <div
                    className="w-10 h-10 rounded-full border-2 border-primary bg-background flex items-center justify-center animate-pulse-glow"
                  >
                    <div className="w-3 h-3 rounded-full bg-primary" />
                  </div>
                </div>
                <div className="glass-card rounded-lg p-6 flex-1">
                  <span className="font-mono text-xs text-secondary cyan-text">{item.period}</span>
                  <h3 className="text-lg font-bold mt-2 text-foreground">{item.title}</h3>
                  <p className="text-sm text-primary font-display tracking-wider mt-1">{item.org}</p>
                  <p className="text-muted-foreground text-sm mt-3 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
