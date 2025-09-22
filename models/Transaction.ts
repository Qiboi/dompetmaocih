import mongoose, { Schema, Document, Types } from "mongoose";

export type TransactionType = "deposit" | "withdraw";

export interface ITransaction extends Document {
    _id: string;
    member: Types.ObjectId;
    category: Types.ObjectId;
    amount: number;
    type: TransactionType;
    date: Date;
    note?: string;
    createdAt: Date;
    updatedAt: Date;
}

const TransactionSchema = new Schema<ITransaction>({
    member: { type: Schema.Types.ObjectId, ref: "Member" },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    amount: { type: Number, required: true },
    type: { type: String, enum: ["deposit", "withdraw"], default: "deposit" },
    date: { type: Date, default: Date.now },
    note: { type: String }
}, { timestamps: true });

TransactionSchema.index({ member: 1, date: -1 });
TransactionSchema.index({ category: 1, date: -1 });

export default mongoose.models.Transaction || mongoose.model<ITransaction>("Transaction", TransactionSchema);