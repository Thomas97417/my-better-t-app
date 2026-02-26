import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";

import {
  SettingsCard,
  SettingsCardContent,
  SettingsCardFooter,
  SettingsCardHeader,
} from "./settings-card";

export default function DeleteAccountCard() {
  const navigate = useNavigate();
  const [confirm, setConfirm] = useState(false);

  const handleDelete = async () => {
    await authClient.deleteUser({
      fetchOptions: {
        onSuccess: () => {
          navigate({ to: "/" });
          location.reload();
        },
        onError: (error) => {
          toast.error(error.error.message);
        },
      },
    });
  };

  return (
    <SettingsCard className="border-destructive">
      <SettingsCardContent>
        <SettingsCardHeader
          title="Delete Account"
          description="Permanently delete your account and all associated data. This action cannot be undone."
        />
      </SettingsCardContent>
      <SettingsCardFooter className="bg-destructive/10 dark:bg-destructive/10">
        <p className="text-sm text-muted-foreground">Proceed with caution.</p>
        <Button
          size="sm"
          variant="destructive"
          onClick={() => {
            if (confirm) {
              handleDelete();
            } else {
              setConfirm(true);
            }
          }}
          onBlur={() => setConfirm(false)}
        >
          {confirm ? "Are you sure?" : "Delete Account"}
        </Button>
      </SettingsCardFooter>
    </SettingsCard>
  );
}
