import Link from "next/link";
import { Metadata } from "next";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import type { Database } from "@/utils/database.types";
import SignupForm from "./_components/signup-form";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

export default async function Login() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/");
  }

  return (
    <section className="mx-auto flex h-auto w-full max-w-xl flex-col items-center justify-center px-6 py-8 lg:py-0">
      <div className="w-full rounded-lg bg-white shadow-xl dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
        <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
            Create an account
          </h1>
          <SignupForm />
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              href={"/login"}
              className="font-medium text-blue-600 hover:underline dark:text-blue-500"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
