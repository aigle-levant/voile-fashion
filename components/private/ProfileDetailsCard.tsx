"use client";

import { type ProfileDetailsProps } from "@/types/profile";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function ProfileDetailsCard({
  email,
  username,
}: ProfileDetailsProps) {
  const [uname, setUname] = useState(username || "");
  const [isClicked, setIsClicked] = useState(false);
  //   error handling
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  async function handleUsernameSubmission(
    e: React.MouseEvent<HTMLButtonElement>
  ) {
    e.preventDefault();

    if (isClicked) {
      // if username is empty
      if (!uname.trim()) {
        setError("Username cannot be empty");
        return;
      }
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { error } = await supabase
          .from("users")
          .upsert({ id: user.id, username: uname })
          .eq("id", user.id);
        if (error) {
          setError(error.message);
        } else {
          setError(null);
          setIsClicked(false);
          alert("Username updated successfully!");
        }
      }
    } else {
      setIsClicked(true);
    }
  }

  return (
    <section
      id="profile-details-wrapper"
      className="mx-auto flex flex-col rounded-md bg-zinc-600 text-zinc-50 dark:bg-zinc-400 dark:text-zinc-950 shadow-md p-6 gap-6"
    >
      <h1 className=" font-semibold text-3xl text-left">Profile Details</h1>
      <div id="profile-details">
        <div id="username-details-wrapper" className="flex flex-col gap-2">
          <h2 className="font-medium text-xl text-left">Username</h2>
          <div
            id="username-input-wrapper"
            className="flex flex-row justify-between"
          >
            {isClicked ? (
              <input
                type="text"
                minLength={1}
                name="username"
                value={uname}
                onChange={(e) => setUname(e.target.value)}
                placeholder="Enter username here"
                className="p-2 border text-zinc-950"
              />
            ) : (
              <p className="font-light text-lg text-left">
                @{username || "Not set"}
              </p>
            )}
            <button
              type="button"
              onClick={handleUsernameSubmission}
              className="btn rounded-md  bg-zinc-50 px-4 py-2 font-sans text-zinc-950 dark:bg-zinc-50 dark:text-zinc-950"
            >
              {isClicked ? "Submit" : "Edit"}
            </button>
          </div>
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        <div id="email-details-wrapper" className="flex flex-col gap-2">
          <h2 className="font-medium text-xl text-left">Email Address</h2>
          <p className="font-light text-lg text-left">{email}</p>
        </div>
      </div>
    </section>
  );
}
