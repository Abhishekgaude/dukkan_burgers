import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import logo from '../assets/logo.jpg';

const milestones = [
  { year: '2025', icon: '🏪', text: 'Started our journey near Museum, Trivandrum. Fresh, handmade, and full of heart.' },
  { year: '2025', icon: '🔥', text: 'Rapidly became a local favorite with a growing community of burger lovers.' },
  { year: '2026', icon: '✨', text: 'Ongoing success! Every burger is crafted to be super yummy and tasty.' },
];

function Milestone({ item, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      className="timeline__item"
      initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1 }}
    >
      <div className="timeline__dot">{item.icon}</div>
      <div className="timeline__card">
        <span className="timeline__year">{item.year}</span>
        <p>{item.text}</p>
      </div>
    </motion.div>
  );
}

export default function Story() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="story" className="story">
      <div className="section-label">Her Story</div>

      <div className="story__layout">
        <motion.div
          className="story__image-col"
          ref={ref}
          initial={{ opacity: 0, x: -80 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9 }}
        >
          <div className="story__image-ring">
            <img src={logo} alt="Founder of Dukkan Burger" className="story__founder-img" />
          </div>
          <motion.div
            className="story__quote"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            "From a small kitchen to your cravings…"
          </motion.div>
        </motion.div>

        <div className="story__content">
          <motion.h2
            className="story__heading"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            A story cooked
            <br />
            <span className="accent">with passion.</span>
          </motion.h2>
          <motion.p
            className="story__body"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
          >
            Every burger at Dukkan Burger is a chapter in our journey — starting in 2025 near 
            the Museum in Trivandrum. What began with a passion for quality has 
            grown into a successful ongoing story of serving the yummiest and 
            tastiest handmade burgers in town. No shortcuts, just heart.
          </motion.p>

          <div className="timeline">
            {milestones.map((item, i) => (
              <Milestone key={item.year} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
