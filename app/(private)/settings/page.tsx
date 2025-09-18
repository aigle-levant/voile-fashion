import { LogoutButton } from "@/components/auth/logout-button";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function SettingsPage() {
  // to verify if the user is logged in
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims) {
    redirect("/auth/login");
  }
  return (
    <section className="flex flex-col rounded-md bg-zinc-600 text-zinc-50 dark:bg-zinc-400 dark:text-zinc-950 shadow-md p-6 gap-6">
      <div id="settings-wrapper">
        <h1 className="font-medium text-3xl text-left mb-10">Settings</h1>
        <hr className="my-5" />
        <div id="logout-wrapper" className="flex flex-row justify-between">
          <h2 className="text-xl text-left">Logout</h2>
          <LogoutButton />
        </div>
      </div>
    </section>
  );
}
