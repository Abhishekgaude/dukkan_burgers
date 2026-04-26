import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const LEAVES = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  delay: Math.random() * 4,
  duration: 6 + Math.random() * 4,
  size: 18 + Math.random() * 24,
}));

export default function Hero({ onPrebook }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="hero" ref={ref} className="hero">
      {/* Animated background leaves */}
      <div className="hero__leaves">
        {LEAVES.map((leaf) => (
          <motion.span
            key={leaf.id}
            className="hero__leaf"
            style={{ left: `${leaf.x}%`, fontSize: leaf.size }}
            animate={{ y: [0, -20, 0], rotate: [0, 15, -15, 0] }}
            transition={{ duration: leaf.duration, delay: leaf.delay, repeat: Infinity, ease: 'easeInOut' }}
          >
            🌿
          </motion.span>
        ))}
      </div>

      {/* Scroll indicator burger */}
      <motion.div
        className="hero__scroll-indicator"
        animate={{ y: [0, 16, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        🍔
      </motion.div>

      <motion.div className="hero__content" style={{ y, opacity }}>
        <motion.p
          className="hero__eyebrow"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Est. 2025 · Made with Love
        </motion.p>

        <motion.h1
          className="hero__heading"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
        >
          Handmade Burgers.
          <br />
          <span className="hero__heading--accent">Heartmade Story.</span>
        </motion.h1>

        <motion.p
          className="hero__sub"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
        >
          Fresh-grilled, soul-seasoned, and crafted from scratch every single day.
          <br />
          Not just a burger — an experience.
        </motion.p>

        <motion.div
          className="hero__actions"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
        >
          <motion.button
            className="btn btn--primary"
            onClick={onPrebook}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.93 }}
          >
            Prebook Your Bite 🍔
          </motion.button>
          <motion.button
            className="btn btn--outline"
            onClick={() => document.getElementById('menu').scrollIntoView({ behavior: 'smooth' })}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            See the Menu
          </motion.button>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero__image-wrap"
        initial={{ opacity: 0, scale: 0.85, x: 80 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 1.1, delay: 0.5, type: 'spring', stiffness: 60 }}
        style={{ y }}
      >
        <img
          src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=900&auto=format&fit=crop"
          alt="Signature Dukkan Burger"
          className="hero__burger-img"
        />
        <div className="hero__glow" />
      </motion.div>
    </section>
  );
}
