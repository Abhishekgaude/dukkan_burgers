import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TodayBoard({ refreshTrigger }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/bookings/today/');
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      console.error('Error fetching today\'s bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
    // Refresh every 30 seconds for live feel
    const interval = setInterval(fetchBookings, 30000);
    return () => clearInterval(interval);
  }, [refreshTrigger]);

  return (
    <div className="today-board">
      <div className="today-board__header">
        <h3>Today's Orders 🍔</h3>
        <p>Real-time queue for tonight's batch</p>
      </div>

      <div className="today-board__grid">
        {loading ? (
          <p className="loading">Loading bookings...</p>
        ) : bookings.length === 0 ? (
          <div className="today-board__empty">
            <p>No reservations yet for today. Be the first!</p>
          </div>
        ) : (
          <AnimatePresence>
            {bookings.map((booking, index) => (
              <motion.div
                key={booking.id}
                className={`today-board__card ${index === 0 && refreshTrigger > 0 ? 'today-board__card--new' : ''}`}
                initial={{ opacity: 0, x: -20, scale: index === 0 ? 1.05 : 1 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="today-board__info">
                  <div className="today-board__name-wrap">
                    <strong>{booking.customer_name}</strong>
                    {index === 0 && refreshTrigger > 0 && <span className="badge--new">JUST NOW</span>}
                  </div>
                  <span>{booking.menu_item_name}</span>
                </div>
                <div className="today-board__status">In Queue ⏳</div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
