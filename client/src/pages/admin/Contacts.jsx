import { useState, useEffect } from "react";
import { contactsAPI } from "../../services/api";
import toast from "react-hot-toast";
import { Mail, Trash2, CheckCircle } from "lucide-react";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await contactsAPI.getAll();
        setContacts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  const handleMarkAsRead = async (id) => {
    try {
      await contactsAPI.markAsRead(id);
      setContacts(contacts.map((c) => c._id === id ? { ...c, isRead: true } : c));
      toast.success("Marked as read");
    } catch (err) {
      toast.error("Failed to update");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this message?")) return;
    try {
      await contactsAPI.delete(id);
      setContacts(contacts.filter((c) => c._id !== id));
      toast.success("Message deleted");
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  const unread = contacts.filter((c) => !c.isRead).length;

  return (
    <div>
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: "1.8rem", fontWeight: 700, marginBottom: "0.25rem" }}>Contact Messages</h1>
        <p style={{ color: "#666", margin: 0 }}>
          {unread > 0 ? <span style={{ color: "#FF6B35", fontWeight: 600 }}>{unread} unread message{unread > 1 ? "s" : ""}</span> : "All messages read"}
        </p>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "3rem", color: "#666" }}>Loading messages...</div>
      ) : contacts.length === 0 ? (
        <div style={{ textAlign: "center", padding: "3rem", background: "#FFFFFF", borderRadius: "16px", color: "#666" }}>
          <Mail size={48} color="#DDD" style={{ marginBottom: "1rem" }} />
          <p>No messages yet</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {contacts.map((contact) => (
            <div
              key={contact._id}
              style={{ background: "#FFFFFF", borderRadius: "16px", padding: "1.5rem", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", borderLeft: `4px solid ${contact.isRead ? "#E5E7EB" : "#FF6B35"}` }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem", flexWrap: "wrap", gap: "0.75rem" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.25rem" }}>
                    <h3 style={{ margin: 0, fontWeight: 700, fontSize: "1rem" }}>{contact.name}</h3>
                    {!contact.isRead && (
                      <span style={{ background: "#FF6B35", color: "#FFFFFF", padding: "0.15rem 0.6rem", borderRadius: "999px", fontSize: "0.75rem", fontWeight: 600 }}>New</span>
                    )}
                  </div>
                  <p style={{ margin: 0, color: "#666", fontSize: "0.85rem" }}>
                    {contact.email} {contact.phone && `• ${contact.phone}`}
                  </p>
                  <p style={{ margin: "0.25rem 0 0", color: "#999", fontSize: "0.8rem" }}>
                    {new Date(contact.createdAt).toLocaleString()}
                  </p>
                </div>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  {!contact.isRead && (
                    <button
                      onClick={() => handleMarkAsRead(contact._id)}
                      style={{ background: "#F0FDF4", border: "none", color: "#16A34A", padding: "0.45rem 0.85rem", borderRadius: "8px", cursor: "pointer", fontWeight: 500, fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "0.4rem" }}
                    >
                      <CheckCircle size={14} /> Mark Read
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(contact._id)}
                    style={{ background: "#FEF2F2", border: "none", color: "#EF4444", padding: "0.45rem 0.85rem", borderRadius: "8px", cursor: "pointer", fontWeight: 500, fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "0.4rem" }}
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>
              <div style={{ background: "#F9F9F9", borderRadius: "8px", padding: "1rem" }}>
                <p style={{ margin: "0 0 0.5rem", fontWeight: 600, fontSize: "0.9rem" }}>Subject: {contact.subject}</p>
                <p style={{ margin: 0, color: "#555", lineHeight: 1.7, fontSize: "0.9rem" }}>{contact.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Contacts;