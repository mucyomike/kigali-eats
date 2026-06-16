import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { ordersAPI } from "../services/api";
import { User, Package, Clock, CheckCircle, XCircle } from "lucide-react";
import toast from "react-hot-toast";

const statusColors = {
  received: { bg: "#EFF6FF", color: "#3B82F6" },
  preparing: { bg: "#FFF7ED", color: "#F97316" },
  on_the_way: { bg: "#F0FDF4", color: "#22C55E" },
  delivered: { bg: "#F0FDF4", color: "#16A34A" },
  cancelled: { bg: "#FEF2F2", color: "#EF4444" },
};

const statusLabels = {
  received: "Received",
  preparing: "Preparing",
  on_the_way: "On The Way",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

const Profile = () => {
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("orders");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await ordersAPI.getMyOrders();
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleCancel = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    try {
      await ordersAPI.cancel(orderId);
      setOrders(orders.map((o) => o._id === orderId ? { ...o, orderStatus: "cancelled" } : o));
      toast.success("Order cancelled successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Cannot cancel order");
    }
  };

  return (
    <div style={{ minHeight: "80vh", background: "#FFF8F0", padding: "2rem 1rem" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        {/* Profile Header */}
        <div style={{ background: "#1A1A1A", borderRadius: "16px", padding: "2rem", marginBottom: "1.5rem", color: "#FFFFFF", display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: "#FF6B35", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <User size={36} color="#FFFFFF" />
          </div>
          <div>
            <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.25rem" }}>{user?.name}</h1>
            <p style={{ color: "#AAAAAA", margin: 0 }}>{user?.email}</p>
            {user?.phone && <p style={{ color: "#AAAAAA", margin: "0.25rem 0 0", fontSize: "0.9rem" }}>{user?.phone}</p>}
          </div>
          <button
            onClick={logout}
            style={{ marginLeft: "auto", background: "transparent", border: "1px solid #EF4444", color: "#EF4444", padding: "0.5rem 1rem", borderRadius: "8px", cursor: "pointer", fontWeight: 500 }}
          >
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
          {["orders"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{ padding: "0.65rem 1.5rem", borderRadius: "999px", border: "none", background: activeTab === tab ? "#FF6B35" : "#FFFFFF", color: activeTab === tab ? "#FFFFFF" : "#666", fontWeight: 600, cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
            >
              My Orders
            </button>
          ))}
        </div>

        {/* Orders List */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "3rem", color: "#666" }}>Loading orders...</div>
        ) : orders.length === 0 ? (
          <div style={{ textAlign: "center", padding: "3rem", background: "#FFFFFF", borderRadius: "16px" }}>
            <Package size={48} color="#DDD" style={{ marginBottom: "1rem" }} />
            <h3 style={{ color: "#666", marginBottom: "0.5rem" }}>No orders yet</h3>
            <Link to="/menu" style={{ color: "#FF6B35", fontWeight: 600 }}>Start ordering</Link>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {orders.map((order) => (
              <div key={order._id} style={{ background: "#FFFFFF", borderRadius: "16px", padding: "1.5rem", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                  <div>
                    <p style={{ margin: 0, fontWeight: 700, fontSize: "1rem" }}>Order #{order._id.slice(-6).toUpperCase()}</p>
                    <p style={{ margin: "0.25rem 0 0", color: "#666", fontSize: "0.85rem" }}>
                      {new Date(order.createdAt).toLocaleDateString("en-RW", { dateStyle: "medium" })}
                    </p>
                  </div>
                  <span style={{ background: statusColors[order.orderStatus]?.bg, color: statusColors[order.orderStatus]?.color, padding: "0.35rem 0.85rem", borderRadius: "999px", fontSize: "0.85rem", fontWeight: 600 }}>
                    {statusLabels[order.orderStatus]}
                  </span>
                </div>

                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
                  {order.items.map((item, idx) => (
                    <div key={idx} style={{ display: "flex", alignItems: "center", gap: "0.4rem", background: "#F5F5F5", borderRadius: "8px", padding: "0.35rem 0.65rem", fontSize: "0.85rem" }}>
                      <img src={item.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=50&q=80"} alt={item.name} style={{ width: "24px", height: "24px", borderRadius: "4px", objectFit: "cover" }} />
                      {item.name} x{item.quantity}
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontWeight: 700, color: "#FF6B35", fontSize: "1.1rem" }}>
                    {order.totalPrice?.toLocaleString()} RWF
                  </span>
                  <div style={{ display: "flex", gap: "0.75rem" }}>
                    {order.orderStatus === "received" && (
                      <button
                        onClick={() => handleCancel(order._id)}
                        style={{ background: "transparent", border: "1px solid #EF4444", color: "#EF4444", padding: "0.4rem 0.85rem", borderRadius: "8px", cursor: "pointer", fontSize: "0.85rem", fontWeight: 500 }}
                      >
                        Cancel
                      </button>
                    )}
                    <Link
                      to={`/orders/${order._id}`}
                      style={{ background: "#FF6B35", color: "#FFFFFF", padding: "0.4rem 0.85rem", borderRadius: "8px", textDecoration: "none", fontSize: "0.85rem", fontWeight: 600 }}
                    >
                      Track Order
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;