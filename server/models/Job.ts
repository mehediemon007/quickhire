import mongoose, { Document, Schema } from "mongoose";

export interface IJob extends Document {
    title: string;
    company: string;
    location: string;
    category: string;
    description: string;
    featured: boolean;
    createdAt: Date;
}

const jobSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        company: { type: String, required: true },
        location: { type: String, required: true },
        category: { type: String, required: true },
        description: { type: String, required: true },
        featured: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export default mongoose.model<IJob>("Job", jobSchema);
