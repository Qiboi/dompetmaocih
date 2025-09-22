import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Schedule from "@/models/Schedule";
import "@/models/Category";
import "@/models/Member";

connectDB();

export async function GET() {
    try {
        const schedules = await Schedule.find().populate("category").populate("members");
        return NextResponse.json({ success: true, data: schedules });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Failed to fetch schedules", error: (error as Error).message },
            { status: 500 }
        );

    }
}

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    try {
        const { category, amount, frequency, startDate, endDate, members } = await req.json();

        if (!category || !amount || !frequency || !startDate || !members?.length) {
            return NextResponse.json({ success: false, message: "All fields are required" }, { status: 400 });
        }

        const newSchedule = new Schedule({
            category,
            amount,
            frequency,
            startDate,
            endDate,
            members,
        });

        await newSchedule.save();

        return NextResponse.json({ success: true, data: newSchedule, message: "Schedule created successfully" });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Failed to create schedule", error }, { status: 500 });
    }
}
