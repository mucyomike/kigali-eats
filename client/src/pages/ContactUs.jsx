import { useState } from "react";
import { contactsAPI } from "../services/api";
import toast from "react-hot-toast";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await contactsAPI.submit(formData);
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = { width: "100%", padding: "0.75rem 1rem", borderRadius: "8px", border: "1px solid #DDD", fontSize: "1rem", outline: "none", boxSizing: "border-box", background: "#FFFFFF" };

  const contactInfo = [
    { icon: <MapPin size={22} color="#FF6B35" />, title: "Address", value: "KG 123 St, Gasabo, Kigali, Rwanda" },
    { icon: <Phone size={22} color="#FF6B35" />, title: "Phone", value: "+250 788 000 000" },
    { icon: <Mail size={22} color="#FF6B35" />, title: "Email", value: "info@kigalieats.com" },
    { icon: <Clock size={22} color="#FF6B35" />, title: "Hours", value: "Mon - Sun: 8:00 AM – 10:00 PM" },
  ];

  return (
    <div>
      {/* Hero */}
      <section
        style={{
          height: "40vh",
          backgroundImage: "url('https://images.unsplash.com/photo-1423347834838-5162bb452ca4?w=1600&q=80')",
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
          <h1 style={{ fontSize: "2.8rem", fontWeight: 700, marginBottom: "0.75rem" }}>
            Contact <span style={{ color: "#FF6B35" }}>Us</span>
          </h1>
          <p style={{ opacity: 0.9, fontSize: "1.05rem" }}>We'd love to hear from you</p>
        </div>
      </section>

      <section style={{ padding: "4rem 1rem", background: "#FFF8F0" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "3rem", alignItems: "start" }}>

          {/* Contact Info */}
          <div>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1.5rem" }}>Get In Touch</h2>
            <p style={{ color: "#666", lineHeight: 1.8, marginBottom: "2rem" }}>
              Have a question, complaint, or feedback? Our team is always ready to help you. Reach out through any of these channels.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {contactInfo.map((info, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "1rem", background: "#FFFFFF", padding: "1.25rem", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                  <div style={{ flexShrink: 0, marginTop: "2px" }}>{info.icon}</div>
                  <div>
                    <p style={{ margin: 0, fontWeight: 600, marginBottom: "0.25rem" }}>{info.title}</p>
                    <p style={{ margin: 0, color: "#666", fontSize: "0.95rem" }}>{info.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div style={{ background: "#FFFFFF", borderRadius: "16px", padding: "2rem", boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1.5rem" }}>Send a Message</h2>
            <form onSubmit={handleSubmit}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                <div>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500, fontSize: "0.9rem" }}>Full Name</label>
                  <input name="name" required value={formData.name} onChange={handleChange} placeholder="John Doe" style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500, fontSize: "0.9rem" }}>Email</label>
                  <input name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="you@example.com" style={inputStyle} />
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                <div>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500, fontSize: "0.9rem" }}>Phone (optional)</label>
                  <input name="phone" value={formData.phone} onChange={handleChange} placeholder="+250 788 000 000" style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500, fontSize: "0.9rem" }}>Subject</label>
                  <input name="subject" required value={formData.subject} onChange={handleChange} placeholder="Order issue, feedback..." style={inputStyle} />
                </div>
              </div>
              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500, fontSize: "0.9rem" }}>Message</label>
                <textarea name="message" required value={formData.message} onChange={handleChange} placeholder="Tell us how we can help..." rows={5} style={{ ...inputStyle, resize: "vertical" }} />
              </div>
              <button
                type="submit" disabled={loading}
                style={{ width: "100%", background: "#FF6B35", color: "#FFFFFF", padding: "0.85rem", borderRadius: "10px", fontWeight: 700, fontSize: "1rem", border: "none", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}
              >
                <Send size={18} /> {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;