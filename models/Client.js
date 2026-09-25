import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Client name is required"],
            trim: true,
        },
        company: {
            type: String,
            default: "",
        },
        email: {
            type: String,
            trim: true,
            default: "",
        },
        phone: {
            type: String,
            trim: true,
            default: "",
        },
        status: {
            type: String,
            enum: ["Lead", "Active", "Completed"],
            default: "Active",
        },
        notes: {
            type: String,
            default: "",
        },
        totalBilled: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

export default mongoose.models.Client || mongoose.model("Client", ClientSchema);
