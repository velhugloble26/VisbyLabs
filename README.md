# Visby Labs website

Next.js 14 (App Router) + TypeScript + Tailwind + Framer Motion, `src/` structure.

## Run
```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Where things live
- `src/data/flows.ts`     steps and captions for every animated flow
- `src/data/services.ts`  all 12 service pages (add one object = add one page)
- `src/components/flows/` flow engine (FlowCanvas) and each flow's visual panel
- `src/app/contact/actions.ts` server action, see the TODO to send email or create a CRM lead

## Notes
- Set `NEXT_PUBLIC_SITE_URL` for canonical URLs and the sitemap.
- All demos use fictional data and make no live calls.
