# CHOOSELIFE

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Local development

First, setup the `.env` file. See [How to setup Google oAuth](#how-to-setup-google-oauth).

Then, run the development server:

```bash
yarn install
npx supabase start
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### How to setup Google oAuth

You can follow [this tutorial](https://docs.retool.com/data-sources/guides/authentication/google-oauth) to get your Google oAuth credentials.

For local development:

- Add `http://localhost:3000` to **Authorized JavaScript origins**
- Add `http://localhost:54321/auth/v1/callback` to **Authorized redirect URIs**

For prod:

- Add `https://${SUPABASE_PROJECT_ID}.supabase.co/auth/v1/callback` to **Authorized redirect URIs**
