import logo from '../assets/logo.jpg';

export default function Footer() {
  return (
    <footer id="contact" className="footer">
      <div className="footer__brand">
        <img src={logo} alt="Dukkan Burger" className="footer__logo" />
        <div>
          <div className="footer__name">DUKKAN BURGER</div>
          <div className="footer__tagline">Handmade. Heartmade. Always Fresh.</div>
        </div>
      </div>
      <div className="footer__links">
        <span className="footer__link">📍 Near Museum, Trivandrum, Kerala</span>
        <a href="tel:+919999999999">📞 +91 99999 99999</a>
        <a href="mailto:hello@dukkanburger.in">✉️ hello@dukkanburger.in</a>
        <a href="https://www.instagram.com/devipraseeda.vlogs/" target="_blank" rel="noreferrer">📸 Instagram</a>
        <a href="https://www.youtube.com/@Deviyeeee" target="_blank" rel="noreferrer">🎥 YouTube</a>
      </div>
      <p className="footer__copy">© 2025 Dukkan Burger. Made with ❤️ and mustard.</p>
    </footer>
  );
}
