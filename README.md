# Flight Digital Test Task

## Overview
The prooject consists of two pages (homepage and single species) and one API endpoint.
## Data Flow
1. Upon first request, the system fetches and composes teh data into a single object. Since the API is completely open, no authentication required, so that part is also ommited. In the real world, I would have to manage  the keys and Auth flows one way or another.
2. After the initial fetch, teh data is cached and saved on disk which speeds up the page loads. The data re-fetched once a day, since the whole API seems to be fairly static w/ little to none regular changes.
3. If a user wonder to the single pokemon page, live (no disk cache used) request to teh remote API endpoint performed. Main reason is that it's just a singular endpoint and the load is not expected to be huge. Potentialy it also can be disk cached. Inbuild Next.js cache is used ith fetch here anyways, so it saves time as well (not every fetch is real fetch, most of them are just returning cached data if it still has not expired).
## Notes
Since it is a test task and the scope is fairly small, I have used:
### Local states only
Just two pages without huge depth of components, so ``useState`` was enough for reactivity
### Simple disk cash
Nothing fancy, just a Json file representing the API response pruned a bit to shrink the size
### Images
They are served directly from API-provided urls, potentialy that could be cached or deligated to a CDN
### Proxy endpoint
``/api/fetchEmAll`` local proxy endpoint which tries to get the data from cache first.
Otherwise it does long request to the remote API collecting the data. Cache TTL is 24hrs.
On top of that, for a single species page, inbuilt Next.js cache is used with `fetch()`, so cheaper requests also should be cached
## Reactivity
- A handfull of ``useState``, ``useEffect`` and ``useMemo`` to demonstrate hooks.
- A simple debouncer in the ``utils`` folder
## Sorting, Searching, Pagination
The results live in memory for the simplicity (I have deliberately requested only first 151 pokemons).
So all of the manipulations happen client-side. I am trying to kep the data fairly small so it can fit on every phone.
On the larger scale, I would probably shift the sorting / searching functionality to the API side (REST or GrapQL). If there's no support for it and sorting / searching is absolutely required, a local copy of the required data (SQL or NoSQL DB) and robust regular sync might be a solution.
## Styles
- Styled Components wherever possible with a little bit of SASS/SCSS sprinkled at `globals.scss`` for convenience
- As design was not provided, nothing fancy in terms of styling, just mobile friendly, a few css hover animation. Just an inspiration from the reference websites.

-----

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
