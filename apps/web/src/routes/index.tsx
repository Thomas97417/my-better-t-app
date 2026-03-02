import { convexQuery } from "@convex-dev/react-query";
import { api } from "@my-better-t-app/backend/convex/_generated/api";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Authenticated, Unauthenticated } from "convex/react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

const TITLE_TEXT = `
 ████████╗ ██████╗ ███╗   ███╗ █████╗    ███████╗████████╗ █████╗  ██████╗██╗  ██╗
 ╚══██╔══╝██╔═══██╗████╗ ████║██╔══██╗   ██╔════╝╚══██╔══╝██╔══██╗██╔════╝██║ ██╔╝
    ██║   ██║   ██║██╔████╔██║███████║   ███████╗   ██║   ███████║██║     █████╔╝
    ██║   ██║   ██║██║╚██╔╝██║██╔══██║   ╚════██║   ██║   ██╔══██║██║     ██╔═██╗
    ██║   ╚██████╔╝██║ ╚═╝ ██║██║  ██║   ███████║   ██║   ██║  ██║╚██████╗██║  ██╗
    ╚═╝    ╚═════╝ ╚═╝     ╚═╝╚═╝  ╚═╝   ╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝
 `;

const FEATURES = [
  {
    title: "TanStack Start",
    description: "Full-stack SSR framework with file-based routing",
  },
  {
    title: "Convex",
    description: "Reactive backend with real-time sync",
  },
  {
    title: "Better Auth",
    description: "Email, Google & GitHub authentication",
  },
  {
    title: "Tailwind + shadcn/ui",
    description: "Utility-first styling with accessible components",
  },
];

function StatusBadge() {
  const healthCheck = useQuery(convexQuery(api.healthCheck.get, {}));

  const isOk = healthCheck.data === "OK";
  const isLoading = healthCheck.isLoading;

  return (
    <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs">
      <div
        className={`size-2 rounded-full ${isOk ? "bg-green-500" : isLoading ? "bg-orange-400 animate-pulse" : "bg-red-500"}`}
      />
      <span className="text-muted-foreground">
        {isLoading
          ? "Connecting..."
          : isOk
            ? "Backend connected"
            : "Connection error"}
      </span>
    </div>
  );
}

function HomeComponent() {
  return (
    <div className="container mx-auto flex max-w-3xl flex-col items-center gap-10 px-4 py-12">
      <div className="flex flex-col items-center gap-4">
        <pre className="text-primary overflow-x-auto font-mono text-[0.55rem] leading-tight sm:text-xs">
          {TITLE_TEXT}
        </pre>
        <p className="text-muted-foreground max-w-md text-center text-sm">
          A modern full-stack starter built with TanStack, Convex, and Better
          Auth.
        </p>
        <StatusBadge />
      </div>

      <div className="flex gap-3">
        <Authenticated>
          <Link to="/dashboard">
            <Button size="lg" className="hover:cursor-pointer">
              Go to Dashboard
            </Button>
          </Link>
        </Authenticated>
        <Unauthenticated>
          <Link to="/sign-in">
            <Button size="lg" className="hover:cursor-pointer">
              Get Started
            </Button>
          </Link>
          <Link to="/sign-up">
            <Button
              variant="outline"
              size="lg"
              className="hover:cursor-pointer"
            >
              Create Account
            </Button>
          </Link>
        </Unauthenticated>
      </div>

      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
        {FEATURES.map((feature) => (
          <div
            key={feature.title}
            className="flex flex-col gap-1 rounded-lg border p-4 transition-colors hover:bg-muted/50"
          >
            <h3 className="text-sm font-medium">{feature.title}</h3>
            <p className="text-muted-foreground text-xs">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
