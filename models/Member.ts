import mongoose, { Schema, Document } from "mongoose";

export interface IMember extends Document {
    _id: string;
    name: string;
    balance?:  number;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const MemberSchema = new Schema<IMember>({
    name: { type: String, required: true },
    balance: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.models.Member || mongoose.model<IMember>("Member", MemberSchema);