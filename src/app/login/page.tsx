import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { LoginForm } from "../../components/login-form";
import { Button } from "../../components/ui/button";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/">
            <Image src="/logo.svg" alt="Logo" width={40} height={40} />
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
            <a href="/client">
              <Button
                variant="default"
                className="w-full mt-4 rounded-full bg-purple-600 hover:bg-purple-700 text-white"
              >
                Login with 42
              </Button>
            </a>
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <div className="absolute inset-0 h-full w-full">
          <Image
            src="/about-top-banner.jpg"
            alt="Image"
            fill
            className="object-cover dark:brightness-[0.2] dark:grayscale"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    </div>
  );
}
