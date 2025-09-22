import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Member from "@/models/Member";

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

        const members = await Member.find();
        return NextResponse.json({ success: true, data: members });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Failed to fetch members", error },
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

        const { name, balance, active } = await req.json();

        if (!name) {
            return NextResponse.json(
                { success: false, message: "Name is required" },
                { status: 400 }
            );
        }

        const newMember = new Member({
            name,
            balance: balance ?? 0,
            active: active ?? true,
        });

        await newMember.save();
        return NextResponse.json({
            success: true,
            data: newMember,
            message: "Member added successfully",
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Failed to add member", error },
            { status: 500 }
        );
    }
}
