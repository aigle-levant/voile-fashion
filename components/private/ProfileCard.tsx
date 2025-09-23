"use client";

import { useState, useEffect } from "react";
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
  const [userId, setUserId] = useState<string | null>(null);
  // basic user info.
  const [uname, setUname] = useState(username);
  const [userBio, setUserBio] = useState(bio || "");
  const [fullName, setFullName] = useState(name || "");
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
  return (
    <section
      id="profile-client"
      className="w-full max-w-5xl mx-auto bg-zinc-800/90 dark:bg-zinc-100/90 rounded-none shadow-lg p-8 transition-all"
    >
      <div className="grid grid-cols-1 md:grid-cols-10 lg:grid-cols-10 gap-8 items-center">
        {/* image, username, bio on left */}
        {/* full name and other details on right */}
        {/* below is the user's collection */}
        <div
          id="left-side"
          className="flex flex-col col-start-2 col-end-4 items-center md:items-start"
        >
          {/* image */}
          <div className="relative w-40 h-40 rounded-full overflow-hidden border-2 border-zinc-200/10 dark:border-zinc-800/10 shadow-lg hover:scale-105 transition">
            <Image
              src={photoUrl || "/images/hero.png"}
              alt={`${username} profile`}
              fill
              className="object-cover"
            />
          </div>
          {/* username */}
          <div className="mt-4 w-full text-center md:text-left">
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
          {/* bio */}
          <div className="mt-2 w-full text-center md:text-left">
            {editing ? (
              <textarea
                value={userBio}
                onChange={(e) => setUserBio(e.target.value)}
                className="w-full p-2 mt-1 rounded border text-black"
                placeholder="Add a bio..."
              />
            ) : (
              <p className="text-m text-zinc-300 dark:text-zinc-700 mt-1">
                {userBio || "No bio added yet"}
              </p>
            )}
          </div>
        </div>

        <div
          id="right-side"
          className="mr-10 text-left space-y-4 col-start-5 col-end-10 flex flex-col justify-between"
        >
          <h2 className="text-xl">Other details</h2>
          <div className="flex flex-row gap-10">
            {/* name */}
            <div className=" w-full max-w-sm">
              <label className="text-sm font-medium">Full Name</label>
              {editing ? (
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full p-2 rounded border text-black mt-1"
                />
              ) : (
                <h2 className="font-medium  text-xl mt-1">
                  {fullName || "Unknown"}
                </h2>
              )}
            </div>
            {/* email */}
            <div className=" w-full max-w-sm">
              <label className="text-sm font-medium">Email</label>
              <p className="text-sm text-zinc-400 dark:text-zinc-600 mt-1">
                {email}
              </p>
            </div>
          </div>
          <button
            onClick={editing ? handleSave : () => setEditing(true)}
            className="mt-4 px-6 py-2 rounded-md bg-zinc-50 dark:bg-zinc-950 text-zinc-900 hover:bg-zinc-200 dark:text-zinc-50 dark:hover:bg-zinc-600 w-22"
          >
            {editing ? "Save Changes" : "Edit Profile"}
          </button>
        </div>
        <div></div>
        <div></div>
        <div></div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    </section>
  );
}
