import { useState, useEffect } from "react";
import { ordersAPI, productsAPI, categoriesAPI, contactsAPI } from "../../services/api";
import { ShoppingBag, Package, Tag, MessageSquare, TrendingUp } from "lucide-react";

const statusColors = {
  received: "#3B82F6", preparing: "#F97316",
  on_the_way: "#22C55E", delivered: "#16A34A", cancelled: "#EF4444",
};

const Dashboard = () => {
  const [stats, setStats] = useState({ orders: 0, products: 0, categories: 0, contacts: 0, revenue: 0 });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersRes, productsRes, catsRes, contactsRes] = await Promise.all([
          ordersAPI.getAll(),
          productsAPI.getAll(),
          categoriesAPI.getAll(),
          contactsAPI.getAll(),
        ]);
        const orders = ordersRes.data;
        const revenue = orders.filter(o => o.orderStatus === "delivered").reduce((sum, o) => sum + o.totalPrice, 0);
        setStats({ orders: orders.length, products: productsRes.data.length, categories: catsRes.data.length, contacts: contactsRes.data.length, revenue });
        setRecentOrders(orders.slice(0, 5));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const cards = [
    { label: "Total Orders", value: stats.orders, icon: <ShoppingBag size={28} />, color: "#3B82F6" },
    { label: "Total Products", value: stats.products, icon: <Package size={28} />, color: "#FF6B35" },
    { label: "Categories", value: stats.categories, icon: <Tag size={28} />, color: "#8B5CF6" },
    { label: "Revenue (RWF)", value: stats.revenue.toLocaleString(), icon: <TrendingUp size={28} />, color: "#10B981" },
  ];

  return (
    <div>
      <h1 style={{ fontSize: "1.8rem", fontWeight: 700, marginBottom: "0.5rem" }}>Dashboard</h1>
      <p style={{ color: "#666", marginBottom: "2rem" }}>Welcome back! Here's what's happening today.</p>

      {loading ? (
        <div style={{ textAlign: "center", padding: "3rem", color: "#666" }}>Loading dashboard...</div>
      ) : (
        <>
          {/* Stats Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.25rem", marginBottom: "2rem" }}>
            {cards.map((card, idx) => (
              <div key={idx} style={{ background: "#FFFFFF", borderRadius: "16px", padding: "1.5rem", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{ width: "56px", height: "56px", borderRadius: "12px", background: `${card.color}15`, color: card.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {card.icon}
                </div>
                <div>
                  <p style={{ margin: 0, color: "#666", fontSize: "0.85rem" }}>{card.label}</p>
                  <p style={{ margin: "0.25rem 0 0", fontWeight: 700, fontSize: "1.4rem" }}>{card.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Orders */}
          <div style={{ background: "#FFFFFF", borderRadius: "16px", padding: "1.5rem", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "1.25rem" }}>Recent Orders</h2>
            {recentOrders.length === 0 ? (
              <p style={{ color: "#666", textAlign: "center", padding: "2rem" }}>No orders yet</p>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid #EEE" }}>
                      {["Order ID", "Customer", "Total", "Status", "Date"].map((h) => (
                        <th key={h} style={{ padding: "0.75rem", textAlign: "left", fontSize: "0.85rem", color: "#666", fontWeight: 600 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order._id} style={{ borderBottom: "1px solid #F0F0F0" }}>
                        <td style={{ padding: "0.85rem 0.75rem", fontWeight: 600, fontSize: "0.9rem" }}>#{order._id.slice(-6).toUpperCase()}</td>
                        <td style={{ padding: "0.85rem 0.75rem", fontSize: "0.9rem" }}>{order.user?.name || "N/A"}</td>
                        <td style={{ padding: "0.85rem 0.75rem", fontWeight: 600, color: "#FF6B35", fontSize: "0.9rem" }}>{order.totalPrice?.toLocaleString()} RWF</td>
                        <td style={{ padding: "0.85rem 0.75rem" }}>
                          <span style={{ background: `${statusColors[order.orderStatus]}20`, color: statusColors[order.orderStatus], padding: "0.3rem 0.75rem", borderRadius: "999px", fontSize: "0.8rem", fontWeight: 600 }}>
                            {order.orderStatus}
                          </span>
                        </td>
                        <td style={{ padding: "0.85rem 0.75rem", color: "#666", fontSize: "0.85rem" }}>{new Date(order.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;