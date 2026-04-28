import { createFileRoute } from "@tanstack/react-router";

// Receives CTA click events from the browser. Logged to server output —
// view in the Lovable function logs. No PII is stored.
export const Route = createFileRoute("/api/track")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json().catch(() => ({}));
          // eslint-disable-next-line no-console
          console.log("[cta-server]", JSON.stringify(body));
        } catch {
          /* swallow */
        }
        return new Response(null, { status: 204 });
      },
    },
  },
});
