"use client";

import { useState } from "react";

export default function ImageUploadPreview({
  defaultImage,
  name,
}: {
  defaultImage?: string;
  name: string;
}) {
  const [preview, setPreview] = useState(defaultImage || "");
  const [uploadedUrl, setUploadedUrl] = useState("");

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // preview local
    const localUrl = URL.createObjectURL(file);
    setPreview(localUrl);

    // upload a Cloudinary API route
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.url) {
      setUploadedUrl(data.url);
    }
  }

  return (
    <div className="space-y-3">

      {/* preview */}
      {preview ? (
        <img
          src={preview}
          className="w-full h-48 object-cover rounded-xl border"
        />
      ) : (
        <div className="w-full h-48 border-2 border-dashed flex items-center justify-center text-gray-400 rounded-xl">
          Sin imagen
        </div>
      )}

      {/* file input */}
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="w-full border p-2 rounded-lg"
      />

      {/* ESTO ES LO IMPORTANTE */}
      <input type="hidden" name={name} value={uploadedUrl} />
    </div>
  );
}