import mongoose, { Schema, Document, Types } from "mongoose";

export type Frequency = "daily" | "weekly" | "monthly";

export interface ISchedule extends Document {
    _id: string;
    category: Types.ObjectId;
    amount: number;
    frequency: Frequency;
    startDate: Date;
    endDate?: Date;
    members: Types.ObjectId[];
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const ScheduleSchema = new Schema<ISchedule>(
    {
        category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
        amount: { type: Number, required: true },
        frequency: { type: String, enum: ["daily", "weekly", "monthly"], required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date },
        members: [{ type: Schema.Types.ObjectId, ref: "Member" }],
        active: { type: Boolean, default: true },
    },
    { timestamps: true }
);

ScheduleSchema.index({ category: 1, frequency: 1 });

export default mongoose.models.Schedule || mongoose.model<ISchedule>("Schedule", ScheduleSchema);
