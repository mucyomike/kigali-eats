import { useState, useEffect } from "react";
import { productsAPI, categoriesAPI } from "../../services/api";
import toast from "react-hot-toast";
import { Plus, Pencil, Trash2, X, Check } from "lucide-react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "", description: "", price: "", image: "",
    category: "", preparationTime: 15, calories: "", tags: "", isAvailable: true,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [prodsRes, catsRes] = await Promise.all([productsAPI.getAll(), categoriesAPI.getAll()]);
      setProducts(prodsRes.data);
      setCategories(catsRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const data = {
        ...formData,
        price: Number(formData.price),
        preparationTime: Number(formData.preparationTime),
        calories: formData.calories ? Number(formData.calories) : undefined,
        tags: formData.tags ? formData.tags.split(",").map((t) => t.trim()) : [],
      };
      if (editingId) {
        await productsAPI.update(editingId, data);
        toast.success("Product updated!");
      } else {
        await productsAPI.create(data);
        toast.success("Product created!");
      }
      resetForm();
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save product");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image || "",
      category: product.category?._id || product.category,
      preparationTime: product.preparationTime || 15,
      calories: product.calories || "",
      tags: product.tags?.join(", ") || "",
      isAvailable: product.isAvailable,
    });
    setEditingId(product._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await productsAPI.delete(id);
      setProducts(products.filter((p) => p._id !== id));
      toast.success("Product deleted!");
    } catch (err) {
      toast.error("Failed to delete product");
    }
  };

  const resetForm = () => {
    setFormData({ name: "", description: "", price: "", image: "", category: "", preparationTime: 15, calories: "", tags: "", isAvailable: true });
    setShowForm(false);
    setEditingId(null);
  };

  const inputStyle = { width: "100%", padding: "0.7rem 1rem", borderRadius: "8px", border: "1px solid #DDD", fontSize: "0.95rem", outline: "none", boxSizing: "border-box" };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <div>
          <h1 style={{ fontSize: "1.8rem", fontWeight: 700, marginBottom: "0.25rem" }}>Products</h1>
          <p style={{ color: "#666", margin: 0 }}>{products.length} items on the menu</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          style={{ background: "#FF6B35", color: "#FFFFFF", border: "none", padding: "0.65rem 1.25rem", borderRadius: "10px", cursor: "pointer", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.5rem" }}
        >
          <Plus size={18} /> Add Product
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div style={{ background: "#FFFFFF", borderRadius: "16px", padding: "1.5rem", marginBottom: "1.5rem", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1.25rem" }}>
            {editingId ? "Edit Product" : "New Product"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
              <div>
                <label style={{ display: "block", marginBottom: "0.4rem", fontWeight: 500, fontSize: "0.9rem" }}>Product Name *</label>
                <input required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="e.g. Beef Burger" style={inputStyle} />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "0.4rem", fontWeight: 500, fontSize: "0.9rem" }}>Category *</label>
                <select required value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} style={inputStyle}>
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", marginBottom: "0.4rem", fontWeight: 500, fontSize: "0.9rem" }}>Description *</label>
              <textarea required value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Describe the dish..." rows={3} style={{ ...inputStyle, resize: "vertical" }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
              <div>
                <label style={{ display: "block", marginBottom: "0.4rem", fontWeight: 500, fontSize: "0.9rem" }}>Price (RWF) *</label>
                <input required type="number" min="0" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} placeholder="e.g. 5000" style={inputStyle} />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "0.4rem", fontWeight: 500, fontSize: "0.9rem" }}>Prep Time (mins)</label>
                <input type="number" min="1" value={formData.preparationTime} onChange={(e) => setFormData({ ...formData, preparationTime: e.target.value })} style={inputStyle} />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "0.4rem", fontWeight: 500, fontSize: "0.9rem" }}>Calories</label>
                <input type="number" value={formData.calories} onChange={(e) => setFormData({ ...formData, calories: e.target.value })} placeholder="e.g. 450" style={inputStyle} />
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
              <div>
                <label style={{ display: "block", marginBottom: "0.4rem", fontWeight: 500, fontSize: "0.9rem" }}>Image URL</label>
                <input value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} placeholder="https://images.unsplash.com/..." style={inputStyle} />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "0.4rem", fontWeight: 500, fontSize: "0.9rem" }}>Tags (comma separated)</label>
                <input value={formData.tags} onChange={(e) => setFormData({ ...formData, tags: e.target.value })} placeholder="popular, spicy, new" style={inputStyle} />
              </div>
            </div>
            <div style={{ marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <input type="checkbox" id="available" checked={formData.isAvailable} onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })} />
              <label htmlFor="available" style={{ fontWeight: 500, cursor: "pointer" }}>Available for order</label>
            </div>
            {formData.image && (
              <div style={{ marginBottom: "1rem" }}>
                <img src={formData.image} alt="preview" style={{ height: "120px", borderRadius: "8px", objectFit: "cover" }} onError={(e) => e.target.style.display = "none"} />
              </div>
            )}
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button type="submit" disabled={saving} style={{ background: "#FF6B35", color: "#FFFFFF", border: "none", padding: "0.65rem 1.5rem", borderRadius: "8px", cursor: "pointer", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <Check size={16} /> {saving ? "Saving..." : editingId ? "Update" : "Create"}
              </button>
              <button type="button" onClick={resetForm} style={{ background: "#F5F5F5", color: "#666", border: "none", padding: "0.65rem 1.5rem", borderRadius: "8px", cursor: "pointer", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <X size={16} /> Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Products Table */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "3rem", color: "#666" }}>Loading products...</div>
      ) : products.length === 0 ? (
        <div style={{ textAlign: "center", padding: "3rem", background: "#FFFFFF", borderRadius: "16px", color: "#666" }}>No products yet. Add your first one!</div>
      ) : (
        <div style={{ background: "#FFFFFF", borderRadius: "16px", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#F9F9F9", borderBottom: "2px solid #EEE" }}>
                  {["Image", "Name", "Category", "Price", "Status", "Actions"].map((h) => (
                    <th key={h} style={{ padding: "0.85rem 1rem", textAlign: "left", fontSize: "0.85rem", color: "#666", fontWeight: 600 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} style={{ borderBottom: "1px solid #F0F0F0" }}>
                    <td style={{ padding: "0.85rem 1rem" }}>
                      <img src={product.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&q=80"} alt={product.name} style={{ width: "48px", height: "48px", borderRadius: "8px", objectFit: "cover" }} />
                    </td>
                    <td style={{ padding: "0.85rem 1rem" }}>
                      <p style={{ margin: 0, fontWeight: 600, fontSize: "0.95rem" }}>{product.name}</p>
                      <p style={{ margin: "0.2rem 0 0", color: "#666", fontSize: "0.8rem" }}>{product.tags?.join(", ")}</p>
                    </td>
                    <td style={{ padding: "0.85rem 1rem", color: "#666", fontSize: "0.9rem" }}>{product.category?.name}</td>
                    <td style={{ padding: "0.85rem 1rem", fontWeight: 700, color: "#FF6B35" }}>{product.price?.toLocaleString()} RWF</td>
                    <td style={{ padding: "0.85rem 1rem" }}>
                      <span style={{ background: product.isAvailable ? "#F0FDF4" : "#FEF2F2", color: product.isAvailable ? "#16A34A" : "#EF4444", padding: "0.3rem 0.75rem", borderRadius: "999px", fontSize: "0.8rem", fontWeight: 600 }}>
                        {product.isAvailable ? "Available" : "Unavailable"}
                      </span>
                    </td>
                    <td style={{ padding: "0.85rem 1rem" }}>
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <button onClick={() => handleEdit(product)} style={{ background: "#F5F5F5", border: "none", padding: "0.45rem 0.75rem", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.85rem", fontWeight: 500 }}>
                          <Pencil size={14} /> Edit
                        </button>
                        <button onClick={() => handleDelete(product._id)} style={{ background: "#FEF2F2", border: "none", padding: "0.45rem 0.75rem", borderRadius: "8px", cursor: "pointer", color: "#EF4444", display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.85rem", fontWeight: 500 }}>
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;