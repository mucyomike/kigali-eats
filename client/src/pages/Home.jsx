import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { productsAPI, categoriesAPI } from "../services/api";
import useCart from "../hooks/useCart";
import toast from "react-hot-toast";

const Home = () => {
  const { addToCart } = useCart();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const placeholderCategories = [
    { _id: "1", name: "Rwandan Local", image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&q=80" },
    { _id: "2", name: "Burgers", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80" },
    { _id: "3", name: "Pizza", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80" },
    { _id: "4", name: "Grills", image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80" },
    { _id: "5", name: "Drinks", image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&q=80" },
    { _id: "6", name: "Desserts", image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&q=80" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catsRes, prodsRes] = await Promise.all([
          categoriesAPI.getAll().catch(() => null),
          productsAPI.getFeatured().catch(() => null),
        ]);
        if (catsRes?.data) setCategories(catsRes.data);
        else setCategories(placeholderCategories);
        if (prodsRes?.data) setProducts(prodsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setCategories(placeholderCategories);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div>
      {/* SECTION 1 - HERO */}
      <section
        style={{
          height: "100vh",
          backgroundImage: `url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=80')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)" }} />
        <div
          style={{
            position: "relative",
            zIndex: 10,
            color: "#FFFFFF",
            textAlign: "center",
            maxWidth: "600px",
            padding: "2rem",
          }}
        >
          <p style={{ fontSize: "1rem", marginBottom: "1rem", opacity: 0.9 }}>
            🍽️ Fast Delivery in Kigali
          </p>
          <h1 style={{ fontSize: "3.5rem", fontWeight: 700, marginBottom: "1rem", lineHeight: 1.2 }}>
            Craving Something{" "}
            <span style={{ color: "#FF6B35" }}>Delicious?</span>
          </h1>
          <p style={{ fontSize: "1.1rem", marginBottom: "2rem", opacity: 0.9, lineHeight: 1.6 }}>
            Order from the best local restaurants and get fresh food
            delivered to your doorstep in minutes.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              to="/menu"
              style={{
                background: "#FF6B35",
                color: "#1A1A1A",
                padding: "0.75rem 2rem",
                borderRadius: "999px",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Order Now
            </Link>
            <Link
              to="/menu"
              style={{
                border: "2px solid #FFFFFF",
                color: "#FFFFFF",
                padding: "0.75rem 2rem",
                borderRadius: "999px",
                textDecoration: "none",
                fontWeight: 600,
                background: "transparent",
              }}
            >
              View Menu
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 2 - STATS BAR */}
      <section style={{ background: "#1A1A1A", padding: "2rem 1rem", color: "#FFFFFF" }}>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gap: "2rem",
            textAlign: "center",
          }}
        >
          {[
            { value: "500+", label: "Dishes" },
            { value: "30 min", label: "Delivery" },
            { value: "50+", label: "Restaurants" },
            { value: "4.8★", label: "Rating" },
          ].map((stat, idx) => (
            <div key={idx}>
              <div style={{ fontSize: "2.5rem", fontWeight: 700, color: "#FF6B35", marginBottom: "0.5rem" }}>
                {stat.value}
              </div>
              <div style={{ fontSize: "0.9rem", color: "#AAAAAA" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3 - CATEGORIES */}
      <section style={{ padding: "3rem 1rem", background: "#FFF8F0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "2rem", textAlign: "center" }}>
            Browse by Category
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {(categories.length > 0 ? categories : placeholderCategories).map((cat) => (
              <Link
                key={cat._id}
                to={`/menu?category=${cat._id}`}
                style={{
                  height: "160px",
                  borderRadius: "12px",
                  textDecoration: "none",
                  cursor: "pointer",
                  overflow: "hidden",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  style={{
                    width: "100%",
                    height: "70%",
                    objectFit: "cover",
                    borderRadius: "12px 12px 0 0",
                  }}
                />
                <div
                  style={{
                    height: "30%",
                    background: "#1A1A1A",
                    color: "#FFFFFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 600,
                    fontSize: "0.95rem",
                  }}
                >
                  {cat.name}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 - FEATURED PRODUCTS */}
      <section style={{ padding: "3rem 1rem", background: "#FFFFFF" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "2rem", textAlign: "center" }}>
            Popular Right Now
          </h2>
          {loading ? (
            <div style={{ textAlign: "center", padding: "2rem" }}>Loading...</div>
          ) : products.length === 0 ? (
            <div style={{ textAlign: "center", padding: "2rem", color: "#666" }}>
              No featured products yet. Check back soon!
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "2rem",
              }}
            >
              {products.map((product) => (
                <div
                  key={product._id}
                  style={{
                    border: "1px solid #E0E0E0",
                    borderRadius: "12px",
                    overflow: "hidden",
                    background: "#FFFFFF",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  }}
                >
                  <img
                    src={product.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80"}
                    alt={product.name}
                    style={{ width: "100%", height: "200px", objectFit: "cover" }}
                  />
                  <div style={{ padding: "1rem" }}>
                    <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "1.1rem" }}>{product.name}</h3>
                    <p style={{ margin: "0 0 0.5rem 0", color: "#666", fontSize: "0.9rem" }}>
                      {product.category?.name || "Food"}
                    </p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontWeight: 700, color: "#FF6B35", fontSize: "1.2rem" }}>
                        {product.price.toLocaleString()} RWF
                      </span>
                      <button
                        onClick={() => handleAddToCart(product)}
                        style={{
                          background: "#FF6B35",
                          color: "#FFFFFF",
                          border: "none",
                          padding: "0.5rem 1rem",
                          borderRadius: "999px",
                          cursor: "pointer",
                          fontWeight: 600,
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* SECTION 5 - CTA BANNER */}
      <section style={{ background: "#FF6B35", padding: "3rem 1rem", textAlign: "center" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "2.5rem", fontWeight: 700, marginBottom: "1rem", color: "#FFFFFF" }}>
            Ready to Order?
          </h2>
          <p style={{ fontSize: "1.1rem", marginBottom: "2rem", color: "#FFFFFF", opacity: 0.95 }}>
            Get your food delivered in 30 minutes or less
          </p>
          <Link
            to="/menu"
            style={{
              background: "#1A1A1A",
              color: "#FF6B35",
              padding: "0.75rem 2rem",
              borderRadius: "999px",
              textDecoration: "none",
              fontWeight: 600,
              display: "inline-block",
            }}
          >
            Order Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;