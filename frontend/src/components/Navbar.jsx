import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.jpg';

const navLinks = ['Menu', 'Story', 'Prebook', 'Contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
    >
      <div className="navbar__brand" onClick={() => scrollTo('hero')}>
        <img src={logo} alt="Dukkan Burger Logo" className="navbar__logo" />
        <div className="navbar__title">
          <span className="navbar__name">DUKKAN</span>
          <span className="navbar__sub">BURGER</span>
        </div>
      </div>

      <div className="navbar__links">
        {navLinks.map((link) => (
          <button
            key={link}
            className="navbar__link"
            onMouseEnter={() => setHoveredLink(link)}
            onMouseLeave={() => setHoveredLink(null)}
            onClick={() => scrollTo(link)}
          >
            <AnimatePresence>
              {hoveredLink === link && (
                <motion.span
                  className="navbar__burger-icon"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  🍔
                </motion.span>
              )}
            </AnimatePresence>
            {link}
          </button>
        ))}
        <button className="navbar__cta" onClick={() => scrollTo('prebook')}>
          Prebook Now
        </button>
      </div>

      <button className="navbar__hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <span /><span /><span />
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="navbar__mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            {navLinks.map((link) => (
              <button key={link} className="navbar__mobile-link" onClick={() => scrollTo(link)}>
                🍔 {link}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
