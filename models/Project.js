import mongoose from "mongoose";

const QuotationSchema = new mongoose.Schema({
    name: String,
    price: Number,
    requestDate: Date,
    responseDate: Date,
    isReceived: {
        type: Boolean,
        default: false,
    },
    isSaved: {
        type: Boolean,
        default: false,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    requestDate: Date,
    expirationDate: Date,
    isCompleted: {
        type: Boolean,
        default: false,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },

    // 🔥 AQUÍ están embebidas las cotizaciones
    quotations: [QuotationSchema],

}, { timestamps: true });

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema);