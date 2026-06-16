import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ordersAPI } from "../services/api";
import { CheckCircle, Clock, ChefHat, Bike, Package } from "lucide-react";

const OrderTracking = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const steps = [
    { key: "received", label: "Order Received", icon: <CheckCircle size={24} />, desc: "We got your order!" },
    { key: "preparing", label: "Preparing", icon: <ChefHat size={24} />, desc: "Kitchen is cooking your food" },
    { key: "on_the_way", label: "On The Way", icon: <Bike size={24} />, desc: "Your order is being delivered" },
    { key: "delivered", label: "Delivered", icon: <Package size={24} />, desc: "Enjoy your meal!" },
  ];

  const getStepIndex = (status) => steps.findIndex((s) => s.key === status);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await ordersAPI.getById(id);
        setOrder(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
    // Poll every 30 seconds for live updates
    const interval = setInterval(fetchOrder, 30000);
    return () => clearInterval(interval);
  }, [id]);

  if (loading) return (
    <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#FFF8F0" }}>
      <div style={{ textAlign: "center" }}>
        <Clock size={48} color="#FF6B35" />
        <p style={{ marginTop: "1rem", color: "#666" }}>Loading order...</p>
      </div>
    </div>
  );

  if (!order) return (
    <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#FFF8F0" }}>
      <div style={{ textAlign: "center" }}>
        <h2>Order not found</h2>
        <Link to="/profile" style={{ color: "#FF6B35" }}>View My Orders</Link>
      </div>
    </div>
  );

  const currentStep = getStepIndex(order.orderStatus);
  const isCancelled = order.orderStatus === "cancelled";

  return (
    <div style={{ minHeight: "80vh", background: "#FFF8F0", padding: "2rem 1rem" }}>
      <div style={{ maxWidth: "700px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ background: "#1A1A1A", borderRadius: "16px", padding: "1.5rem", marginBottom: "1.5rem", color: "#FFFFFF", textAlign: "center" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.5rem" }}>
            Order <span style={{ color: "#FF6B35" }}>#{order._id.slice(-6).toUpperCase()}</span>
          </h1>
          <p style={{ color: "#AAAAAA", fontSize: "0.9rem" }}>
            Placed on {new Date(order.createdAt).toLocaleDateString("en-RW", { dateStyle: "full" })}
          </p>
        </div>

        {/* Tracking Steps */}
        {isCancelled ? (
          <div style={{ background: "#FEF2F2", border: "1px solid #EF4444", borderRadius: "16px", padding: "2rem", textAlign: "center", marginBottom: "1.5rem" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>❌</div>
            <h2 style={{ color: "#EF4444", marginBottom: "0.5rem" }}>Order Cancelled</h2>
            <p style={{ color: "#666" }}>This order has been cancelled.</p>
          </div>
        ) : (
          <div style={{ background: "#FFFFFF", borderRadius: "16px", padding: "2rem", marginBottom: "1.5rem", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "2rem" }}>Tracking Status</h2>
            <div style={{ position: "relative" }}>
              {/* Progress Line */}
              <div style={{ position: "absolute", left: "23px", top: "24px", bottom: "24px", width: "2px", background: "#EEE", zIndex: 0 }} />
              <div style={{ position: "absolute", left: "23px", top: "24px", width: "2px", background: "#FF6B35", zIndex: 1, height: `${(currentStep / (steps.length - 1)) * 100}%`, transition: "height 0.5s ease" }} />

              {steps.map((step, idx) => {
                const isCompleted = idx <= currentStep;
                const isActive = idx === currentStep;
                return (
                  <div key={step.key} style={{ display: "flex", alignItems: "flex-start", gap: "1.25rem", marginBottom: idx < steps.length - 1 ? "2rem" : 0, position: "relative", zIndex: 2 }}>
                    <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: isCompleted ? "#FF6B35" : "#F0F0F0", color: isCompleted ? "#FFFFFF" : "#999", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: isActive ? "0 0 0 4px rgba(255,107,53,0.2)" : "none", transition: "all 0.3s" }}>
                      {step.icon}
                    </div>
                    <div style={{ paddingTop: "0.6rem" }}>
                      <p style={{ margin: 0, fontWeight: isActive ? 700 : 500, color: isCompleted ? "#1A1A1A" : "#999", fontSize: "1rem" }}>{step.label}</p>
                      <p style={{ margin: "0.25rem 0 0", fontSize: "0.85rem", color: isActive ? "#FF6B35" : "#999" }}>{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Order Items */}
        <div style={{ background: "#FFFFFF", borderRadius: "16px", padding: "1.5rem", marginBottom: "1.5rem", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "1.25rem" }}>Order Items</h2>
          {order.items.map((item, idx) => (
            <div key={idx} style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: idx < order.items.length - 1 ? "1rem" : 0, paddingBottom: idx < order.items.length - 1 ? "1rem" : 0, borderBottom: idx < order.items.length - 1 ? "1px solid #EEE" : "none" }}>
              <img
                src={item.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&q=80"}
                alt={item.name}
                style={{ width: "60px", height: "60px", borderRadius: "8px", objectFit: "cover" }}
              />
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontWeight: 600 }}>{item.name}</p>
                <p style={{ margin: "0.25rem 0 0", color: "#666", fontSize: "0.9rem" }}>x{item.quantity} × {item.price?.toLocaleString()} RWF</p>
              </div>
              <span style={{ fontWeight: 700, color: "#FF6B35" }}>{(item.price * item.quantity).toLocaleString()} RWF</span>
            </div>
          ))}
          <div style={{ borderTop: "2px solid #EEE", marginTop: "1rem", paddingTop: "1rem", display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: "1.1rem" }}>
            <span>Total</span>
            <span style={{ color: "#FF6B35" }}>{order.totalPrice?.toLocaleString()} RWF</span>
          </div>
        </div>

        {/* Delivery Info */}
        <div style={{ background: "#FFFFFF", borderRadius: "16px", padding: "1.5rem", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", marginBottom: "1.5rem" }}>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "1rem" }}>Delivery Info</h2>
          <p style={{ margin: "0 0 0.5rem", color: "#666" }}>📍 {order.deliveryAddress?.street}, {order.deliveryAddress?.city}</p>
          <p style={{ margin: "0 0 0.5rem", color: "#666" }}>📞 {order.deliveryAddress?.phone}</p>
          <p style={{ margin: 0, color: "#666" }}>💳 Payment: <strong>{order.paymentMethod === "momo" ? "MTN MoMo" : "Cash on Delivery"}</strong></p>
        </div>

        <Link
          to="/profile"
          style={{ display: "block", textAlign: "center", color: "#FF6B35", fontWeight: 600, textDecoration: "none" }}
        >
          ← Back to My Orders
        </Link>
      </div>
    </div>
  );
};

export default OrderTracking;