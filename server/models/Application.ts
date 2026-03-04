import mongoose, { Document, Schema } from "mongoose";

export interface IApplication extends Document {
    job: mongoose.Types.ObjectId;
    applicant: mongoose.Types.ObjectId;
    company: mongoose.Types.ObjectId;
    name: string;
    email: string;
    resume_link: string;
    cover_note: string;
    status: string;
    createdAt: Date;
}

const applicationSchema: Schema = new Schema(
    {
        job: { type: Schema.Types.ObjectId, ref: "Job", required: true },
        applicant: { type: Schema.Types.ObjectId, ref: "User", required: true },
        company: { type: Schema.Types.ObjectId, ref: "Company", required: true },
        name: { type: String, required: true },
        email: { type: String, required: true },
        resume_link: { type: String, required: true },
        cover_note: { type: String, required: true },
        status: {
            type: String,
            enum: ["pending", "reviewed", "shortlisted", "rejected"],
            default: "pending",
        },
    },
    { timestamps: true }
);

// Prevent duplicate applications (same user applying to the same job twice)
applicationSchema.index({ job: 1, applicant: 1 }, { unique: true });

export default mongoose.model<IApplication>("Application", applicationSchema);
