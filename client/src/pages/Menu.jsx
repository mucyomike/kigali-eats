import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { productsAPI, categoriesAPI } from "../services/api";
import useCart from "../hooks/useCart";
import toast from "react-hot-toast";
import { Search, ShoppingCart } from "lucide-react";

const Menu = () => {
  const { addToCart } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await categoriesAPI.getAll();
        setCategories(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = {};
        if (selectedCategory) params.category = selectedCategory;
        if (search) params.search = search;
        const res = await productsAPI.getAll(params);
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    const timer = setTimeout(fetchProducts, 300);
    return () => clearTimeout(timer);
  }, [selectedCategory, search]);

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  const handleCategorySelect = (id) => {
    setSelectedCategory(id);
    if (id) setSearchParams({ category: id });
    else setSearchParams({});
  };

  return (
    <div style={{ minHeight: "80vh", background: "#FFF8F0" }}>
      {/* Header */}
      <div style={{ background: "#1A1A1A", padding: "3rem 1rem", textAlign: "center", color: "#FFFFFF" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 700, marginBottom: "0.5rem" }}>
          Our <span style={{ color: "#FF6B35" }}>Menu</span>
        </h1>
        <p style={{ color: "#AAAAAA" }}>Fresh ingredients, bold flavors, delivered fast</p>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1rem" }}>
        {/* Search Bar */}
        <div style={{ position: "relative", marginBottom: "2rem" }}>
          <Search size={20} style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "#666" }} />
          <input
            type="text"
            placeholder="Search for food..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: "100%", padding: "0.85rem 1rem 0.85rem 3rem", borderRadius: "999px", border: "1px solid #DDD", fontSize: "1rem", outline: "none", boxSizing: "border-box", background: "#FFFFFF" }}
          />
        </div>

        {/* Category Filter */}
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "2rem" }}>
          <button
            onClick={() => handleCategorySelect("")}
            style={{ padding: "0.5rem 1.25rem", borderRadius: "999px", border: "2px solid", borderColor: !selectedCategory ? "#FF6B35" : "#DDD", background: !selectedCategory ? "#FF6B35" : "#FFFFFF", color: !selectedCategory ? "#FFFFFF" : "#666", fontWeight: 600, cursor: "pointer" }}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => handleCategorySelect(cat._id)}
              style={{ padding: "0.5rem 1.25rem", borderRadius: "999px", border: "2px solid", borderColor: selectedCategory === cat._id ? "#FF6B35" : "#DDD", background: selectedCategory === cat._id ? "#FF6B35" : "#FFFFFF", color: selectedCategory === cat._id ? "#FFFFFF" : "#666", fontWeight: 600, cursor: "pointer" }}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "4rem", color: "#666" }}>Loading menu...</div>
        ) : products.length === 0 ? (
          <div style={{ textAlign: "center", padding: "4rem" }}>
            <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&q=80" alt="empty" style={{ width: "200px", borderRadius: "12px", marginBottom: "1rem", opacity: 0.5 }} />
            <h3 style={{ color: "#666" }}>No items found</h3>
            <p style={{ color: "#999" }}>Try a different search or category</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "2rem" }}>
            {products.map((product) => (
              <div
                key={product._id}
                style={{ background: "#FFFFFF", borderRadius: "16px", overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.08)", transition: "transform 0.2s, box-shadow 0.2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.15)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.08)"; }}
              >
                <Link to={`/menu/${product._id}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <div style={{ position: "relative" }}>
                    <img
                      src={product.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80"}
                      alt={product.name}
                      style={{ width: "100%", height: "200px", objectFit: "cover" }}
                    />
                    {!product.isAvailable && (
                      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ color: "#FFFFFF", fontWeight: 700, fontSize: "1.2rem" }}>Unavailable</span>
                      </div>
                    )}
                    <div style={{ position: "absolute", top: "0.75rem", left: "0.75rem", background: "#FF6B35", color: "#FFFFFF", padding: "0.25rem 0.75rem", borderRadius: "999px", fontSize: "0.8rem", fontWeight: 600 }}>
                      {product.category?.name || "Food"}
                    </div>
                  </div>
                  <div style={{ padding: "1rem" }}>
                    <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.1rem", fontWeight: 600 }}>{product.name}</h3>
                    <p style={{ margin: "0 0 0.75rem", color: "#666", fontSize: "0.9rem", lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {product.description}
                    </p>
                    {product.preparationTime && (
                      <p style={{ margin: "0 0 0.75rem", color: "#999", fontSize: "0.85rem" }}>⏱ {product.preparationTime} mins prep time</p>
                    )}
                  </div>
                </Link>
                <div style={{ padding: "0 1rem 1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontWeight: 700, color: "#FF6B35", fontSize: "1.2rem" }}>
                    {product.price?.toLocaleString()} RWF
                  </span>
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={!product.isAvailable}
                    style={{ background: product.isAvailable ? "#FF6B35" : "#CCC", color: "#FFFFFF", border: "none", padding: "0.5rem 1rem", borderRadius: "999px", cursor: product.isAvailable ? "pointer" : "not-allowed", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.4rem" }}
                  >
                    <ShoppingCart size={16} /> Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;