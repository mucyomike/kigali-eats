import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "", phone: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    try {
      const user = await register(formData.name, formData.email, formData.password, formData.phone);
      toast.success(`Welcome to KigaliEats, ${user.name}!`);
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = { width: "100%", padding: "0.75rem 1rem", borderRadius: "8px", border: "1px solid #DDD", fontSize: "1rem", outline: "none", boxSizing: "border-box" };

  return (
    <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#FFF8F0", padding: "2rem" }}>
      <div style={{ background: "#FFFFFF", borderRadius: "16px", padding: "2.5rem", width: "100%", maxWidth: "420px", boxShadow: "0 4px 24px rgba(0,0,0,0.1)" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1 style={{ color: "#FF6B35", fontSize: "1.8rem", fontWeight: 700 }}>KigaliEats</h1>
          <h2 style={{ fontSize: "1.4rem", marginTop: "0.5rem" }}>Create Account</h2>
          <p style={{ color: "#666", marginTop: "0.5rem" }}>Join thousands of food lovers</p>
        </div>
        <form onSubmit={handleSubmit}>
          {[
            { label: "Full Name", name: "name", type: "text", placeholder: "John Doe" },
            { label: "Email", name: "email", type: "email", placeholder: "you@example.com" },
            { label: "Phone (optional)", name: "phone", type: "tel", placeholder: "+250 788 000 000" },
            { label: "Password", name: "password", type: "password", placeholder: "Min. 6 characters" },
          ].map((field) => (
            <div key={field.name} style={{ marginBottom: "1.2rem" }}>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>{field.label}</label>
              <input
                type={field.type} name={field.name}
                required={field.name !== "phone"}
                value={formData[field.name]} onChange={handleChange}
                placeholder={field.placeholder} style={inputStyle}
              />
            </div>
          ))}
          <button
            type="submit" disabled={loading}
            style={{ width: "100%", background: "#FF6B35", color: "#FFFFFF", padding: "0.85rem", borderRadius: "8px", fontWeight: 600, fontSize: "1rem", border: "none", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, marginTop: "0.5rem" }}
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>
        <p style={{ textAlign: "center", marginTop: "1.5rem", color: "#666" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#FF6B35", fontWeight: 600 }}>Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;