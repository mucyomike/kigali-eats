import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
      image: String,
    },
  ],
  deliveryAddress: {
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
      default: "Kigali",
    },
    phone: {
      type: String,
      required: true,
    },
  },
  paymentMethod: {
    type: String,
    enum: ["momo", "cash"],
    default: "cash",
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "paid"],
    default: "pending",
  },
  orderStatus: {
    type: String,
    enum: ["received", "preparing", "on_the_way", "delivered", "cancelled"],
    default: "received",
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update updatedAt on every save
orderSchema.pre("save", function () {
  this.updatedAt = Date.now();
});
const Order = mongoose.model("Order", orderSchema);

export default Order;
