import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer
      style={{
        background: "#1A1A1A",
        color: "#FFFFFF",
        padding: "2rem 1rem",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: "2rem",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: "#FF6B35",
              }}
            />
            <span style={{ color: "#FF6B35", fontWeight: "bold", fontSize: "1.25rem" }}>
              KigaliEats
            </span>
          </div>
          <p style={{ lineHeight: 1.8, marginBottom: "1rem" }}>
            Delicious food delivered to your door in Kigali
          </p>
          <p style={{ fontSize: "0.9rem", color: "#AAAAAA" }}>
            © 2026 KigaliEats. All rights reserved.
          </p>
        </div>

        <div>
          <h3 style={{ marginBottom: "1rem" }}>Quick Links</h3>
          <nav style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <Link to="/" style={{ color: "#FFFFFF", textDecoration: "none" }}>
              Home
            </Link>
            <Link to="/menu" style={{ color: "#FFFFFF", textDecoration: "none" }}>
              Menu
            </Link>
            <Link to="/about" style={{ color: "#FFFFFF", textDecoration: "none" }}>
              About
            </Link>
            <Link to="/contact" style={{ color: "#FFFFFF", textDecoration: "none" }}>
              Contact
            </Link>
          </nav>
        </div>

        <div>
          <h3 style={{ marginBottom: "1rem" }}>Contact Us</h3>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
            <MapPin size={18} color="#FF6B35" />
            <span>Kigali, Rwanda</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
            <Phone size={18} color="#FF6B35" />
            <span>+250 788 000 000</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
            <Mail size={18} color="#FF6B35" />
            <span>info@kigalieats.com</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <Clock size={18} color="#FF6B35" />
            <span>Mon-Sun: 8:00 AM - 10:00 PM</span>
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: "2rem",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          paddingTop: "1rem",
          textAlign: "center",
          color: "#AAAAAA",
        }}
      >
        Made with ❤️ in Kigali
      </div>

      <style>{`
        @media (max-width: 768px) {
          footer > div:first-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
