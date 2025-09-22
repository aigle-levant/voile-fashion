import { LogoutButton } from "@/components/auth/logout-button";
import { redirect } from "next/navigation";
import { Moon } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { ThemeSwitcher } from "@/components/auth/theme-switcher";

export default async function SettingsPage() {
  // to verify if the user is logged in
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  return (
    <section className="w-full mx-auto rounded-none bg-zinc-800/90 dark:bg-zinc-200/90 text-zinc-50 dark:text-zinc-900 shadow-lg p-8 flex flex-col gap-8">
      <h1 className="font-bold text-3xl">Settings</h1>
      <hr className="border-zinc-700 dark:border-zinc-300" />

      {/* Preferences */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Moon className="w-5 h-5" /> Appearance
        </h2>
        <div className="flex items-center justify-between p-4 rounded-lg bg-zinc-700/50 dark:bg-zinc-300/50">
          <p>Switch theme</p>
          {/* placeholder toggle switch */}
          <button className="w-10 h-6 rounded-full bg-zinc-500 relative">
            <ThemeSwitcher />
          </button>
        </div>
      </div>

      {/* Logout */}
      <div className="flex items-center justify-between p-4 rounded-lg bg-red-600/80 text-white dark:bg-red-500/90">
        <h2 className="text-lg font-semibold">Logout</h2>
        <LogoutButton />
      </div>
    </section>
  );
}
