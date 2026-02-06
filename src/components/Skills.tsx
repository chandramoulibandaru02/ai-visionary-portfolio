import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skills = [
  { name: "Artificial Intelligence", level: 90 },
  { name: "Machine Learning", level: 92 },
  { name: "Deep Learning", level: 88 },
  { name: "Computer Vision", level: 85 },
  { name: "Python", level: 95 },
  { name: "TensorFlow / Keras", level: 88 },
  { name: "OpenCV", level: 82 },
  { name: "Scikit-learn", level: 90 },
  { name: "Pandas / NumPy", level: 93 },
  { name: "Flask / FastAPI", level: 78 },
  { name: "SQL", level: 80 },
  { name: "MLOps", level: 70 },
];

const Skills = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-32 relative">
      <div className="max-w-5xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="font-display text-xs tracking-[0.3em] text-primary mb-4 neon-text">02 — SKILLS</p>
          <div className="gradient-line mb-12" />
          <h2 className="text-3xl sm:text-4xl font-bold mb-12">
            Technologies & <span className="text-gradient">Expertise</span>
          </h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ scale: 1.03, borderColor: "hsl(300 100% 50%)" }}
              className="glass-card rounded-lg p-5 cursor-none group transition-colors duration-300"
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {skill.name}
                </span>
                <span className="font-mono text-xs text-muted-foreground">{skill.level}%</span>
              </div>
              <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${skill.level}%` } : {}}
                  transition={{ duration: 1, delay: 0.3 + i * 0.08 }}
                  className="h-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, hsl(300 100% 50%), hsl(180 100% 50%))`,
                    boxShadow: "0 0 8px hsl(300 100% 50% / 0.5)",
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
