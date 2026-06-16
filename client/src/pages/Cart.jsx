import { Link, useNavigate } from "react-router-dom";
import useCart from "../hooks/useCart";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";

const Cart = () => {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div style={{ minHeight: "80vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#FFF8F0", padding: "2rem", textAlign: "center" }}>
        <img
          src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&q=80"
          alt="empty cart"
          style={{ width: "200px", borderRadius: "16px", marginBottom: "1.5rem", opacity: 0.6 }}
        />
        <h2 style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>Your cart is empty</h2>
        <p style={{ color: "#666", marginBottom: "2rem" }}>Add some delicious food to get started!</p>
        <Link
          to="/menu"
          style={{ background: "#FF6B35", color: "#FFFFFF", padding: "0.85rem 2rem", borderRadius: "999px", textDecoration: "none", fontWeight: 600 }}
        >
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "80vh", background: "#FFF8F0", padding: "2rem 1rem" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: 700 }}>Your Cart</h1>
          <button
            onClick={clearCart}
            style={{ background: "transparent", border: "1px solid #EF4444", color: "#EF4444", padding: "0.5rem 1rem", borderRadius: "8px", cursor: "pointer", fontWeight: 500 }}
          >
            Clear All
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "2rem", alignItems: "start" }}>
          {/* Cart Items */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {items.map((item) => (
              <div
                key={item._id}
                style={{ background: "#FFFFFF", borderRadius: "16px", padding: "1.25rem", display: "flex", gap: "1rem", alignItems: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
              >
                <img
                  src={item.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&q=80"}
                  alt={item.name}
                  style={{ width: "90px", height: "90px", borderRadius: "12px", objectFit: "cover", flexShrink: 0 }}
                />
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: "0 0 0.25rem", fontSize: "1.05rem", fontWeight: 600 }}>{item.name}</h3>
                  <p style={{ margin: "0 0 0.75rem", color: "#FF6B35", fontWeight: 700 }}>
                    {item.price?.toLocaleString()} RWF
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      style={{ width: "32px", height: "32px", borderRadius: "50%", border: "1px solid #DDD", background: "#F5F5F5", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                    >
                      <Minus size={14} />
                    </button>
                    <span style={{ fontWeight: 700, fontSize: "1.1rem", minWidth: "24px", textAlign: "center" }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      style={{ width: "32px", height: "32px", borderRadius: "50%", border: "none", background: "#FF6B35", color: "#FFFFFF", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "1rem" }}>
                  <span style={{ fontWeight: 700, fontSize: "1.1rem" }}>
                    {(item.price * item.quantity).toLocaleString()} RWF
                  </span>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    style={{ background: "transparent", border: "none", color: "#EF4444", cursor: "pointer", padding: "0.25rem" }}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div style={{ background: "#FFFFFF", borderRadius: "16px", padding: "1.5rem", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", position: "sticky", top: "100px" }}>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "1.5rem" }}>Order Summary</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.5rem" }}>
              {items.map((item) => (
                <div key={item._id} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.95rem" }}>
                  <span style={{ color: "#666" }}>{item.name} x{item.quantity}</span>
                  <span style={{ fontWeight: 500 }}>{(item.price * item.quantity).toLocaleString()} RWF</span>
                </div>
              ))}
            </div>
            <div style={{ borderTop: "1px solid #EEE", paddingTop: "1rem", marginBottom: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <span style={{ color: "#666" }}>Subtotal</span>
                <span>{totalPrice.toLocaleString()} RWF</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <span style={{ color: "#666" }}>Delivery Fee</span>
                <span style={{ color: "#10B981" }}>Free</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: "1.1rem", marginTop: "0.75rem", paddingTop: "0.75rem", borderTop: "1px solid #EEE" }}>
                <span>Total</span>
                <span style={{ color: "#FF6B35" }}>{totalPrice.toLocaleString()} RWF</span>
              </div>
            </div>
            <button
              onClick={() => navigate("/checkout")}
              style={{ width: "100%", background: "#FF6B35", color: "#FFFFFF", padding: "0.85rem", borderRadius: "12px", fontWeight: 700, fontSize: "1rem", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}
            >
              <ShoppingBag size={18} /> Proceed to Checkout
            </button>
            <Link
              to="/menu"
              style={{ display: "block", textAlign: "center", marginTop: "1rem", color: "#666", textDecoration: "none", fontSize: "0.9rem" }}
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;