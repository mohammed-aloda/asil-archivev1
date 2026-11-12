# ASIL — Cultural Heritage Jerseys

**Live site: [asilarchive.com](https://asilarchive.com)** · Instagram: [@asil_jerseys](https://www.instagram.com/asil_jerseys/)

ASIL is a live e-commerce store I designed, built and run for my own clothing brand: jerseys inspired by
the heritage, culture and landmarks of different countries. Customers can browse by country, check out
with Stripe, and send in their own designs through a custom-request form.

## What it does

- **Shop & product pages** — browse cultural and one-off jerseys, filter by country, photo galleries, size guide
- **Cart & checkout** — persistent cart, multi-currency display, payments through **Stripe Checkout**
- **Custom requests** — customers upload reference images (or a PDF) and the request is emailed to me
- **Admin panel** — password-protected page to add products and sync them to Stripe
- **Light / dark theme**, animated logo, custom cursor and page transitions

## Tech stack

| Layer | Tools |
| --- | --- |
| Front end | React 19, TypeScript, Vite, Tailwind CSS, Framer Motion, React Router |
| Back end | Vercel serverless functions (TypeScript) |
| Payments | Stripe API (products, prices, Checkout sessions) |
| Email & uploads | Nodemailer, Multer |
| Hosting | Vercel, custom domain |

## How it's put together

```
pages/        Shop, product, checkout, custom request, admin, info pages
components/   Header, footer, cart drawer, product card, animations
context/      Cart, currency, theme, products and toast state (React Context)
api/          Serverless endpoints: checkout, Stripe sync, admin login, custom-request email
api/_lib/     Shared auth (HttpOnly session cookie) and request checks (rate limiting, input limits)
```

## Security work

Running a real store meant treating it like one:

- Secret keys and the admin password live only in server-side environment variables, never in the browser bundle
- Admin sessions use an HttpOnly cookie checked on the server
- Rate limiting on login and form endpoints
- Upload limits (file count, size, allowed file types) and HTML-escaping of user input in emails
- Strict Content-Security-Policy and security headers set in `vercel.json`

## Run it locally

Requires [Node.js](https://nodejs.org) 24.

```bash
npm install
cp .env.example .env.local   # fill in your own keys
npm run dev
```

| Variable | Used for |
| --- | --- |
| `ADMIN_PASSWORD` | Admin panel login |
| `STRIPE_SECRET_KEY` | Payments and product sync |
| `EMAIL_USER`, `EMAIL_PASS` | Sending custom-request emails |
| `CLIENT_URL` | Redirect after checkout |

---

Built by **Mohammed Al-Oda**, Mechatronics Engineering, University of Guelph.
