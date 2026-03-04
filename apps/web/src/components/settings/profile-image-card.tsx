import { useRef, useState } from "react";
import { api } from "@my-better-t-app/backend/convex/_generated/api";
import { useUploadFile } from "@convex-dev/r2/react";
import { useQuery } from "convex/react";
import { toast } from "sonner";
import { Loader2, Camera, User } from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

import {
  SettingsCard,
  SettingsCardContent,
  SettingsCardFooter,
  SettingsCardHeader,
} from "./settings-card";

export default function ProfileImageCard({
  image,
}: {
  image: string | undefined;
}) {
  const uploadFile = useUploadFile(api.example);
  const fileInput = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const metadata = useQuery(
    api.example.getMetadata,
    image ? { key: image } : "skip",
  );

  const imageUrl = metadata?.url;

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const key = await uploadFile(file);
      await authClient.updateUser(
        { image: key },
        {
          onSuccess: () => {
            toast.success("Profile image updated.");
          },
          onError: (error) => {
            toast.error(error.error.message);
          },
        },
      );
    } catch {
      toast.error("Failed to upload image.");
    } finally {
      setIsUploading(false);
      if (fileInput.current) {
        fileInput.current.value = "";
      }
    }
  }

  return (
    <SettingsCard>
      <SettingsCardContent>
        <SettingsCardHeader
          title="Profile Image"
          description="This is your profile picture. Click below to change it."
        />
        <div className="flex items-center gap-4">
          <div className="relative size-20 shrink-0 overflow-hidden rounded-full border bg-muted">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Profile"
                className="size-full object-cover"
              />
            ) : (
              <div className="flex size-full items-center justify-center">
                <User className="size-8 text-muted-foreground" />
              </div>
            )}
          </div>
          <input
            ref={fileInput}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={isUploading}
            onClick={() => fileInput.current?.click()}
          >
            {isUploading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                <Camera className="size-4" />
                Change
              </>
            )}
          </Button>
        </div>
      </SettingsCardContent>
      <SettingsCardFooter>
        <p className="text-sm text-muted-foreground">
          Accepted formats: JPG, PNG, GIF, WebP.
        </p>
      </SettingsCardFooter>
    </SettingsCard>
  );
}
