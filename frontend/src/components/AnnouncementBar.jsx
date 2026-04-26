import { motion } from 'framer-motion';

export default function AnnouncementBar() {
  return (
    <div className="announcement-bar">
      <motion.div 
        className="announcement-bar__content"
        animate={{ x: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        ✨ Trivandrum's First Live Burger Experience 🍔
      </motion.div>
    </div>
  );
}
