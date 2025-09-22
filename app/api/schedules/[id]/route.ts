import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Schedule from "@/models/Schedule";

connectDB();

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const schedule = await Schedule.findById(id).populate("category").populate("members");

        if (!schedule) {
            return NextResponse.json({ success: false, message: "Schedule not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: schedule });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Failed to fetch schedule", error }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    try {
        const { category, amount, frequency, startDate, endDate, members, active } = await req.json();

        const updated = await Schedule.findByIdAndUpdate(
            params.id,
            { category, amount, frequency, startDate, endDate, members, active },
            { new: true, runValidators: true }
        );

        if (!updated) {
            return NextResponse.json({ success: false, message: "Schedule not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: updated, message: "Schedule updated successfully" });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Failed to update schedule", error }, { status: 500 });
    }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    try {
        const deleted = await Schedule.findByIdAndDelete(params.id);
        if (!deleted) {
            return NextResponse.json({ success: false, message: "Schedule not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, message: "Schedule deleted successfully" });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Failed to delete schedule", error }, { status: 500 });
    }
}
