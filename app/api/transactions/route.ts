import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Transaction from "@/models/Transaction";
import Member from "@/models/Member";

connectDB();

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        const { searchParams } = new URL(req.url);
        const member = searchParams.get("member");
        const category = searchParams.get("category");

        const filter: Record<string, string> = {};
        if (member) filter.member = member;
        if (category) filter.category = category;

        const transactions = await Transaction.find(filter)
            .populate("member", "name balance")
            .populate("category", "name");

        return NextResponse.json({ success: true, data: transactions });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Failed to fetch transactions", error },
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

        const { member, category, amount, type, date, note } = await req.json();

        if (!member || !category || !amount || !type) {
            return NextResponse.json(
                { success: false, message: "Member, category, amount, and type are required" },
                { status: 400 }
            );
        }

        // Buat transaksi baru
        const newTransaction = new Transaction({
            member,
            category,
            amount,
            type,
            date: date ?? new Date(),
            note,
        });

        await newTransaction.save();

        // Update saldo member
        const memberDoc = await Member.findById(member);
        if (!memberDoc) {
            return NextResponse.json(
                { success: false, message: "Member not found" },
                { status: 404 }
            );
        }

        if (type === "deposit") {
            memberDoc.balance += amount;
        } else if (type === "withdraw") {
            memberDoc.balance -= amount;
        }

        await memberDoc.save();

        return NextResponse.json({
            success: true,
            data: newTransaction,
            message: "Transaction created successfully",
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Failed to create transaction", error },
            { status: 500 }
        );
    }
}
