import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Member from "@/models/Member";

connectDB();

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        const { id } = await params;
        const member = await Member.findById(id);

        if (!member) {
            return NextResponse.json(
                { success: false, message: "Member not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: member });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Failed to fetch member", error },
            { status: 500 }
        );
    }
}

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        const { id } = await params;
        const { name, balance, active } = await req.json();

        const updated = await Member.findByIdAndUpdate(
            id,
            { name, balance, active },
            { new: true, runValidators: true }
        );

        if (!updated) {
            return NextResponse.json(
                { success: false, message: "Member not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: updated,
            message: "Member updated successfully",
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Failed to update member", error },
            { status: 500 }
        );
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        const { id } = await params;
        const deleted = await Member.findByIdAndDelete(id);

        if (!deleted) {
            return NextResponse.json(
                { success: false, message: "Member not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Member deleted successfully",
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Failed to delete member", error },
            { status: 500 }
        );
    }
}
