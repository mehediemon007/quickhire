import mongoose, { Document, Schema } from "mongoose";

export interface IJob extends Document {
    title: string;
    company: mongoose.Types.ObjectId;
    postedBy: mongoose.Types.ObjectId;
    location: string;
    category: string;
    description: string;
    featured: boolean;
    createdAt: Date;
}

const jobSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        company: { type: Schema.Types.ObjectId, ref: "Company", required: true },
        postedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
        location: { type: String, required: true },
        category: { type: String, required: true },
        description: { type: String, required: true },
        featured: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export default mongoose.model<IJob>("Job", jobSchema);
