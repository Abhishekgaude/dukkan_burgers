import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { MENU_ITEMS } from './Menu';
import TodayBoard from './TodayBoard';

const TIME_SLOTS = ['12:00 PM', '1:00 PM', '2:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'];

const STEPS = ['Choose Burger', 'Confirm Details'];

export default function Prebook({ selectedItem, setSelectedItem }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: '', phone: '', notes: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const chosenBurger = selectedItem || MENU_ITEMS[0];

  const handleSubmit = async () => {
    if (!form.name || !form.phone) {
      setError('Please fill in your name and phone number.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const res = await fetch('http://127.0.0.1:8000/api/bookings/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: form.name,
          customer_phone: form.phone,
          menu_item: chosenBurger.id,
          time_slot: '17:00',
          notes: form.notes,
        }),
      });
      if (!res.ok) {
        const errData = await res.json();
        setError('Booking failed: ' + JSON.stringify(errData));
        return;
      }
      setSubmitted(true);
      setRefreshTrigger(prev => prev + 1);
      setTimeout(() => {
        document.querySelector('.today-board')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 1500);
    } catch (e) {
      setError('Could not connect to server. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setSubmitted(false);
    setStep(0);
    setForm({ name: '', phone: '', date: '', slot: '', notes: '' });
    setSelectedItem(null);
  };

  return (
    <section id="prebook" className="prebook" ref={ref}>
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <div className="section-label">Reserve a Bite</div>
        <h2 className="section-title">
          Prebook Your <span className="accent">Order</span>
        </h2>
        <p className="section-subtitle">Skip the wait. Secure your burger before it's gone.</p>
      </motion.div>

      <motion.div
        className="prebook__box"
        initial={{ opacity: 0, y: 60 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              className="prebook__success"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              <motion.div
                className="prebook__success-burger"
                animate={{ y: [0, -30, 80] }}
                transition={{ duration: 1.2, delay: 0.3, ease: 'easeIn' }}
              >
                🍔
              </motion.div>
              <motion.div
                className="prebook__success-box"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.2, type: 'spring' }}
              >
                📦
              </motion.div>
              <h3>Order Placed, {form.name}!</h3>
              <p>Your <strong>{chosenBurger.name}</strong> is in the queue for tonight (Starts 5 PM).</p>
              <p className="prebook__success-note">See your name on the live board below! We'll call on {form.phone} if needed. 🎉</p>
              <button className="btn btn--outline" onClick={reset}>Book Another</button>
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* Step Progress */}
              <div className="prebook__steps">
                {STEPS.map((s, i) => (
                  <div key={s} className={`prebook__step ${i <= step ? 'active' : ''}`}>
                    <div className="prebook__step-dot">{i < step ? '✓' : i + 1}</div>
                    <span>{s}</span>
                  </div>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {/* STEP 0: Choose Burger */}
                {step === 0 && (
                  <motion.div
                    key="step0"
                    className="prebook__step-content"
                    initial={{ x: 60, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -60, opacity: 0 }}
                  >
                    <p className="prebook__label">Which burger calls you?</p>
                    <div className="prebook__burger-grid">
                      {MENU_ITEMS.map((item) => (
                        <motion.div
                          key={item.id}
                          className={`prebook__burger-option ${chosenBurger.id === item.id ? 'selected' : ''}`}
                          onClick={() => setSelectedItem(item)}
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          <img src={item.image} alt={item.name} />
                          <span>{item.name}</span>
                          <strong>{item.price}</strong>
                        </motion.div>
                      ))}
                    </div>
                    <button className="btn btn--primary" onClick={() => setStep(1)} style={{ marginTop: '1.5rem' }}>
                      Next →
                    </button>
                  </motion.div>
                )}

                {/* STEP 1: Confirm */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    className="prebook__step-content"
                    initial={{ x: 60, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -60, opacity: 0 }}
                  >
                    <p className="prebook__label">Your details</p>
                    <div className="prebook__fields">
                      <div className="prebook__field">
                        <label>Your Name *</label>
                        <input
                          type="text"
                          placeholder="e.g. Ravi Kumar"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                        />
                      </div>
                      <div className="prebook__field">
                        <label>Phone Number *</label>
                        <input
                          type="tel"
                          placeholder="e.g. 9876543210"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        />
                      </div>
                      <div className="prebook__field" style={{ gridColumn: '1 / -1' }}>
                        <label>Special Notes (optional)</label>
                        <textarea
                          placeholder="Any special requests?"
                          rows={2}
                          value={form.notes}
                          onChange={(e) => setForm({ ...form, notes: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="prebook__summary">
                      <span>🍔 {chosenBurger.name}</span>
                      <span>🕔 Tonight's Batch (From 5:00 PM)</span>
                      <span>💰 {chosenBurger.price}</span>
                    </div>

                    {error && <p className="prebook__error">{error}</p>}

                    <div className="prebook__nav">
                      <button className="btn btn--outline" onClick={() => setStep(0)}>← Back</button>
                      <motion.button
                        className="btn btn--primary"
                        onClick={handleSubmit}
                        disabled={loading}
                        whileTap={{ scale: 0.95 }}
                      >
                        {loading ? 'Booking...' : 'Confirm Booking 🎉'}
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <TodayBoard refreshTrigger={refreshTrigger} />
    </section>
  );
}
