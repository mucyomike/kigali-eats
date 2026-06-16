import { useState, useEffect } from "react";
import { ordersAPI } from "../../services/api";
import toast from "react-hot-toast";

const statusColors = {
  received: { bg: "#EFF6FF", color: "#3B82F6" },
  preparing: { bg: "#FFF7ED", color: "#F97316" },
  on_the_way: { bg: "#F0FDF4", color: "#22C55E" },
  delivered: { bg: "#F0FDF4", color: "#16A34A" },
  cancelled: { bg: "#FEF2F2", color: "#EF4444" },
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await ordersAPI.getAll();
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleStatusUpdate = async (orderId, orderStatus) => {
    try {
      await ordersAPI.updateStatus(orderId, { orderStatus });
      setOrders(orders.map((o) => o._id === orderId ? { ...o, orderStatus } : o));
      toast.success("Order status updated!");
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const filtered = filter === "all" ? orders : orders.filter((o) => o.orderStatus === filter);

  const filters = ["all", "received", "preparing", "on_the_way", "delivered", "cancelled"];

  return (
    <div>
      <h1 style={{ fontSize: "1.8rem", fontWeight: 700, marginBottom: "0.5rem" }}>Orders</h1>
      <p style={{ color: "#666", marginBottom: "1.5rem" }}>Manage and update customer orders</p>

      {/* Filter Tabs */}
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{ padding: "0.45rem 1rem", borderRadius: "999px", border: "none", background: filter === f ? "#FF6B35" : "#FFFFFF", color: filter === f ? "#FFFFFF" : "#666", fontWeight: 600, cursor: "pointer", fontSize: "0.85rem", boxShadow: "0 2px 6px rgba(0,0,0,0.06)" }}
          >
            {f === "all" ? "All" : f.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "3rem", color: "#666" }}>Loading orders...</div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "3rem", background: "#FFFFFF", borderRadius: "16px", color: "#666" }}>No orders found</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {filtered.map((order) => (
            <div key={order._id} style={{ background: "#FFFFFF", borderRadius: "16px", padding: "1.5rem", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem", flexWrap: "wrap", gap: "0.75rem" }}>
                <div>
                  <p style={{ margin: 0, fontWeight: 700 }}>Order #{order._id.slice(-6).toUpperCase()}</p>
                  <p style={{ margin: "0.25rem 0 0", color: "#666", fontSize: "0.85rem" }}>
                    {order.user?.name} • {order.user?.email}
                  </p>
                  <p style={{ margin: "0.25rem 0 0", color: "#666", fontSize: "0.85rem" }}>
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ margin: 0, fontWeight: 700, color: "#FF6B35", fontSize: "1.1rem" }}>
                    {order.totalPrice?.toLocaleString()} RWF
                  </p>
                  <p style={{ margin: "0.25rem 0 0", color: "#666", fontSize: "0.85rem" }}>
                    {order.paymentMethod === "momo" ? "MTN MoMo" : "Cash on Delivery"}
                  </p>
                </div>
              </div>

              {/* Items */}
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
                {order.items.map((item, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "center", gap: "0.4rem", background: "#F5F5F5", borderRadius: "8px", padding: "0.35rem 0.65rem", fontSize: "0.85rem" }}>
                    <img src={item.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=50&q=80"} alt={item.name} style={{ width: "24px", height: "24px", borderRadius: "4px", objectFit: "cover" }} />
                    {item.name} x{item.quantity}
                  </div>
                ))}
              </div>

              {/* Delivery Address */}
              <p style={{ margin: "0 0 1rem", color: "#666", fontSize: "0.85rem" }}>
                📍 {order.deliveryAddress?.street}, {order.deliveryAddress?.city} • 📞 {order.deliveryAddress?.phone}
              </p>

              {/* Status + Actions */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem" }}>
                <span style={{ background: statusColors[order.orderStatus]?.bg, color: statusColors[order.orderStatus]?.color, padding: "0.35rem 0.85rem", borderRadius: "999px", fontSize: "0.85rem", fontWeight: 600 }}>
                  {order.orderStatus.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                </span>
                {order.orderStatus !== "delivered" && order.orderStatus !== "cancelled" && (
                  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                    {order.orderStatus === "received" && (
                      <button onClick={() => handleStatusUpdate(order._id, "preparing")} style={{ background: "#F97316", color: "#FFFFFF", border: "none", padding: "0.45rem 1rem", borderRadius: "8px", cursor: "pointer", fontWeight: 600, fontSize: "0.85rem" }}>
                        Start Preparing
                      </button>
                    )}
                    {order.orderStatus === "preparing" && (
                      <button onClick={() => handleStatusUpdate(order._id, "on_the_way")} style={{ background: "#22C55E", color: "#FFFFFF", border: "none", padding: "0.45rem 1rem", borderRadius: "8px", cursor: "pointer", fontWeight: 600, fontSize: "0.85rem" }}>
                        Out for Delivery
                      </button>
                    )}
                    {order.orderStatus === "on_the_way" && (
                      <button onClick={() => handleStatusUpdate(order._id, "delivered")} style={{ background: "#16A34A", color: "#FFFFFF", border: "none", padding: "0.45rem 1rem", borderRadius: "8px", cursor: "pointer", fontWeight: 600, fontSize: "0.85rem" }}>
                        Mark Delivered
                      </button>
                    )}
                    <button onClick={() => handleStatusUpdate(order._id, "cancelled")} style={{ background: "transparent", border: "1px solid #EF4444", color: "#EF4444", padding: "0.45rem 1rem", borderRadius: "8px", cursor: "pointer", fontWeight: 600, fontSize: "0.85rem" }}>
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;