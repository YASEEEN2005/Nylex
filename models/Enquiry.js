import mongoose from "mongoose";

const EnquirySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        phone: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            default: "",
        },
        service: {
            type: String,
            default: "webdev",
        },
        details: {
            type: String,
            default: "",
        },
        read: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

export default mongoose.models.Enquiry || mongoose.model("Enquiry", EnquirySchema);
