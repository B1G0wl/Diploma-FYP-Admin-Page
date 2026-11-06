# Diploma FYP Admin Page — 

This is a Next.js 14 demo deployment of the existing admin UI. The frontend design and existing styling have been retained. Firebase has been replaced with browser `localStorage` demo data so the project can run without Firebase credentials.

## Demo login

- **Email:** `demo@bigowl.dev`
- **Password:** `BigOwl@123`

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy to Vercel

1. Push the contents of this project folder to a GitHub repository (ensure `package.json` is at the repository root).
2. Import the repository at https://vercel.com/new.
3. Keep the detected Next.js framework and default build settings (`npm run build`, default Next.js output, `npm install`).
4. **Do not add Firebase environment variables** for this demo build.
5. Deploy and share the generated Vercel URL with reviewers.

## Demo behavior and limitations

- The login accepts the demo credentials above.
- The dashboard starts with four sample events.
- Creating, editing, and deleting events works in the browser using `localStorage`.
- Uploaded event images are stored as browser data URLs and remain available in that same browser profile.
- Demo changes are local to the browser and are not shared between HR/reviewers or devices. Clearing browser storage resets the sample data.
- This is a portfolio/HR demonstration only. The demo login and cookie check are not production authentication. Do not use it to protect real user data or real administrative operations. Add a proper server-side authentication and database backend before production use.
