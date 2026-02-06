import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const Contact = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `mailto:chandramouli022005@gmail.com?subject=Portfolio Contact from ${form.name}&body=${form.message}`;
  };

  return (
    <section id="contact" className="py-32 relative grid-bg-dense">
      <div className="max-w-4xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="font-display text-xs tracking-[0.3em] text-primary mb-4 neon-text">05 — CONTACT</p>
          <div className="gradient-line mb-12" />
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-12">
            Have a project in mind or want to collaborate? Let's talk.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="glass-card rounded-xl p-8 space-y-6"
        >
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="font-display text-xs tracking-[0.15em] text-muted-foreground mb-2 block">NAME</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-muted border border-border rounded-lg px-4 py-3 text-foreground text-sm focus:border-primary focus:outline-none transition-colors cursor-none"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="font-display text-xs tracking-[0.15em] text-muted-foreground mb-2 block">EMAIL</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-muted border border-border rounded-lg px-4 py-3 text-foreground text-sm focus:border-primary focus:outline-none transition-colors cursor-none"
                placeholder="your@email.com"
              />
            </div>
          </div>
          <div>
            <label className="font-display text-xs tracking-[0.15em] text-muted-foreground mb-2 block">MESSAGE</label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={5}
              className="w-full bg-muted border border-border rounded-lg px-4 py-3 text-foreground text-sm focus:border-primary focus:outline-none transition-colors resize-none cursor-none"
              placeholder="Tell me about your project..."
            />
          </div>
          <button
            type="submit"
            className="px-10 py-3 bg-primary text-primary-foreground font-display text-xs tracking-[0.2em] hover:shadow-[0_0_30px_hsl(300_100%_50%/0.5)] transition-all duration-300 cursor-none"
          >
            SEND MESSAGE
          </button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-12 flex justify-center gap-8"
        >
          {[
            { name: "LinkedIn", url: "https://linkedin.com" },
            { name: "GitHub", url: "https://github.com" },
            { name: "Email", url: "mailto:chandramouli022005@gmail.com" },
          ].map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-display text-xs tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors cursor-none"
            >
              {link.name}
            </a>
          ))}
        </motion.div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-border text-center">
          <p className="font-mono text-xs text-muted-foreground">
            © 2025 Bandaru Chandra Mouli. Crafted with passion & code.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
