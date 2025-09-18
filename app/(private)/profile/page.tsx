import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ProfileCard from "@/components/private/ProfileCard";

export default async function ProfilePage() {
  // to verify if the user is logged in
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims) {
    redirect("/auth/login");
  }
  //   get user details from users table
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: profile } = await supabase
    .from("users")
    .select("username")
    .eq("id", user?.id)
    .single();
  // either get username or set null
  return <ProfileCard username={profile?.username || ""} />;
}
