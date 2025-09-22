import mongoose from "mongoose";
import TransactionModel from "../models/Transaction";
import MemberModel from "../models/Member";

export async function createTransactionAtomic({
    memberId,
    categoryId,
    amount,
    type,
    note,
}: {
    memberId: string;
    categoryId: string;
    amount: number;
    type: "deposit" | "withdraw";
    note?: string;
}) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const inc = type === "deposit" ? amount : -amount;

        if (type === "withdraw") {
            const member = await MemberModel.findById(memberId).session(session).select("balance");
            if (!member) throw new Error("Member tidak ditemukan");

            if ((member.balance ?? 0) < amount) {
                throw new Error("Saldo tidak cukup");
            }
        }

        const tx = await TransactionModel.create(
            [
                {
                    member: memberId,
                    category: categoryId,
                    amount,
                    type,
                    note,
                    date: new Date(),
                },
            ],
            { session }
        );

        await MemberModel.findByIdAndUpdate(
            memberId,
            { $inc: { balance: inc } },
            { session }
        );

        await session.commitTransaction();
        session.endSession();

        return tx[0];
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        throw err;
    }
}
