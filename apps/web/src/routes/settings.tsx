import { api } from "@my-better-t-app/backend/convex/_generated/api";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useQuery } from "convex/react";

import DeleteAccountCard from "@/components/settings/delete-account-card";
import EmailCard from "@/components/settings/email-card";
import UpdateNameCard from "@/components/settings/update-name-card";

export const Route = createFileRoute("/settings")({
  beforeLoad: async ({ context }) => {
    if (!context.isAuthenticated) {
      throw redirect({ to: "/sign-in" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const user = useQuery(api.auth.getCurrentUser);

  if (!user) return null;

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 p-4">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your account settings.
        </p>
      </div>
      <UpdateNameCard name={user.name} />
      <EmailCard email={user.email} />
      <DeleteAccountCard />
    </div>
  );
}
