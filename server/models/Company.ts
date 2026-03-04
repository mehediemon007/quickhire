import mongoose, { Document, Schema } from "mongoose";

export interface ICompany extends Document {
    user: mongoose.Types.ObjectId;
    companyName: string;
    logo: string;
    location: string;
    area: string;
    companyLink: string;
    companyIndustry: string;
    companyDescription: string;
}

const companySchema: Schema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },
        companyName: { type: String, required: true, trim: true },
        logo: { type: String, default: "" },
        location: { type: String, required: true, trim: true },
        area: { type: String, default: "", trim: true },
        companyLink: { type: String, default: "", trim: true },
        companyIndustry: { type: String, required: true, trim: true },
        companyDescription: { type: String, required: true, trim: true },
    },
    { timestamps: true }
);

export default mongoose.model<ICompany>("Company", companySchema);
