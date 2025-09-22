"use client";

import { useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { type ProfileProps } from "@/types/profile";
import Image from "next/image";

export default function ProfileCard({
  email,
  username,
  bio,
  photoUrl,
  name,
}: ProfileProps) {
  const supabase = createClient();
  // for photo
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  // state vars go here
  // auth
  const [userId, setUserId] = useState<string | null>(null);
  // basic user info.
  const [uname, setUname] = useState(username);
  const [userBio, setUserBio] = useState(bio || "");
  const [fullName, setFullName] = useState(name || "");
  // profile photo
  const [profilePhoto, setProfilePhoto] = useState(
    photoUrl || "/images/hero.png"
  );
  const [uploading, setUploading] = useState(false);
  // main editing state
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // handle login error
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) setUserId(user.id);
      else setError("You must be logged in to edit your profile.");
    });
  }, [supabase]);

  // handle editing
  const handleSave = async () => {
    if (!userId) {
      setError("Cannot update profile: user not logged in.");
      return;
    }
    if (!uname.trim()) {
      setError("Username cannot be empty");
      return;
    }

    const { error } = await supabase
      .from("users")
      .update({ username: uname, bio: userBio, name: fullName })
      .eq("id", userId);

    if (error) setError(error.message);
    else {
      setError(null);
      setEditing(false);
      alert("Profile updated!");
    }
  };

  // handle changing profile photo
  async function handleChangePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files.length === 0 || !userId) return;
    const file = e.target.files[0];
    const fileExt = file.name.split(".").pop()?.toLowerCase();
    if (!fileExt) {
      setError("Invalid file type.");
      return;
    }

    const fileName = `${userId.toLowerCase()}.${fileExt}`;
    const filePath = `avatars/${userId.toLowerCase()}/${fileName}`;

    try {
      setUploading(true);
      setError(null);

      // Upload file to Supabase Storage (private bucket)
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Get a signed URL (valid for 1 hour)
      const { data: signedUrlData, error: signedUrlError } =
        await supabase.storage.from("avatars").createSignedUrl(filePath, 3600); // 1 hour

      if (signedUrlError) throw signedUrlError;

      // Update local state
      setProfilePhoto(signedUrlData.signedUrl);

      // Update user record in "users" table
      const { error: updateError } = await supabase
        .from("users")
        .update({ photo_url: signedUrlData.signedUrl })
        .eq("id", userId);

      if (updateError) throw updateError;

      alert("Profile photo updated!");
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("An unexpected error occurred");
    } finally {
      setUploading(false);
    }
  }

  return (
    <section
      id="profile-client"
      className="flex flex-col items-center gap-6 p-8 bg-zinc-700/90 dark:bg-zinc-200/90 text-zinc-50 dark:text-zinc-900 shadow-lg rounded-2xl transition-all duration-300 hover:shadow-xl"
    >
      <div
        className={`relative w-28 h-28 rounded-full overflow-hidden shadow-md border-2 border-zinc-100/5 dark:border-zinc-900/10 cursor-pointer ${
          uploading ? "opacity-50" : ""
        }`}
        onClick={() => fileInputRef.current?.click()}
      >
        <Image
          src={profilePhoto}
          alt={`${username} profile`}
          fill
          className="object-cover"
        />
        {uploading && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-sm font-medium">
            Uploading...
          </div>
        )}
      </div>

      {/* hidden file input */}
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleChangePhoto}
      />

      <div className="text-center w-full max-w-sm">
        <label className="text-sm font-medium">Full Name</label>
        {editing ? (
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full p-2 rounded border text-black mt-1"
          />
        ) : (
          <h2 className="font-semibold text-xl mt-1">
            {fullName || "Anonymous"}
          </h2>
        )}
      </div>

      <div className="text-center w-full max-w-sm">
        <label className="text-sm font-medium">Username</label>
        {editing ? (
          <input
            type="text"
            value={uname}
            onChange={(e) => setUname(e.target.value)}
            className="w-full p-2 rounded border text-black mt-1"
          />
        ) : (
          <h2 className="font-bold text-2xl mt-1">@{uname}</h2>
        )}
      </div>

      <div className="text-center w-full max-w-sm">
        <label className="text-sm font-medium">Bio</label>
        {editing ? (
          <textarea
            value={userBio}
            onChange={(e) => setUserBio(e.target.value)}
            className="w-full p-2 mt-1 rounded border text-black"
            placeholder="Add a bio..."
          />
        ) : (
          <p className="text-sm text-zinc-300 dark:text-zinc-700 mt-1">
            {userBio || "No bio added yet"}
          </p>
        )}
      </div>

      <div className="text-center w-full max-w-sm">
        <label className="text-sm font-medium">Email</label>
        <p className="text-sm text-zinc-400 dark:text-zinc-600 mt-1">{email}</p>
      </div>

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

      <button
        onClick={editing ? handleSave : () => setEditing(true)}
        className="mt-4 px-6 py-2 rounded-md bg-zinc-50 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-100 dark:text-zinc-900"
      >
        {editing ? "Save Changes" : "Edit Profile"}
      </button>
    </section>
  );
}
