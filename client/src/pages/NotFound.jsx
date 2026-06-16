import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={{ minHeight: "80vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#FFF8F0", padding: "2rem", textAlign: "center" }}>
      <img
        src="https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=400&q=80"
        alt="404"
        style={{ width: "250px", borderRadius: "16px", marginBottom: "2rem", opacity: 0.8 }}
      />
      <h1 style={{ fontSize: "6rem", fontWeight: 900, color: "#FF6B35", lineHeight: 1, marginBottom: "0.5rem" }}>404</h1>
      <h2 style={{ fontSize: "1.8rem", fontWeight: 700, marginBottom: "1rem" }}>Page Not Found</h2>
      <p style={{ color: "#666", marginBottom: "2rem", maxWidth: "400px", lineHeight: 1.7 }}>
        Looks like this page went on a food run and never came back! Let's get you back on track.
      </p>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
        <Link
          to="/"
          style={{ background: "#FF6B35", color: "#FFFFFF", padding: "0.85rem 2rem", borderRadius: "999px", textDecoration: "none", fontWeight: 700 }}
        >
          Go Home
        </Link>
        <Link
          to="/menu"
          style={{ background: "#1A1A1A", color: "#FFFFFF", padding: "0.85rem 2rem", borderRadius: "999px", textDecoration: "none", fontWeight: 700 }}
        >
          Browse Menu
        </Link>
      </div>
    </div>
  );
};

export default NotFound;