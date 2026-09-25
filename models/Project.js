import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
        },
        link: {
            type: String,
            default: "",
        },
        category: {
            type: String,
            enum: ["webdev", "webapp"],
            default: "webdev",
        },
        type: {
            type: String,
            default: "Web Development",
        },
        desc: {
            type: String,
            default: "",
        },
        image: {
            type: String,
            default: "/images/projects/inkjector.png",
        },
        tags: {
            type: [String],
            default: [],
        },
        result: {
            type: String,
            default: "",
        },
        featured: {
            type: Boolean,
            default: true,
        },
        order: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema);
