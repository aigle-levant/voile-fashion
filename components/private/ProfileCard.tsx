import { type ProfileProps } from "@/types/profile";

export default function ProfileCard({ username }: ProfileProps) {
  return (
    <section
      id="profile-card"
      className="flex flex-col rounded-md bg-zinc-600 text-zinc-50 dark:bg-zinc-400 dark:text-zinc-950 shadow-md p-6 gap-6"
    >
      {/* username is displayed here */}
      {/* TODO: Add a way to add user photo */}
      <div id="main-user-wrapper">
        <p className="font-bold text-xl text-left mx-5">@ {username}</p>
      </div>
      {/* TODO: Add user bio */}
    </section>
  );
}
