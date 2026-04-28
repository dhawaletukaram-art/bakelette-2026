import { useEffect, useRef, useState } from "react";
import { Instagram } from "lucide-react";

declare global {
  interface Window {
    instgrm?: { Embeds?: { process: () => void } };
  }
}

const SCRIPT_SRC = "https://www.instagram.com/embed.js";

function loadInstagramScript() {
  if (typeof window === "undefined") return;
  const existing = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`);
  if (existing) {
    window.instgrm?.Embeds?.process();
    return;
  }
  const s = document.createElement("script");
  s.src = SCRIPT_SRC;
  s.async = true;
  s.onload = () => window.instgrm?.Embeds?.process();
  document.body.appendChild(s);
}

export function InstagramEmbed({ url }: { url: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (visible) {
      loadInstagramScript();
      // Re-process in case script was already loaded
      const t = setTimeout(() => window.instgrm?.Embeds?.process(), 200);
      return () => clearTimeout(t);
    }
  }, [visible]);

  return (
    <div
      ref={ref}
      className="ig-card relative mx-auto w-full max-w-[400px] rounded-2xl overflow-hidden bg-white shadow-lg shadow-black/10 border border-border/40"
    >
      {visible ? (
        <blockquote
          className="instagram-media"
          data-instgrm-permalink={url}
          data-instgrm-version="14"
          data-instgrm-captioned
          style={{
            background: "#FFF",
            border: 0,
            margin: 0,
            padding: 0,
            width: "100%",
            minWidth: "260px",
          }}
        >
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="flex aspect-[9/16] w-full items-center justify-center bg-muted text-muted-foreground gap-2 text-sm"
          >
            <Instagram className="h-5 w-5" /> View on Instagram
          </a>
        </blockquote>
      ) : (
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="flex aspect-[9/16] w-full items-center justify-center bg-muted text-muted-foreground gap-2 text-sm"
        >
          <Instagram className="h-5 w-5" /> Loading reel…
        </a>
      )}
    </div>
  );
}
