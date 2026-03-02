import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useQuery } from "convex/react";
import { api } from "@my-better-t-app/backend/convex/_generated/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Settings, Shield, Zap } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: async ({ context }) => {
    if (!context.isAuthenticated) {
      throw redirect({ to: "/" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const user = useQuery(api.auth.getCurrentUser);

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      {/* Header */}
      <div className="flex flex-col gap-1 pb-8">
        {user ? (
          <>
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome back, {user.name}
            </h1>
            <p className="text-muted-foreground text-sm">
              Here's an overview of your account.
            </p>
          </>
        ) : (
          <>
            <Skeleton className="h-8 w-64" />
            <Skeleton className="mt-1 h-4 w-48" />
          </>
        )}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="bg-primary/10 text-primary flex size-8 items-center justify-center rounded-lg">
                <Shield className="size-4" />
              </div>
              <CardTitle>Account</CardTitle>
            </div>
            <CardDescription>
              Manage your profile, email, and password.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/settings">
              <Button
                variant="outline"
                size="sm"
                className="hover:cursor-pointer"
              >
                <Settings className="size-3.5" />
                Settings
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="bg-primary/10 text-primary flex size-8 items-center justify-center rounded-lg">
                <Zap className="size-4" />
              </div>
              <CardTitle>Quick start</CardTitle>
            </div>
            <CardDescription>
              This is a starter template. Start building your app from here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-xs">
              Edit{" "}
              <code className="bg-muted rounded px-1 py-0.5 text-[0.7rem]">
                src/routes/dashboard.tsx
              </code>{" "}
              to customize this page.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-green-500/10 text-green-600 dark:text-green-400">
                <div className="size-2 rounded-full bg-green-500" />
              </div>
              <CardTitle>Status</CardTitle>
            </div>
            <CardDescription>All systems operational.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Authentication</span>
                <span className="text-green-600 dark:text-green-400">
                  Active
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Database</span>
                <span className="text-green-600 dark:text-green-400">
                  Connected
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
