"use client";

import React from "react";

export default function BackgroundDecor() {
    return (
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            {/* radial overlay pakai muted */}
            <div
                className="absolute inset-0"
                style={{
                    background: `
            radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, transparent 70%),
            radial-gradient(ellipse at 10% 20%, var(--muted) 0%, transparent 25%),
            radial-gradient(ellipse at 90% 80%, var(--muted) 0%, transparent 25%)`,
                }}
            />

            {/* Left blob (primary) */}
            <div className="hidden lg:block absolute -left-20 top-10 transform-gpu">
                <svg
                    width="520"
                    height="520"
                    viewBox="0 0 520 520"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[32rem] h-[32rem] opacity-20 blur-3xl"
                >
                    <circle cx="260" cy="400" r="200" fill="var(--primary)" />
                </svg>
            </div>

            {/* Right blob (accent + sky-500 campuran) */}
            <div className="hidden lg:block absolute -right-20 bottom-10 transform-gpu">
                <svg
                    width="520"
                    height="520"
                    viewBox="0 0 520 520"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[28rem] h-[28rem] opacity-25 blur-2xl"
                >
                    <defs>
                        <linearGradient id="g-right" x1="0" x2="1">
                            <stop offset="0" stopColor="var(--accent)" stopOpacity="0.9" />
                            <stop offset="1" stopColor="var(--color-sky-500)" stopOpacity="0.85" />
                        </linearGradient>
                    </defs>
                    <ellipse cx="260" cy="260" rx="220" ry="180" fill="url(#g-right)" />
                </svg>
            </div>

            {/* Top-right blob tambahan */}
            <div className="hidden lg:block absolute top-[-40px] right-[200px] transform-gpu">
                <svg
                    width="400"
                    height="400"
                    viewBox="0 0 400 400"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[20rem] h-[20rem] opacity-25 blur-[100px]"
                >
                    <circle cx="200" cy="200" r="160" fill="var(--color-violet-800)" />
                </svg>
            </div>

            {/* noise overlay */}
            <div className="absolute inset-0 mix-blend-overlay opacity-5">
                <svg width="100%" height="100%">
                    <filter id="noise">
                        <feTurbulence baseFrequency="0.8" numOctaves="1" stitchTiles="stitch" />
                        <feColorMatrix type="saturate" values="0" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noise)" />
                </svg>
            </div>
        </div>
    );
}
