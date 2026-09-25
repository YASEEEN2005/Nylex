import mongoose from "mongoose";

const InvoiceItemSchema = new mongoose.Schema({
    description: { type: String, required: true },
    quantity: { type: Number, required: true, default: 1 },
    price: { type: Number, required: true, default: 0 },
    amount: { type: Number, required: true, default: 0 },
});

const InvoiceSchema = new mongoose.Schema(
    {
        invoiceNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        clientName: {
            type: String,
            required: true,
            trim: true,
        },
        clientEmail: {
            type: String,
            default: "",
        },
        clientPhone: {
            type: String,
            default: "",
        },
        clientCompany: {
            type: String,
            default: "",
        },
        issueDate: {
            type: Date,
            default: Date.now,
        },
        dueDate: {
            type: Date,
            default: () => new Date(+new Date() + 14 * 24 * 60 * 60 * 1000), // Default 14 days
        },
        items: [InvoiceItemSchema],
        subtotal: {
            type: Number,
            default: 0,
        },
        tax: {
            type: Number,
            default: 0,
        },
        discount: {
            type: Number,
            default: 0,
        },
        total: {
            type: Number,
            required: true,
            default: 0,
        },
        status: {
            type: String,
            enum: ["Pending", "Paid", "Cancelled"],
            default: "Pending",
        },
        notes: {
            type: String,
            default: "Thank you for partnering with NYLEX WEB STUDIO.",
        },
    },
    { timestamps: true }
);

export default mongoose.models.Invoice || mongoose.model("Invoice", InvoiceSchema);
