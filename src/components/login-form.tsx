import { cn } from "@/lib/utils";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login via 42 auth</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Ready to discover unforgettable events?
        </p>
      </div>
      <div className="grid gap-6"></div>
    </form>
  );
}
