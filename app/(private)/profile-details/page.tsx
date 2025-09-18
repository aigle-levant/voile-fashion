import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ProfileDetailsCard from "@/components/private/ProfileDetailsCard";

export default async function ProfileDetailsPage() {
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
  //   fetch user
  const { data: profile } = await supabase
    .from("users")
    .select("username")
    .eq("id", user?.id)
    .single();
  return (
    <ProfileDetailsCard username={profile?.username} email={user?.email} />
  );
}
