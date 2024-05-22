import { ClockIcon } from "lucide-react";
import React from "react";

export const timeline = () => {};

// import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"

export const Timeline = () => {
  return (
    <div className="mx-auto w-full max-w-4xl p-6 sm:p-10">
      <div className="relative grid gap-10 pl-6 after:absolute after:inset-y-0 after:left-0 after:w-px after:bg-gray-500/20 dark:after:bg-gray-400/20">
        <div className="relative grid gap-1 text-sm">
          <div className="absolute left-0 top-1 z-10 aspect-square w-3 translate-x-[-29.5px] rounded-full bg-gray-900 dark:bg-gray-50" />
          <div className="flex items-center justify-between">
            <div className="font-medium">Ínicio de festival</div>
            <div className="inline-flex items-center rounded-md bg-green-500 px-2 py-0.5 text-xs font-semibold text-gray-50 shadow transition-colors hover:bg-green-500/80 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2 dark:border-gray-800 dark:bg-green-500 dark:text-gray-50 dark:hover:bg-green-500/80 dark:focus:ring-green-300">
              <ClockIcon className="mr-1 h-3 w-3" />
              9:00 AM
            </div>
          </div>
          <div className="text-gray-500 dark:text-gray-400">
            Abertura oficila das vias de Highline
          </div>
        </div>
        <div className="relative grid gap-1 text-sm">
          <div className="absolute left-0 top-1 z-10 aspect-square w-3 translate-x-[-29.5px] rounded-full bg-gray-900 dark:bg-gray-50" />
          <div className="flex items-center justify-between">
            <div className="font-medium">Oficina de resgate</div>
            <div className="inline-flex items-center rounded-md bg-green-500 px-2 py-0.5 text-xs font-semibold text-gray-50 shadow transition-colors hover:bg-green-500/80 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2 dark:border-gray-800 dark:bg-green-500 dark:text-gray-50 dark:hover:bg-green-500/80 dark:focus:ring-green-300">
              <ClockIcon className="mr-1 h-3 w-3" />
              11:00 AM
            </div>
          </div>
          <div className="text-gray-500 dark:text-gray-400">
            Ministrada por ..., você vai aprender tudo sobre resgate
          </div>
          <div className="flex items-center space-x-2">
            {/* <img
              alt="Sponsor Logo"
              className="rounded-full bg-gray-600"
              height="40"
              src="/placeholder.svg"
              style={{
                aspectRatio: "40/40",
                objectFit: "cover",
              }}
              width="40"
            /> */}
            <div>
              <div className="font-medium">Pessoa XXX</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Highliner
              </div>
            </div>
          </div>
        </div>
        <div className="relative grid gap-1 text-sm">
          <div className="absolute left-0 top-1 z-10 aspect-square w-3 translate-x-[-29.5px] rounded-full bg-gray-900 dark:bg-gray-50" />
          <div className="flex items-center justify-between">
            <div className="font-medium">Panel Discussion</div>
            <div className="inline-flex items-center rounded-md bg-green-500 px-2 py-0.5 text-xs font-semibold text-gray-50 shadow transition-colors hover:bg-green-500/80 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2 dark:border-gray-800 dark:bg-green-500 dark:text-gray-50 dark:hover:bg-green-500/80 dark:focus:ring-green-300">
              <ClockIcon className="mr-1 h-3 w-3" />
              2:00 PM
            </div>
          </div>
          <div className="text-gray-500 dark:text-gray-400">
            Join our panel of experts for an insightful discussion on the future
            of the industry.
          </div>
          <div className="flex items-center space-x-2">
            {/* <Avatar>
              <AvatarImage alt="Jane Smith" src="/placeholder-avatar.jpg" />
              <AvatarFallback>JS</AvatarFallback>
            </Avatar> */}
            <div>
              <div className="font-medium">Jane Smith</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Industry Analyst
              </div>
            </div>
          </div>
        </div>
        <div className="relative grid gap-1 text-sm">
          <div className="absolute left-0 top-1 z-10 aspect-square w-3 translate-x-[-29.5px] rounded-full bg-gray-900 dark:bg-gray-50" />
          <div className="flex items-center justify-between">
            <div className="font-medium">Networking Reception</div>
            <div className="inline-flex items-center rounded-md bg-green-500 px-2 py-0.5 text-xs font-semibold text-gray-50 shadow transition-colors hover:bg-green-500/80 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2 dark:border-gray-800 dark:bg-green-500 dark:text-gray-50 dark:hover:bg-green-500/80 dark:focus:ring-green-300">
              <ClockIcon className="mr-1 h-3 w-3" />
              5:00 PM
            </div>
          </div>
          <div className="text-gray-500 dark:text-gray-400">
            Join us for drinks and hors oeuvres to network with other attendees.
          </div>
          <div className="flex items-center space-x-2">
            {/* <img
              alt="Sponsor Logo"
              className="rounded-lg"
              height="40"
              src="/placeholder.svg"
              style={{
                aspectRatio: "40/40",
                objectFit: "cover",
              }}
              width="40"
            /> */}
            <div>
              <div className="font-medium">Globex Corporation</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Gold Sponsor
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
