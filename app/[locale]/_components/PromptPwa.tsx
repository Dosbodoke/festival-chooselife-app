"use client";

import { DownloadIcon } from "@radix-ui/react-icons";
import React, { useEffect } from "react";
import { toast } from "sonner";

export function PromptPwa() {
  useEffect(() => {
    function handleDownloadPwa(deferredPrompt: Event) {
      if (!deferredPrompt) return;
      // @ts-ignore
      deferredPrompt.prompt();
    }

    const sessionIsPwa = window.matchMedia(
      "(display-mode: standalone)"
    ).matches;

    const beforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      if (sessionIsPwa) return;
      toast("🎉 Chooselife APP", {
        description: "Install to have a better experience",
        action: {
          label: (
            <>
              <DownloadIcon className="mr-2 animate-bounce" /> Instalar
            </>
          ),
          onClick: () => {
            handleDownloadPwa(e);
          },
        },
        classNames: { actionButton: "!p-2 !h-auto" },
      });
    };

    window.addEventListener("beforeinstallprompt", beforeInstallPrompt);
    return () => {
      window.removeEventListener("beforeinstallprompt", beforeInstallPrompt);
    };
  }, []);

  return null;
}
