import Contact from "../models/contact.model.js";

// Submit contact message (public)
export const submitContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    const contact = await Contact.create({
      name,
      email,
      phone,
      subject,
      message,
    });

    return res.status(201).json({
      message: "Message sent successfully",
      contact,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get all contacts (admin only)
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    return res.status(200).json(contacts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Mark contact as read (admin only)
export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    contact.isRead = true;
    const updatedContact = await contact.save();

    return res.status(200).json(updatedContact);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Delete contact (admin only)
export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findByIdAndDelete(id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    return res.status(200).json({ message: "Contact message deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
