import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { productsAPI } from "../services/api";
import useCart from "../hooks/useCart";
import toast from "react-hot-toast";
import { ShoppingCart, Clock, Flame, Star, ArrowLeft } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, isInCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await productsAPI.getById(id);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addToCart(product);
    toast.success(`${quantity}x ${product.name} added to cart!`);
  };

  if (loading) return (
    <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#FFF8F0" }}>
      <p style={{ color: "#666" }}>Loading...</p>
    </div>
  );

  if (!product) return (
    <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#FFF8F0" }}>
      <p style={{ color: "#666" }}>Product not found</p>
    </div>
  );

  return (
    <div style={{ minHeight: "80vh", background: "#FFF8F0", padding: "2rem 1rem" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <button onClick={() => navigate(-1)} style={{ background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem", color: "#666", marginBottom: "1.5rem", fontWeight: 500 }}>
          <ArrowLeft size={18} /> Back
        </button>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem", background: "#FFFFFF", borderRadius: "20px", overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
          <img
            src={product.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80"}
            alt={product.name}
            style={{ width: "100%", height: "100%", minHeight: "350px", objectFit: "cover" }}
          />
          <div style={{ padding: "2rem 2rem 2rem 0" }}>
            <span style={{ background: "#FFE0CC", color: "#FF6B35", padding: "0.3rem 0.85rem", borderRadius: "999px", fontSize: "0.85rem", fontWeight: 600 }}>
              {product.category?.name}
            </span>
            <h1 style={{ fontSize: "2rem", fontWeight: 700, margin: "1rem 0 0.75rem" }}>{product.name}</h1>
            <p style={{ color: "#555", lineHeight: 1.8, marginBottom: "1.5rem" }}>{product.description}</p>

            <div style={{ display: "flex", gap: "1.5rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
              {product.preparationTime && (
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "#666", fontSize: "0.9rem" }}>
                  <Clock size={16} color="#FF6B35" /> {product.preparationTime} mins
                </div>
              )}
              {product.calories && (
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "#666", fontSize: "0.9rem" }}>
                  <Flame size={16} color="#FF6B35" /> {product.calories} cal
                </div>
              )}
              {product.averageRating > 0 && (
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "#666", fontSize: "0.9rem" }}>
                  <Star size={16} color="#FF6B35" fill="#FF6B35" /> {product.averageRating.toFixed(1)}
                </div>
              )}
            </div>

            {product.tags?.length > 0 && (
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
                {product.tags.map((tag, idx) => (
                  <span key={idx} style={{ background: "#F5F5F5", color: "#666", padding: "0.25rem 0.75rem", borderRadius: "999px", fontSize: "0.8rem" }}>
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div style={{ fontSize: "2rem", fontWeight: 800, color: "#FF6B35", marginBottom: "1.5rem" }}>
              {product.price?.toLocaleString()} RWF
            </div>

            {product.isAvailable ? (
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{ display: "flex", alignItems: "center", border: "1px solid #DDD", borderRadius: "10px", overflow: "hidden" }}>
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ padding: "0.65rem 1rem", border: "none", background: "#F5F5F5", cursor: "pointer", fontSize: "1.1rem", fontWeight: 700 }}>−</button>
                  <span style={{ padding: "0.65rem 1.25rem", fontWeight: 700, fontSize: "1.1rem" }}>{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} style={{ padding: "0.65rem 1rem", border: "none", background: "#FF6B35", color: "#FFFFFF", cursor: "pointer", fontSize: "1.1rem", fontWeight: 700 }}>+</button>
                </div>
                <button
                  onClick={handleAddToCart}
                  style={{ flex: 1, background: "#FF6B35", color: "#FFFFFF", border: "none", padding: "0.85rem 1.5rem", borderRadius: "10px", fontWeight: 700, fontSize: "1rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}
                >
                  <ShoppingCart size={20} /> Add to Cart — {(product.price * quantity).toLocaleString()} RWF
                </button>
              </div>
            ) : (
              <div style={{ background: "#FEF2F2", color: "#EF4444", padding: "1rem", borderRadius: "10px", fontWeight: 600, textAlign: "center" }}>
                Currently Unavailable
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;