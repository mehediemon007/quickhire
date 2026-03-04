import mongoose, { Document, Schema } from "mongoose";

export interface IEmployerProfile extends Document {
    user: mongoose.Types.ObjectId;
    fullName: string;
    email: string;
    phone: string;
    designation: string;
    gender: string;
}

const employerProfileSchema: Schema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },
        fullName: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true, lowercase: true },
        phone: { type: String, default: "", trim: true },
        designation: { type: String, default: "", trim: true },
        gender: {
            type: String,
            enum: ["male", "female", "other", ""],
            default: "",
        },
    },
    { timestamps: true }
);

export default mongoose.model<IEmployerProfile>("EmployerProfile", employerProfileSchema);
