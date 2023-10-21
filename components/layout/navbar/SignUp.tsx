"use client";

import { useState } from "react";

import { GoogleIcon } from "@/assets";
import Button from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import supabase from "@/utils/supabase";

function SignUp() {
  const [withEmail, setWithEmail] = useState(false);

  async function handleSignInWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button label="Sign Up" widthFit size="sm" />
      </DialogTrigger>
      <DialogContent className="h-max grid-flow-row auto-rows-max">
        {withEmail ? (
          <>
            <DialogHeader>
              <DialogTitle>Continue with an email link 💌</DialogTitle>
              <DialogDescription>
                An link will be sent to your email and that one can be used to
                log in whitout typing any password
              </DialogDescription>
            </DialogHeader>
            <div>
              <Input placeholder="Input your email" disabled />
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Crete a new profile ✨</DialogTitle>
              <DialogDescription>
                Get full acccess to all functionalities of the Chooselife APP
              </DialogDescription>
            </DialogHeader>
            <Button
              label="Sign in with Google"
              icon={<GoogleIcon className="-ml-1 mr-2 h-5 w-5" />}
              variant="outlined"
              color="secondary"
              onClick={handleSignInWithGoogle}
            />
            <button onClick={() => setWithEmail(true)}>
              continue with email
            </button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default SignUp;
