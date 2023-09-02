import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: "Your profile",
};

export default function Profile() {
  return (
    <div className="container mx-auto mt-4 space-y-12">
      <h1>Profile</h1>
    </div>
  );
}
