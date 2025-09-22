import bcrypt from "bcryptjs";
import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    _id: string;
    username: string;
    password: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
}, { timestamps: true });

UserSchema.pre<IUser>("save", async function (next) {
    if (!this.isModified("password")) return next();
    const saltRounds = 10;
    const hash = await bcrypt.hash(this.password, saltRounds);
    this.password = hash;
    next();
});

UserSchema.methods.comparePassword = function (candidate: string) {
    return bcrypt.compare(candidate, this.password);
};

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);