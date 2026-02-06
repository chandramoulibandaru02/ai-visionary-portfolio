import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const About = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 relative grid-bg-dense">
      <div className="max-w-4xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="font-display text-xs tracking-[0.3em] text-primary mb-4 neon-text">01 — ABOUT</p>
          <div className="gradient-line mb-12" />
          <h2 className="text-3xl sm:text-4xl font-bold mb-8">
            Building the future with{" "}
            <span className="text-gradient">Artificial Intelligence</span>
          </h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6 text-muted-foreground text-lg leading-relaxed"
        >
          <p>
            I'm Varshith Julakanti, an AI Engineer based in Amaravati, Andhra Pradesh. My journey into the world of artificial intelligence began with a deep curiosity about how machines can learn, adapt, and solve complex real-world problems.
          </p>
          <p>
            I specialize in Machine Learning, Deep Learning, and Computer Vision — crafting models that can predict, classify, and understand data in ways that create tangible impact. From temperature forecasting with LSTMs to disease detection with CNNs, I believe in building AI systems that matter.
          </p>
          <p>
            Currently pursuing Computer Science with AI/ML specialization, I'm constantly pushing the boundaries of what's possible with intelligent systems and automation.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6"
        >
          {[
            { label: "GPA", value: "8.61" },
            { label: "Projects", value: "4+" },
            { label: "Focus Areas", value: "AI/ML" },
            { label: "Location", value: "India" },
          ].map((stat) => (
            <div key={stat.label} className="glass-card rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-primary neon-text">{stat.value}</p>
              <p className="text-xs font-display tracking-[0.15em] text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
