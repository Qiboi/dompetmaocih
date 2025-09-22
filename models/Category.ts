import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
    _id: string;
    name: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>({
    name: { type: String, unique: true, required: true },
    description: { type: String },
}, { timestamps: true });

export default mongoose.models.Category || mongoose.model<ICategory>("Category", CategorySchema);