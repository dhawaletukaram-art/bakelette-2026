import { useState } from "react";
import { MessageCircle, X, Phone } from "lucide-react";
import { trackCta } from "@/lib/track";

const PHONES = [
  { label: "+91 99201 44632", waNumber: "919920144632" },
  { label: "+91 98923 61998", waNumber: "919892361998" },
];

const MESSAGE = encodeURIComponent(
  "Hi Bakelette! I'd like to place an order."
);

export function WhatsAppFab() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="w-72 rounded-2xl bg-card border border-border shadow-2xl p-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-serif text-lg leading-tight">Chat with Bakelette</p>
              <p className="text-xs text-muted-foreground mt-1">
                We usually reply within minutes.
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="text-muted-foreground hover:text-foreground p-1 -mr-1"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-4 space-y-2">
            {PHONES.map((p) => (
              <a
                key={p.waNumber}
                href={`https://wa.me/${p.waNumber}?text=${MESSAGE}`}
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  trackCta("whatsapp_quickview", { from: "fab", phone: p.label })
                }
                className="flex items-center gap-3 rounded-xl border border-border/70 px-3 py-2.5 hover:bg-primary/5 hover:border-primary/40 transition group"
              >
                <span className="grid h-9 w-9 place-items-center rounded-full bg-[#25D366] text-white shrink-0">
                  <MessageCircle className="h-4 w-4" />
                </span>
                <span className="flex-1">
                  <span className="block text-sm font-medium text-foreground">{p.label}</span>
                  <span className="block text-[11px] text-muted-foreground">
                    Tap to open WhatsApp
                  </span>
                </span>
              </a>
            ))}
            <a
              href={`tel:+${PHONES[0].waNumber}`}
              className="flex items-center justify-center gap-2 rounded-xl bg-secondary text-secondary-foreground py-2 text-sm hover:bg-secondary/80 transition"
            >
              <Phone className="h-3.5 w-3.5" /> Call instead
            </a>
          </div>
        </div>
      )}

      <button
        onClick={() => {
          setOpen((v) => {
            const next = !v;
            if (next) trackCta("whatsapp_hero", { from: "fab_open" });
            return next;
          });
        }}
        aria-label="Open WhatsApp chat"
        className="relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-xl shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-transform"
      >
        {!open && (
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
        )}
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </div>
  );
}
