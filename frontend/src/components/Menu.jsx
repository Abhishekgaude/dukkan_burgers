import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

export const MENU_ITEMS = [
  {
    id: 1,
    name: 'The Classic Dukkan',
    ingredients: 'Beef Patty · Cheddar · Lettuce · Tomato · Special Sauce',
    price: '₹199',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop',
    tag: 'Bestseller',
    tagColor: '#E63946',
  },
  {
    id: 2,
    name: 'Double Smash',
    ingredients: 'Double Beef · Double Cheese · Caramelized Onion · Pickles',
    price: '₹279',
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600&auto=format&fit=crop',
    tag: 'New',
    tagColor: '#2D6A4F',
  },
  {
    id: 3,
    name: 'Crispy Chicken Stack',
    ingredients: 'Crispy Chicken · Sriracha Mayo · Coleslaw · Jalapeños',
    price: '₹229',
    image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=600&auto=format&fit=crop',
    tag: 'Spicy 🌶',
    tagColor: '#F4B942',
  },
  {
    id: 4,
    name: 'Garden Goddess',
    ingredients: 'Veg Patty · Hummus · Avocado · Roasted Peppers · Feta',
    price: '₹189',
    image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=600&auto=format&fit=crop',
    tag: 'Veg 🌿',
    tagColor: '#2D6A4F',
  },
  {
    id: 5,
    name: 'BBQ Bacon King',
    ingredients: 'Beef · Bacon · BBQ · Fried Onion Rings · Aged Cheddar',
    price: '₹319',
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600&auto=format&fit=crop',
    tag: 'Premium',
    tagColor: '#8B4513',
  },
  {
    id: 6,
    name: 'Desi Masala Burger',
    ingredients: 'Spiced Aloo Tikki · Mint Chutney · Onion · Masala Sauce',
    price: '₹159',
    image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=600&auto=format&fit=crop',
    tag: 'Desi Fav',
    tagColor: '#E63946',
  },
];

function BurgerCard({ item, onSelect, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      className="burger-card"
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* TOP BUN */}
      <motion.div
        className="burger-card__bun burger-card__bun--top"
        animate={{ y: hovered ? -10 : 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        <span className="burger-card__tag" style={{ background: item.tagColor }}>{item.tag}</span>
        <div className="burger-card__img-wrap">
          <img src={item.image} alt={item.name} className="burger-card__img" />
        </div>
      </motion.div>

      {/* MIDDLE LAYER */}
      <motion.div
        className="burger-card__filling"
        animate={{ y: hovered ? 4 : 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        <h3 className="burger-card__name">{item.name}</h3>
        <p className="burger-card__ingredients">{item.ingredients}</p>
      </motion.div>

      {/* BOTTOM BUN */}
      <motion.div
        className="burger-card__bun burger-card__bun--bottom"
        animate={{ y: hovered ? 10 : 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        <span className="burger-card__price">{item.price}</span>
        <motion.button
          className="btn btn--primary btn--sm"
          onClick={() => onSelect(item)}
          whileTap={{ scale: 0.92 }}
        >
          Prebook 🍔
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default function Menu({ onSelect }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="menu" className="menu">
      <motion.div
        ref={ref}
        className="section-header"
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <div className="section-label">Our Menu</div>
        <h2 className="section-title">
          Choose Your <span className="accent">Masterpiece</span>
        </h2>
        <p className="section-subtitle">Every layer tells a story. Hover to feel it.</p>
      </motion.div>

      <div className="menu__grid">
        {MENU_ITEMS.map((item, i) => (
          <BurgerCard key={item.id} item={item} onSelect={onSelect} index={i} />
        ))}
      </div>
    </section>
  );
}
