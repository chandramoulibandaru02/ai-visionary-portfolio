import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, MessageCircle, MapPin, Send, Github, Instagram, Linkedin, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }

    setSending(true);
    try {
      const { data, error } = await supabase.functions.invoke("send-contact-email", {
        body: { name: form.name, email: form.email, message: form.message },
      });

      if (error) throw error;

      toast({ title: "Message sent successfully!", description: "I'll get back to you soon." });
      setForm({ name: "", email: "", message: "" });
    } catch (err: any) {
      console.error("Contact form error:", err);
      toast({ title: "Failed to send message", description: "Please try again or reach out via email directly.", variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "chandramouli022005@gmail.com",
      href: "mailto:chandramouli022005@gmail.com",
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "+91 9390396056",
      href: "https://wa.me/919390396056",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Vishakapatnam, Andhra Pradesh, India",
      href: null,
    },
  ];

  const socials = [
    { icon: Github, url: "https://github.com/chandramoulibandaru02", label: "GitHub" },
    { icon: Instagram, url: "https://www.instagram.com/chandra_o_o/", label: "Instagram" },
    { icon: Linkedin, url: "https://www.linkedin.com/in/bandaru-chandra-mouli-772b3129b/", label: "LinkedIn" },
    { icon: Mail, url: "mailto:chandramouli022005@gmail.com", label: "Email" },
    { icon: MessageCircle, url: "https://wa.me/919390396056", label: "WhatsApp" },
  ];

  return (
    <section id="contact" className="py-32 relative grid-bg-dense">
      <div className="max-w-6xl mx-auto px-6" ref={ref}>
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
            Whether you have a question, a project idea, or just want to say hi, my inbox is always open. I'll try my best to get back to you!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {contactInfo.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="glass-card rounded-xl p-6 flex items-center gap-4 group hover:border-primary/50 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center text-primary group-hover:bg-primary/10 transition-colors">
                  <item.icon size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground font-display tracking-[0.1em] mb-1">{item.label}</p>
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground hover:text-primary transition-colors text-sm cursor-none"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-foreground text-sm">{item.value}</p>
                  )}
                </div>
                {item.href && (
                  <ExternalLink size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
                )}
              </motion.div>
            ))}

            {/* Find me on */}
            <div className="pt-6">
              <p className="text-muted-foreground text-sm mb-4">Find me on</p>
              <div className="flex gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300 cursor-none"
                    aria-label={s.label}
                  >
                    <s.icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.form
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label className="font-display text-xs tracking-[0.15em] text-muted-foreground mb-2 block">Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                maxLength={100}
                className="w-full bg-muted border border-border rounded-lg px-4 py-3 text-foreground text-sm focus:border-primary focus:outline-none transition-colors cursor-none"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="font-display text-xs tracking-[0.15em] text-muted-foreground mb-2 block">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                maxLength={255}
                className="w-full bg-muted border border-border rounded-lg px-4 py-3 text-foreground text-sm focus:border-primary focus:outline-none transition-colors cursor-none"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="font-display text-xs tracking-[0.15em] text-muted-foreground mb-2 block">Message</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={5}
                maxLength={2000}
                className="w-full bg-muted border border-border rounded-lg px-4 py-3 text-foreground text-sm focus:border-primary focus:outline-none transition-colors resize-none cursor-none"
                placeholder="Tell me about your project..."
              />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="w-full py-4 bg-primary text-primary-foreground font-display text-sm tracking-[0.15em] rounded-lg hover:shadow-[0_0_30px_hsl(300_100%_50%/0.3)] transition-all duration-300 cursor-none flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {sending ? "Sending..." : "Send Message"}
              <Send size={18} />
            </button>
          </motion.form>
        </div>

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
