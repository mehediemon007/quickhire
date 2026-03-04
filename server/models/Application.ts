import mongoose, { Document, Schema } from "mongoose";

export interface IApplication extends Document {
    job_id: mongoose.Types.ObjectId;
    name: string;
    email: string;
    resume_link: string;
    cover_note: string;
    createdAt: Date;
}

const applicationSchema: Schema = new Schema(
    {
        job_id: { type: Schema.Types.ObjectId, ref: "Job", required: true },
        name: { type: String, required: true },
        email: { type: String, required: true },
        resume_link: { type: String, required: true },
        cover_note: { type: String, required: true },
    },
    { timestamps: true }
);

export default mongoose.model<IApplication>("Application", applicationSchema);
