"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const KEY = "kcd_cookie_consent_v1";

export default function CookieConsent() {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const v = window.localStorage.getItem(KEY);
    if (!v) setOpen(true);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed bottom-4 left-1/2 z-50 w-[95vw] max-w-3xl -translate-x-1/2">
      <div className="glass-card p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="text-sm text-white/70">
            Wir verwenden nur minimale Cookies für Funktionalität. Analytics ist optional via ENV.
          </div>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              onClick={() => {
                window.localStorage.setItem(KEY, "declined");
                setOpen(false);
              }}
            >
              Ablehnen
            </Button>
            <Button
              onClick={() => {
                window.localStorage.setItem(KEY, "accepted");
                setOpen(false);
              }}
            >
              Akzeptieren
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
