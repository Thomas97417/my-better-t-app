import { createFileRoute, redirect } from "@tanstack/react-router";
import { api } from "@my-better-t-app/backend/convex/_generated/api";
import { useUploadFile } from "@convex-dev/r2/react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Upload, X, ImageIcon } from "lucide-react";

export const Route = createFileRoute("/upload")({
  head: () => ({
    meta: [
      { title: "Upload — Toma Stack" },
      {
        name: "description",
        content: "Upload images to your R2 storage bucket.",
      },
    ],
  }),
  beforeLoad: async ({ context }) => {
    if (!context.isAuthenticated) {
      throw redirect({ to: "/sign-in" });
    }
  },
  component: UploadPage,
});

function UploadPage() {
  const uploadFile = useUploadFile(api.example);
  const imageInput = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setSelectedImage(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    } else {
      setPreview(null);
    }
  }

  function clearSelection() {
    setSelectedImage(null);
    setPreview(null);
    if (imageInput.current) {
      imageInput.current.value = "";
    }
  }

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedImage) return;

    setIsUploading(true);
    try {
      await uploadFile(selectedImage);
      toast.success("Image uploaded successfully.");
      clearSelection();
    } catch {
      toast.error("Failed to upload image.");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <div className="flex flex-col gap-1 pb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Upload</h1>
        <p className="text-muted-foreground text-sm">
          Upload images to your storage bucket.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upload Image</CardTitle>
          <CardDescription>
            Select an image file to upload. Supported formats: JPG, PNG, GIF,
            WebP.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpload} className="flex flex-col gap-4">
            {preview ? (
              <div className="relative">
                <img
                  src={preview}
                  alt="Preview"
                  className="max-h-64 w-full rounded-lg border object-contain"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  className="absolute top-2 right-2 hover:cursor-pointer bg-background/80 backdrop-blur-sm"
                  onClick={clearSelection}
                >
                  <X className="size-3" />
                </Button>
              </div>
            ) : (
              <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed p-8 transition-colors hover:bg-muted/50">
                <ImageIcon className="text-muted-foreground size-8" />
                <span className="text-muted-foreground text-sm">
                  Click to select an image
                </span>
                <input
                  type="file"
                  accept="image/*"
                  ref={imageInput}
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            )}

            <Button
              type="submit"
              disabled={!selectedImage || isUploading}
              className="hover:cursor-pointer"
            >
              {isUploading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <>
                  <Upload className="size-4" />
                  Upload
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
