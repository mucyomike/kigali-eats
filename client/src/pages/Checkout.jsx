import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCart from "../hooks/useCart";
import useAuth from "../hooks/useAuth";
import { ordersAPI } from "../services/api";
import toast from "react-hot-toast";
import { MapPin, Phone, CreditCard, Banknote } from "lucide-react";

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [formData, setFormData] = useState({
    street: "",
    city: "Kigali",
    phone: user?.phone || "",
    notes: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (items.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }
    setLoading(true);
    try {
      const orderData = {
        items: items.map((item) => ({
          product: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        deliveryAddress: {
          street: formData.street,
          city: formData.city,
          phone: formData.phone,
        },
        paymentMethod,
        totalPrice,
        notes: formData.notes,
      };
      const res = await ordersAPI.create(orderData);
      clearCart();
      toast.success("Order placed successfully!");
      navigate(`/orders/${res.data._id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = { width: "100%", padding: "0.75rem 1rem", borderRadius: "8px", border: "1px solid #DDD", fontSize: "1rem", outline: "none", boxSizing: "border-box", background: "#FFFFFF" };

  return (
    <div style={{ minHeight: "80vh", background: "#FFF8F0", padding: "2rem 1rem" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "2rem" }}>Checkout</h1>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "2rem", alignItems: "start" }}>
          <form onSubmit={handleSubmit}>
            {/* Delivery Info */}
            <div style={{ background: "#FFFFFF", borderRadius: "16px", padding: "1.5rem", marginBottom: "1.5rem", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
              <h2 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <MapPin size={20} color="#FF6B35" /> Delivery Details
              </h2>
              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Street Address</label>
                <input name="street" required value={formData.street} onChange={handleChange} placeholder="e.g. KG 123 St, Gasabo" style={inputStyle} />
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>City</label>
                <input name="city" required value={formData.city} onChange={handleChange} style={inputStyle} />
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500, display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <Phone size={16} /> Phone Number
                </label>
                <input name="phone" required value={formData.phone} onChange={handleChange} placeholder="+250 788 000 000" style={inputStyle} />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Special Instructions (optional)</label>
                <textarea name="notes" value={formData.notes} onChange={handleChange} placeholder="Any special requests..." rows={3} style={{ ...inputStyle, resize: "vertical" }} />
              </div>
            </div>

            {/* Payment Method */}
            <div style={{ background: "#FFFFFF", borderRadius: "16px", padding: "1.5rem", marginBottom: "1.5rem", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
              <h2 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "1.25rem" }}>Payment Method</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                {[
                  { value: "momo", label: "MTN MoMo", icon: <CreditCard size={24} color="#FFCC00" />, desc: "Pay with Mobile Money" },
                  { value: "cash", label: "Cash on Delivery", icon: <Banknote size={24} color="#10B981" />, desc: "Pay when delivered" },
                ].map((method) => (
                  <div
                    key={method.value}
                    onClick={() => setPaymentMethod(method.value)}
                    style={{ border: `2px solid ${paymentMethod === method.value ? "#FF6B35" : "#DDD"}`, borderRadius: "12px", padding: "1rem", cursor: "pointer", background: paymentMethod === method.value ? "#FFF3EE" : "#FFFFFF", textAlign: "center" }}
                  >
                    <div style={{ marginBottom: "0.5rem" }}>{method.icon}</div>
                    <div style={{ fontWeight: 600, marginBottom: "0.25rem" }}>{method.label}</div>
                    <div style={{ fontSize: "0.8rem", color: "#666" }}>{method.desc}</div>
                  </div>
                ))}
              </div>
              {paymentMethod === "momo" && (
                <div style={{ marginTop: "1rem", padding: "1rem", background: "#FFFBEA", borderRadius: "8px", border: "1px solid #FFCC00" }}>
                  <p style={{ fontWeight: 600, marginBottom: "0.25rem" }}>MTN MoMo Payment</p>
                  <p style={{ fontSize: "0.9rem", color: "#666" }}>Send <strong>{totalPrice.toLocaleString()} RWF</strong> to <strong>*182*8*1*0788000000#</strong> then place your order.</p>
                </div>
              )}
            </div>

            <button
              type="submit" disabled={loading}
              style={{ width: "100%", background: "#FF6B35", color: "#FFFFFF", padding: "1rem", borderRadius: "12px", fontWeight: 700, fontSize: "1.1rem", border: "none", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1 }}
            >
              {loading ? "Placing Order..." : `Place Order — ${totalPrice.toLocaleString()} RWF`}
            </button>
          </form>

          {/* Order Summary */}
          <div style={{ background: "#FFFFFF", borderRadius: "16px", padding: "1.5rem", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", position: "sticky", top: "100px" }}>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "1.25rem" }}>Order Summary</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.25rem" }}>
              {items.map((item) => (
                <div key={item._id} style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                  <img src={item.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&q=80"} alt={item.name} style={{ width: "50px", height: "50px", borderRadius: "8px", objectFit: "cover" }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontWeight: 500, fontSize: "0.9rem" }}>{item.name}</p>
                    <p style={{ margin: 0, color: "#666", fontSize: "0.85rem" }}>x{item.quantity}</p>
                  </div>
                  <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>{(item.price * item.quantity).toLocaleString()} RWF</span>
                </div>
              ))}
            </div>
            <div style={{ borderTop: "1px solid #EEE", paddingTop: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <span style={{ color: "#666" }}>Subtotal</span>
                <span>{totalPrice.toLocaleString()} RWF</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <span style={{ color: "#666" }}>Delivery</span>
                <span style={{ color: "#10B981" }}>Free</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: "1.1rem", marginTop: "0.75rem", paddingTop: "0.75rem", borderTop: "1px solid #EEE" }}>
                <span>Total</span>
                <span style={{ color: "#FF6B35" }}>{totalPrice.toLocaleString()} RWF</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;