# 🚀 Developer Portfolio — Next.js + MongoDB Atlas

A modern, dark-themed developer portfolio with an editable admin panel. All content including images and resume is stored in MongoDB Atlas, making it fully deployable on Vercel.

## ✨ Features

- **Dark AI-tech theme** with cyan/purple accents, animations, and glassmorphism
- **Editable from admin panel** — no code editing required after setup
- **MongoDB Atlas storage** — images & resume stored as base64 in DB (Vercel-friendly)
- **Resume download** — visitors can download your PDF resume
- **Projects showcase** with category filter, tags, images, links
- **Skills grid** with category groupings
- **Services section** with icon picker
- **Experience & Education** timeline
- **Contact section** with social links
- **Protected admin panel** with username/password login

## 🛠 Tech Stack

- **Framework:** Next.js 16 (App Router) + TypeScript
- **Database:** MongoDB Atlas (via Mongoose)
- **Auth:** NextAuth.js (credentials)
- **Styling:** Tailwind CSS v4 + custom CSS variables
- **Icons:** Lucide React
- **Toasts:** React Hot Toast

---

## 🚀 Setup Instructions

### Step 1 — Clone / Download & Install

```bash
cd portfolio
npm install
```

### Step 2 — MongoDB Atlas Setup

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) and create a **free account**
2. Create a new **free cluster** (M0)
3. Create a **database user** (Database Access → Add New User)
4. Go to **Network Access** → Add IP Address → `0.0.0.0/0` (allow all — required for Vercel)
5. Go to **Clusters** → Connect → "Drivers" → Copy your connection string
   - It looks like: `mongodb+srv://username:password@cluster0.abc123.mongodb.net/?retryWrites=true&w=majority`

### Step 3 — Create `.env.local`

Create a file called `.env.local` in the root of the project:

```env
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
NEXTAUTH_SECRET=generate-a-random-string-here-min-32-chars
NEXTAUTH_URL=http://localhost:3000
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-password
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```
Or just use any long random string.

### Step 4 — Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

**Admin panel:** [http://localhost:3000/admin](http://localhost:3000/admin)

---

## 📝 Admin Panel Guide

| Section | What to edit |
|---------|-------------|
| **Profile** | Your name, title, bio, tagline, profile photo, resume PDF, social links, stats |
| **Skills** | Skill categories and individual technologies |
| **Services** | Services you offer with descriptions and icons |
| **Projects** | Add/edit/delete projects with images, links, tags, categories |
| **Experience** | Work experience and education with timeline display |

---

## 🌐 Deploy to Vercel

### Option A — Vercel CLI
```bash
npm install -g vercel
vercel
```

### Option B — GitHub + Vercel
1. Push your code to GitHub (the `.env.local` is in `.gitignore` so it won't be pushed)
2. Go to [vercel.com](https://vercel.com) → Import your repo
3. Add environment variables in Vercel dashboard:
   - `MONGODB_URI`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` → set this to your Vercel deployment URL e.g. `https://yoursite.vercel.app`
   - `ADMIN_USERNAME`
   - `ADMIN_PASSWORD`
4. Deploy!

---

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── admin/
│   │   ├── dashboard/page.tsx    # Admin dashboard with tabs
│   │   ├── login/page.tsx        # Admin login
│   │   └── page.tsx              # Redirect logic
│   ├── api/
│   │   ├── auth/[...nextauth]/   # NextAuth login API
│   │   ├── portfolio/            # GET + PUT portfolio data
│   │   ├── projects/             # GET all + POST project
│   │   ├── projects/[id]/        # PUT + DELETE project
│   │   └── resume/               # GET resume PDF download
│   ├── components/
│   │   ├── admin/                # Admin tab components
│   │   ├── sections/             # Public page sections
│   │   └── ui/                   # Shared UI (Navbar)
│   ├── globals.css               # Global styles + CSS variables
│   ├── layout.tsx
│   ├── page.tsx                  # Public portfolio page
│   └── providers.tsx             # Session + Toast provider
├── lib/
│   └── mongodb.ts                # MongoDB connection
├── models/
│   ├── Portfolio.ts              # Portfolio Mongoose model
│   └── Project.ts                # Project Mongoose model
├── .env.local.example            # Environment variable template
└── next.config.ts
```

---

## 🔒 Security Notes

- Change `ADMIN_PASSWORD` to something strong
- Keep `NEXTAUTH_SECRET` private and long (32+ chars)
- Never commit `.env.local` to Git
