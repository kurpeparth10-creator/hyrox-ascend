# HYROX // ASCEND
`npm install` · `npm run dev` · `npm run build` · `npm run preview`
Deploy: push to GitHub, import the repo in Vercel (framework Vite, output `dist`; `vercel.json` handles SPA routing). No env vars.
Data: all in `localStorage` via `src/lib/storage.ts` (Export/Import JSON in header).
Exercises: `src/data/exercises.ts`. Images: drop `start|mid|end|form|thumb.webp` into `public/images/exercises/<id>/` (or edit `images` paths); if a file is missing the built-in SVG form illustration shows.
