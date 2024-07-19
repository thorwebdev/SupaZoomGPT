import crypto from "node:crypto";

Deno.serve(async (req) => {
  if (req.method === "POST") {
    try {
      const { event, payload } = await req.json();
      console.log({ event, payload });

      // Validate Zoom Webhook: https://developers.zoom.us/docs/api/rest/webhook-reference/#validate-your-webhook-endpoint
      if (event === "endpoint.url_validation") {
        const hashForValidate = crypto.createHmac(
          "sha256",
          Deno.env.get("ZOOM_WEBHOOK_SECRET_TOKEN"),
        ).update(payload.plainToken).digest("hex");

        return Response.json({
          "plainToken": payload.plainToken,
          "encryptedToken": hashForValidate,
        });
      }
    } catch (e) {
      console.error(e);
    }
  }

  return new Response(
    JSON.stringify({}),
    { headers: { "Content-Type": "application/json" } },
  );
});
