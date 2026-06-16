import { Link } from "react-router-dom";
import { Heart, Clock, Star, Users } from "lucide-react";

const AboutUs = () => {
  const team = [
    { name: "Amara Nkusi", role: "Head Chef", image: "https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=300&q=80" },
    { name: "David Mugisha", role: "Delivery Manager", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80" },
    { name: "Grace Uwimana", role: "Customer Experience", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80" },
  ];

  const values = [
    { icon: <Heart size={32} color="#FF6B35" />, title: "Made with Love", desc: "Every dish is prepared with passion and the finest local ingredients." },
    { icon: <Clock size={32} color="#FF6B35" />, title: "Fast Delivery", desc: "We guarantee delivery within 30 minutes or your next order is free." },
    { icon: <Star size={32} color="#FF6B35" />, title: "Quality First", desc: "We partner only with restaurants that meet our high quality standards." },
    { icon: <Users size={32} color="#FF6B35" />, title: "Community", desc: "Supporting local Rwandan businesses and creating jobs in Kigali." },
  ];

  return (
    <div>
      {/* Hero */}
      <section
        style={{
          height: "50vh",
          backgroundImage: "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.65)" }} />
        <div style={{ position: "relative", zIndex: 10, textAlign: "center", color: "#FFFFFF" }}>
          <h1 style={{ fontSize: "3rem", fontWeight: 700, marginBottom: "1rem" }}>
            About <span style={{ color: "#FF6B35" }}>KigaliEats</span>
          </h1>
          <p style={{ fontSize: "1.1rem", opacity: 0.9, maxWidth: "500px", margin: "0 auto" }}>
            Bringing the best of Kigali's food scene to your doorstep since 2024
          </p>
        </div>
      </section>

      {/* Story */}
      <section style={{ padding: "4rem 1rem", background: "#FFF8F0" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "center" }}>
          <div>
            <h2 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "1rem" }}>Our Story</h2>
            <p style={{ color: "#555", lineHeight: 1.8, marginBottom: "1rem" }}>
              KigaliEats was born from a simple idea — make it easy for everyone in Kigali to enjoy great food without leaving their home or office.
            </p>
            <p style={{ color: "#555", lineHeight: 1.8, marginBottom: "1rem" }}>
              Founded in 2024, we started with just 5 restaurants and a passion for great food. Today we serve hundreds of customers daily, offering everything from traditional Rwandan dishes like Isombe and Brochettes to international favorites like burgers and pizza.
            </p>
            <p style={{ color: "#555", lineHeight: 1.8 }}>
              We are proud to support local Rwandan businesses and bring the diverse flavors of Kigali's food scene to your doorstep — fast, fresh, and affordable.
            </p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&q=80"
            alt="Our story"
            style={{ width: "100%", borderRadius: "16px", boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
          />
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: "4rem 1rem", background: "#FFFFFF" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: 700, textAlign: "center", marginBottom: "3rem" }}>Our Values</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "2rem" }}>
            {values.map((val, idx) => (
              <div key={idx} style={{ textAlign: "center", padding: "2rem 1.5rem", borderRadius: "16px", background: "#FFF8F0", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                <div style={{ marginBottom: "1rem" }}>{val.icon}</div>
                <h3 style={{ fontWeight: 700, marginBottom: "0.75rem" }}>{val.title}</h3>
                <p style={{ color: "#666", lineHeight: 1.7, fontSize: "0.95rem" }}>{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: "4rem 1rem", background: "#FFF8F0" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: 700, textAlign: "center", marginBottom: "3rem" }}>Meet The Team</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "2rem" }}>
            {team.map((member, idx) => (
              <div key={idx} style={{ textAlign: "center", background: "#FFFFFF", borderRadius: "16px", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                <img src={member.image} alt={member.name} style={{ width: "100%", height: "220px", objectFit: "cover" }} />
                <div style={{ padding: "1.25rem" }}>
                  <h3 style={{ fontWeight: 700, marginBottom: "0.25rem" }}>{member.name}</h3>
                  <p style={{ color: "#FF6B35", fontWeight: 500, margin: 0 }}>{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#1A1A1A", padding: "3rem 1rem", textAlign: "center", color: "#FFFFFF" }}>
        <h2 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "1rem" }}>Ready to taste the difference?</h2>
        <p style={{ color: "#AAAAAA", marginBottom: "2rem" }}>Join thousands of happy customers in Kigali</p>
        <Link to="/menu" style={{ background: "#FF6B35", color: "#FFFFFF", padding: "0.85rem 2.5rem", borderRadius: "999px", textDecoration: "none", fontWeight: 700, fontSize: "1.05rem" }}>
          Order Now
        </Link>
      </section>
    </div>
  );
};

export default AboutUs;