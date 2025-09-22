"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import SavingsSummary from "@/components/saving-summary";
import BackgroundDecor from "@/components/background-decor";
import { useSession } from "next-auth/react";

export default function LandingPage() {
  const { status } = useSession();

  const showSession = () => {
    if (status === "authenticated") {
      return (
        <Button asChild size="sm">
          <Link href="/dashboard">Dashboard</Link>
        </Button>
      )
    } else if (status === "loading") {
      return (
        <span className="text-[#888] text-sm mt-7">Loading...</span>
      )
    } else {
      return (
        <Button asChild size="sm">
          <Link href="/login">Login</Link>
        </Button>
      )
    }
  }

  const mockMembers = 12;
  const mockTotal = 3450000;

  return (
    <main className="relative min-h-screen flex flex-col overflow-x-hidden">
      <BackgroundDecor />
      {/* Navbar */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-6 sm:px-8 py-3 sm:py-4 bg-white/80 backdrop-blur-md rounded-full shadow-lg max-w-6xl w-[95%] md:w-[90%]">

        {/* Brand */}
        <div className="flex items-center gap-2">
          {/* <Image src="/logo.svg" alt="Logo" width={28} height={28} /> */}
          <span className="text-lg sm:text-xl font-bold text-sky-600">
            Dompet Ma Ocih
          </span>
        </div>

        {/* Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/about"
            className="text-slate-600 hover:text-sky-600 text-sm"
          >
            Tentang
          </Link>
          <Link
            href="/help"
            className="text-slate-600 hover:text-sky-600 text-sm"
          >
            Bantuan
          </Link>
          {showSession()}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64 sm:w-80">
              <SheetHeader>
                <SheetTitle className="text-sky-600 font-bold">
                  Menu
                </SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-4">
                <Link
                  href="/about"
                  className="text-slate-700 hover:text-sky-600 text-base"
                >
                  Tentang
                </Link>
                <Link
                  href="/help"
                  className="text-slate-700 hover:text-sky-600 text-base"
                >
                  Bantuan
                </Link>
                <Button asChild className="w-full mt-2">
                  <Link href="/login">Login</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center text-center px-6 pt-58 pb-16 sm:pt-48 sm:pb-20 lg:pt-24 lg:pb-0">
        {/* MOBILE/TABLET → ilustrasi di atas */}
        <div className="block lg:hidden mb-8">
          <Image
            src="/illustrations/finance-hero.svg"
            alt="Ilustrasi rekap setoran"
            width={400}
            height={400}
            className="mx-auto w-72 sm:w-96 h-auto"

          />
        </div>

        {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-40 h-40">

          <rect x="1" y="1" width="22" height="22" rx="7.656" fill="#f8de40" />


          <path d="M23 13.938a14.69 14.69 0 0 1-12.406 6.531c-5.542 0-6.563-1-9.142-2.529A7.66 7.66 0 0 0 8.656 23h6.688A7.656 7.656 0 0 0 23 15.344z" fill="#e7c930" />


          <g fill="#6b4f2b">
            <circle cx="8.7" cy="11.2" r="2.3" />
            <circle cx="15.3" cy="11.2" r="2.3" />

            <path d="M11 11.2h2" stroke="#6b4f2b" strokeWidth="1" strokeLinecap="round" />
            <path d="M6.4 11.2h1.5M16.1 11.2h1.5" stroke="#6b4f2b" strokeWidth="1" strokeLinecap="round" />
          </g>


          <g fill="#864e20">
            <path d="M7.2 8.8c.4-.1.8-.2 1.2-.2s.8.1 1.2.2l.2-.4c-.5-.2-1-.3-1.4-.3s-.9.1-1.4.3z" />
            <path d="M14.6 8.8c.4-.1.8-.2 1.2-.2s.8.1 1.2.2l.2-.4c-.5-.2-1-.3-1.4-.3s-.9.1-1.4.3z" />
          </g>


          <path d="M12 17.2a5.2 5.2 0 0 0 3.9-1.6c.2-.2.1-.5-.2-.5H8.3c-.3 0-.4.3-.2.5a5.2 5.2 0 0 0 3.9 1.6z" fill="#864e20" />

          <path d="M7.5 14.3c.2-.3.5-.5.9-.5s.7.2.9.5M15.2 14.3c.2-.3.5-.5.9-.5s.7.2.9.5"
            fill="none" stroke="#864e20" strokeWidth="0.8" strokeLinecap="round" />
        </svg> */}


        {/* Headline + CTA */}
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight">
            Catat Setoran
          </h1>
          <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight text-sky-600">
            Jaga Kebersamaan
          </h1>
          <p className="mt-4 text-slate-600 max-w-xl mx-auto">
            Aplikasi rekap setoran keluarga — praktis, transparan, dan mudah dipantau.
          </p>
          <div className="flex justify-center gap-4 mt-4">
            {/* CTA diarahkan ke rekapan publik */}
            <Button asChild size="lg">
              <Link href="/rekapan">Lihat Rekapan</Link>
            </Button>
          </div>
        </div>

        <div className="w-full px-6 mt-8">
          <SavingsSummary membersCount={mockMembers} totalAmount={mockTotal} currency="IDR" onViewDetails={() => alert("Lihat detail (mock)")} />
        </div>

        {/* DESKTOP → tampilkan 3 ilustrasi */}
        <div className="hidden lg:grid grid-cols-3 gap-8 mt-10 px-6 md:px-20 lg:px-40">
          <Image
            src="/illustrations/goals-hero.svg"
            alt="Ilustrasi rekap setoran"
            width={280}
            height={280}
            className="mx-auto"
            priority
          />
          <Image
            src="/illustrations/finance-hero.svg"
            alt="Ilustrasi rekap setoran"
            width={400}
            height={400}
            className="mx-auto"
            priority
          />
          <Image
            src="/illustrations/progress-hero.svg"
            alt="Ilustrasi rekap setoran"
            width={260}
            height={260}
            className="mx-auto"
            priority
          />
        </div>
      </section>
    </main>
  );
}
