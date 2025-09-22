"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Users, PiggyBank } from "lucide-react";
// import { useSession } from "next-auth/react";

interface SavingsSummaryProps {
    membersCount?: number | null;
    totalAmount?: number | null; // in smallest currency unit or whole (you decide)
    currency?: string; // e.g. 'IDR'
    loading?: boolean;
    compact?: boolean; // compact variant for navbar / small places
    onViewDetails?: () => void;
}

function formatCurrency(value: number | null | undefined, currency = "IDR") {
    if (value == null) return "—";
    try {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency,
            maximumFractionDigits: 0,
        }).format(value);
    } catch {
        return String(value);
    }
}

export default function SavingsSummary({
    membersCount = null,
    totalAmount = null,
    currency = "IDR",
    loading = false,
    compact = false,
    onViewDetails,
}: SavingsSummaryProps) {
    // const { data: session } = useSession();
    if (compact) {
        return (
            <div className="inline-flex items-center gap-3 px-3 py-2 rounded-full bg-white/90 shadow-sm backdrop-blur-md">
                <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-sky-600" />
                    <div className="text-sm">
                        <div className="text-xs text-slate-500">Anggota</div>
                        <div className="font-medium text-sm">{loading ? "—" : membersCount ?? "—"}</div>
                    </div>
                </div>
                <Separator orientation="vertical" className="h-6 mx-2" />
                <div className="flex items-center gap-2">
                    <PiggyBank className="h-5 w-5 text-amber-500" />
                    <div className="text-sm">
                        <div className="text-xs text-slate-500">Terkumpul</div>
                        <div className="font-medium text-sm">{loading ? "—" : formatCurrency(totalAmount, currency)}</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <Card className="w-full max-w-3xl mx-auto">
            <CardHeader className="flex items-center justify-between">
                <div>
                    <CardTitle>Ringkasan Tabungan</CardTitle>
                </div>
                <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="py-1">{loading ? "—" : `${membersCount ?? 0} anggota`}</Badge>
                </div>
            </CardHeader>

            <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-start gap-4">
                        <div className="rounded-lg p-3 bg-sky-50/60 flex items-center justify-center">
                            <Users className="h-7 w-7 text-sky-600" />
                        </div>
                        <div>
                            <div className="text-xs text-slate-500">Jumlah Anggota</div>
                            <div className="text-2xl font-semibold">{loading ? "—" : membersCount ?? "—"}</div>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="rounded-lg p-3 bg-amber-50/60 flex items-center justify-center">
                            <PiggyBank className="h-7 w-7 text-amber-500" />
                        </div>
                        <div>
                            <div className="text-xs text-slate-500">Terkumpul</div>
                            <div className="text-2xl font-semibold">{loading ? "—" : formatCurrency(totalAmount, currency)}</div>
                        </div>
                    </div>
                </div>

                <p className="mt-3 text-sm text-slate-500">
                    Ringkasan cepat jumlah anggota dan total saldo yang sudah terkumpul. Klik &quot;Lihat Detail&quot; untuk melihat daftar anggota dan transaksi.
                </p>
            </CardContent>

            <CardFooter className="flex items-center justify-between">
                <div className="text-sm text-slate-500">Terakhir diperbarui: sekarang</div>
                {/* <div className="flex items-center gap-2"> */}
                    <Button size="sm" className="text-sm" onClick={onViewDetails}>Lihat Detail</Button>
                    {/* <Button size="sm" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Tambah Setoran</Button> */}
                {/* </div> */}
            </CardFooter>
        </Card>
    );
}