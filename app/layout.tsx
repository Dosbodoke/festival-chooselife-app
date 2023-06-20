import { ReactQueryProvider } from "@/components/ReactQueryProvider";
import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Festival Chooselife",
  description: "Site oficial do festival Chooselife",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ReactQueryProvider>
        <html lang="en">
          <body
            className={`min-h-screen w-screen bg-white px-2 text-gray-700 dark:bg-gray-900 dark:text-gray-400 md:px-0 ${inter.className}`}
          >
            {children}
            <footer className="w-full py-8 text-base text-gray-900 opacity-75 transition hover:opacity-100 dark:text-gray-400">
              <div className="flex items-center justify-center">
                <p>Festival Chooselife</p>
                <div className="mx-2 h-4 w-0 border border-gray-300" />
                <p className="mr-2 text-base">2023</p>
              </div>
              <div className="text-center">
                site criado por{" "}
                <Link
                  href="https://www.instagram.com/juangsandrade/"
                  target="_blank"
                  className="text-blue-500"
                >
                  Juan Andrade
                </Link>
              </div>
            </footer>
          </body>
        </html>
      </ReactQueryProvider>
      <Analytics />
    </>
  );
}
