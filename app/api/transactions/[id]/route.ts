import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Transaction from "@/models/Transaction";
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
        const transaction = await Transaction.findById(id)
            .populate("member", "name balance")
            .populate("category", "name");

        if (!transaction) {
            return NextResponse.json(
                { success: false, message: "Transaction not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: transaction });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Failed to fetch transaction", error },
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
        const { member, category, amount, type, date, note } = await req.json();

        const oldTransaction = await Transaction.findById(id);
        if (!oldTransaction) {
            return NextResponse.json(
                { success: false, message: "Transaction not found" },
                { status: 404 }
            );
        }

        const oldMember = await Member.findById(oldTransaction.member);
        if (oldMember) {
            if (oldTransaction.type === "deposit") {
                oldMember.balance -= oldTransaction.amount;
            } else {
                oldMember.balance += oldTransaction.amount;
            }
            await oldMember.save();
        }

        oldTransaction.member = member ?? oldTransaction.member;
        oldTransaction.category = category ?? oldTransaction.category;
        oldTransaction.amount = amount ?? oldTransaction.amount;
        oldTransaction.type = type ?? oldTransaction.type;
        oldTransaction.date = date ?? oldTransaction.date;
        oldTransaction.note = note ?? oldTransaction.note;

        await oldTransaction.save();

        const newMember = await Member.findById(oldTransaction.member);
        if (newMember) {
            if (oldTransaction.type === "deposit") {
                newMember.balance += oldTransaction.amount;
            } else {
                newMember.balance -= oldTransaction.amount;
            }
            await newMember.save();
        }

        return NextResponse.json({
            success: true,
            data: oldTransaction,
            message: "Transaction updated successfully",
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Failed to update transaction", error },
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
        const transaction = await Transaction.findByIdAndDelete(id);

        if (!transaction) {
            return NextResponse.json(
                { success: false, message: "Transaction not found" },
                { status: 404 }
            );
        }

        const memberDoc = await Member.findById(transaction.member);
        if (memberDoc) {
            if (transaction.type === "deposit") {
                memberDoc.balance -= transaction.amount;
            } else {
                memberDoc.balance += transaction.amount;
            }
            await memberDoc.save();
        }

        return NextResponse.json({
            success: true,
            message: "Transaction deleted successfully",
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Failed to delete transaction", error },
            { status: 500 }
        );
    }
}
