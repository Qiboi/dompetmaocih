import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Category from "@/models/Category";

connectDB();

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        const categories = await Category.find();
        return NextResponse.json({ success: true, data: categories });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Failed to fetch categories", error },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        const { name } = await req.json();
        if (!name) {
            return NextResponse.json(
                { success: false, message: "All fields are required" },
                { status: 400 }
            );
        }

        const newCategory = new Category({ name });
        await newCategory.save();

        return NextResponse.json({
            success: true,
            data: newCategory,
            message: "Category added successfully",
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Failed to add category", error },
            { status: 500 }
        );
    }
}
