import { Input } from "@/components/ui/input";

import {
  SettingsCard,
  SettingsCardContent,
  SettingsCardFooter,
  SettingsCardHeader,
} from "./settings-card";

export default function EmailCard({ email }: { email: string }) {
  return (
    <SettingsCard>
      <SettingsCardContent>
        <SettingsCardHeader
          title="Email Address"
          description="The email address associated with your account."
        />
        <Input value={email} disabled className="w-80 bg-transparent" />
      </SettingsCardContent>
      <SettingsCardFooter>
        <p className="text-sm text-muted-foreground">
          Your email cannot be changed.
        </p>
      </SettingsCardFooter>
    </SettingsCard>
  );
}
