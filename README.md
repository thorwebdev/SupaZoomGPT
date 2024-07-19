## Test locally

```bash
# Terminal 1
supabase start
supabase functions serve --env-file ./supabase/.env
# Terminal 2
ngrok http 54321
```

Webhook URL
https://your-domain.ngrok-free.app/functions/v1/webhook
