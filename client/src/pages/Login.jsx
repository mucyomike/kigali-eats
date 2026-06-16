import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await login(formData.email, formData.password);
      toast.success(`Welcome back, ${user.name}!`);
      if (user.role === "admin") navigate("/admin");
      else navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#FFF8F0", padding: "2rem" }}>
      <div style={{ background: "#FFFFFF", borderRadius: "16px", padding: "2.5rem", width: "100%", maxWidth: "420px", boxShadow: "0 4px 24px rgba(0,0,0,0.1)" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1 style={{ color: "#FF6B35", fontSize: "1.8rem", fontWeight: 700 }}>KigaliEats</h1>
          <h2 style={{ fontSize: "1.4rem", marginTop: "0.5rem" }}>Welcome Back</h2>
          <p style={{ color: "#666", marginTop: "0.5rem" }}>Sign in to your account</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1.2rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Email</label>
            <input
              type="email" name="email" required
              value={formData.email} onChange={handleChange}
              placeholder="you@example.com"
              style={{ width: "100%", padding: "0.75rem 1rem", borderRadius: "8px", border: "1px solid #DDD", fontSize: "1rem", outline: "none", boxSizing: "border-box" }}
            />
          </div>
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Password</label>
            <input
              type="password" name="password" required
              value={formData.password} onChange={handleChange}
              placeholder="••••••••"
              style={{ width: "100%", padding: "0.75rem 1rem", borderRadius: "8px", border: "1px solid #DDD", fontSize: "1rem", outline: "none", boxSizing: "border-box" }}
            />
          </div>
          <button
            type="submit" disabled={loading}
            style={{ width: "100%", background: "#FF6B35", color: "#FFFFFF", padding: "0.85rem", borderRadius: "8px", fontWeight: 600, fontSize: "1rem", border: "none", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1 }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <p style={{ textAlign: "center", marginTop: "1.5rem", color: "#666" }}>
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "#FF6B35", fontWeight: 600 }}>Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;