"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { register } from "@/actions/register";

import { GalleryVerticalEnd } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function RegisterForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const [error, setError] = useState<string>();
    const router = useRouter();
    const ref = useRef<HTMLFormElement>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const r = await register({
            username: (formData.get("username") as string) || "",
            password: (formData.get("password") as string) || "",
            name: (formData.get("name") as string) || "",
        });

        if (r?.error) {
            setError(r.error);
            return;
        }

        ref.current?.reset();
        router.push("/login");
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <form ref={ref} onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-center gap-2">
                        <a
                            href="#"
                            className="flex flex-col items-center gap-2 font-medium"
                        >
                            <div className="flex size-8 items-center justify-center rounded-md">
                                <GalleryVerticalEnd className="size-6" />
                            </div>
                            <span className="sr-only">Acme Inc.</span>
                        </a>
                        <h1 className="text-xl font-bold">Welcome to Acme Inc.</h1>
                        <div className="text-center text-sm">
                            Already have an account?{" "}
                            <Link href="/login" className="underline underline-offset-4">
                                Login
                            </Link>
                        </div>
                        {error && (
                            <div className="text-red-500 text-sm font-medium">{error}</div>
                        )}
                    </div>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-3">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" name="name" type="text" placeholder="Name" required />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                name="username"
                                type="text"
                                placeholder="Username"
                                required
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Password"
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full">
                            Sign Up
                        </Button>
                    </div>
                </div>
            </form>
            <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                By clicking continue, you agree to our{" "}
                <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
            </div>
        </div>
    );
}
