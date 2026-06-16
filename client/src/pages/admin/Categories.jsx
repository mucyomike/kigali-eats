import { useState, useEffect } from "react";
import { categoriesAPI } from "../../services/api";
import toast from "react-hot-toast";
import { Plus, Pencil, Trash2, X, Check } from "lucide-react";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: "", description: "", image: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await categoriesAPI.getAll();
      setCategories(res.data);
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
      if (editingId) {
        await categoriesAPI.update(editingId, formData);
        toast.success("Category updated!");
      } else {
        await categoriesAPI.create(formData);
        toast.success("Category created!");
      }
      setFormData({ name: "", description: "", image: "" });
      setShowForm(false);
      setEditingId(null);
      fetchCategories();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save category");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (cat) => {
    setFormData({ name: cat.name, description: cat.description || "", image: cat.image || "" });
    setEditingId(cat._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;
    try {
      await categoriesAPI.delete(id);
      setCategories(categories.filter((c) => c._id !== id));
      toast.success("Category deleted!");
    } catch (err) {
      toast.error("Failed to delete category");
    }
  };

  const inputStyle = { width: "100%", padding: "0.75rem 1rem", borderRadius: "8px", border: "1px solid #DDD", fontSize: "0.95rem", outline: "none", boxSizing: "border-box" };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <div>
          <h1 style={{ fontSize: "1.8rem", fontWeight: 700, marginBottom: "0.25rem" }}>Categories</h1>
          <p style={{ color: "#666", margin: 0 }}>Manage your menu categories</p>
        </div>
        <button
          onClick={() => { setShowForm(!showForm); setEditingId(null); setFormData({ name: "", description: "", image: "" }); }}
          style={{ background: "#FF6B35", color: "#FFFFFF", border: "none", padding: "0.65rem 1.25rem", borderRadius: "10px", cursor: "pointer", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.5rem" }}
        >
          <Plus size={18} /> Add Category
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div style={{ background: "#FFFFFF", borderRadius: "16px", padding: "1.5rem", marginBottom: "1.5rem", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1.25rem" }}>
            {editingId ? "Edit Category" : "New Category"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
              <div>
                <label style={{ display: "block", marginBottom: "0.4rem", fontWeight: 500, fontSize: "0.9rem" }}>Name *</label>
                <input required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="e.g. Burgers" style={inputStyle} />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "0.4rem", fontWeight: 500, fontSize: "0.9rem" }}>Image URL</label>
                <input value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} placeholder="https://images.unsplash.com/..." style={inputStyle} />
              </div>
            </div>
            <div style={{ marginBottom: "1.25rem" }}>
              <label style={{ display: "block", marginBottom: "0.4rem", fontWeight: 500, fontSize: "0.9rem" }}>Description</label>
              <input value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Short description..." style={inputStyle} />
            </div>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button type="submit" disabled={saving} style={{ background: "#FF6B35", color: "#FFFFFF", border: "none", padding: "0.65rem 1.5rem", borderRadius: "8px", cursor: "pointer", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <Check size={16} /> {saving ? "Saving..." : editingId ? "Update" : "Create"}
              </button>
              <button type="button" onClick={() => { setShowForm(false); setEditingId(null); }} style={{ background: "#F5F5F5", color: "#666", border: "none", padding: "0.65rem 1.5rem", borderRadius: "8px", cursor: "pointer", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <X size={16} /> Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Categories Grid */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "3rem", color: "#666" }}>Loading...</div>
      ) : categories.length === 0 ? (
        <div style={{ textAlign: "center", padding: "3rem", background: "#FFFFFF", borderRadius: "16px", color: "#666" }}>No categories yet. Create one!</div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1.25rem" }}>
          {categories.map((cat) => (
            <div key={cat._id} style={{ background: "#FFFFFF", borderRadius: "16px", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
              <img
                src={cat.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&q=80"}
                alt={cat.name}
                style={{ width: "100%", height: "140px", objectFit: "cover" }}
              />
              <div style={{ padding: "1rem" }}>
                <h3 style={{ margin: "0 0 0.25rem", fontWeight: 700 }}>{cat.name}</h3>
                <p style={{ margin: "0 0 1rem", color: "#666", fontSize: "0.85rem" }}>{cat.description || "No description"}</p>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button onClick={() => handleEdit(cat)} style={{ flex: 1, background: "#F5F5F5", border: "none", padding: "0.5rem", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem", fontWeight: 500, fontSize: "0.85rem" }}>
                    <Pencil size={14} /> Edit
                  </button>
                  <button onClick={() => handleDelete(cat._id)} style={{ flex: 1, background: "#FEF2F2", border: "none", padding: "0.5rem", borderRadius: "8px", cursor: "pointer", color: "#EF4444", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem", fontWeight: 500, fontSize: "0.85rem" }}>
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;