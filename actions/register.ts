"use server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

interface RegisterValues {
    username: string;
    password: string;
    name: string;
}

export const register = async (values: RegisterValues) => {
    const { username, password, name } = values;

    try {
        await connectDB();

        const userFound = await User.findOne({ username });
        if (userFound) {
            return { error: "Username already exists!" };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            username,
            password: hashedPassword,
        });

        await user.save();

        return { success: true };
    } catch (e) {
        console.error("Register error:", e);
        return { error: "Something went wrong, please try again later." };
    }
};
