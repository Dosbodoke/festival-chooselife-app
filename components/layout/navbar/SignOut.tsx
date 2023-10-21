"use client";

import Button from "@/components/ui/Button";
import { useRouter } from "@/navigation";
import supabase from "@/utils/supabase";

function SignOut() {
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <Button
      label="Log out"
      onClick={handleSignOut}
      size="sm"
      variant="outlined"
      color="secondary"
      widthFit
    />
  );
}

export default SignOut;
