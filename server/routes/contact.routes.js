import express from "express";
import { submitContact, getAllContacts, markAsRead, deleteContact } from "../controllers/contact.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { adminOnly } from "../middleware/admin.middleware.js";

const router = express.Router();

router.post("/", submitContact);
router.get("/", protect, adminOnly, getAllContacts);
router.put("/:id/read", protect, adminOnly, markAsRead);
router.delete("/:id", protect, adminOnly, deleteContact);

export default router;
