import { GalleryVerticalEnd } from "lucide-react";
import { LoginForm } from "@/components/login-form";
import { Button } from "@/components/ui/button";

const FORTY_TWO_OAUTH_URL = `https://api.intra.42.fr/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_42_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_42_REDIRECT_URI}&response_type=code`;

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="/" className="flex items-center gap-2 font-medium">
            <img src="/42-logo.svg" alt="Logo" className="h-10 w-auto" />
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
            <a href={FORTY_TWO_OAUTH_URL}>
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
        <img
          src="/about-top-banner.jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
