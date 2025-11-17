# Event Management System

A full-featured **Event Management System** built using **React (Vite)**, **Tailwind CSS**, **Supabase**, and **Prisma**.  
This project includes a production-ready frontend, Prisma database schema, seeding utilities, QR/PDF utilities, EmailJS integration, and a scalable structure suitable for both college events and organizational events.

---

## 🚀 Features

- 🔐 **Authentication** (Supabase client integration)
- 📝 **Event creation & management**
- 👥 **Team registration system**
- 📊 **Round & evaluation modules**
- 🪪 **Certificate model support**
- 📦 **Prisma ORM** with PostgreSQL
- 📨 **EmailJS contact form**
- 🧾 **QR Code + PDF generation** for passes/certificates
- 🎨 **Tailwind CSS UI**
- ⚙️ **Admin/helper components**
- 🔔 **Toast notifications** (react-hot-toast)
- 🧭 **Routing** via React Router
- 🧠 **Zustand** for state management
- 🧹 **Type-safe validation with Zod**

---

## 🛠 Tech Stack

| Layer | Tools |
|------|-------|
| **Frontend** | React, Vite |
| **Styling** | Tailwind CSS |
| **Database ORM** | Prisma |
| **Database** | PostgreSQL |
| **Backend Connectivity** | Supabase client |
| **Email** | EmailJS |
| **PDF** | jsPDF, jsPDF-autotable |
| **Validation** | Zod |

---

2️⃣ Install dependencies
npm install


3️⃣ Create .env file (required)

Create a file named .env in the root and fill values:
# Prisma / DB
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DB_NAME?schema=public"

# Supabase
VITE_SUPABASE_URL="https://your-project.supabase.co"
VITE_SUPABASE_ANON_KEY="your-anon-key"

# EmailJS
VITE_APP_EMAILJS_SERVICE_ID="service_xxx"
VITE_APP_EMAILJS_TEMPLATE_ID="template_xxx"
VITE_APP_EMAILJS_PUBLIC_KEY="public_xxx"

# App base URL
VITE_APP_BASE_URL="http://localhost:5173"


🗄 Prisma (Database)
Generate Prisma Client
npx prisma generate

Run DB Migrations
npx prisma migrate dev --name init

Seed the Database
node prisma/seed.js

Test DB Connection
node prisma/testConn.js

🧪 Development Server

Start the project:

npm run dev


Vite default URL:

http://localhost:5173


📁 Project Structure
/
```text
EVENT-MANAGEMENT-SYSTEM
├─ dist/
├─ node_modules/
├─ prisma/
│  ├─ schema.prisma
│  ├─ seed.js
│  └─ testConn.js
├─ public/
├─ src/
│  ├─ api/
│  ├─ assets/
│  ├─ components/
│  │  ├─ authentication/
│  │  │  ├─ authform/
│  │  │  │  ├─ Authform.jsx
│  │  │  │  ├─ LoginForm.jsx
│  │  │  │  └─ SignUpForm.jsx
│  │  │  ├─ github/
│  │  │  └─ google/
│  │  ├─ event/
│  │  │  └─ Events.jsx
│  │  ├─ footer/
│  │  │  ├─ FooterDesktop.jsx
│  │  │  └─ FooterMobile.jsx
│  │  ├─ homepage/
│  │  │  └─ Hero.jsx
│  │  ├─ navigationbars/
│  │  │  ├─ NavbarDesktop.jsx
│  │  │  └─ NavbarMobile.jsx
│  │  ├─ ui/
│  │  │  ├─ accordion.jsx
│  │  │  ├─ alert.jsx
│  │  │  ├─ badge.jsx
│  │  │  ├─ button.jsx
│  │  │  ├─ card.jsx
│  │  │  ├─ dialog.jsx
│  │  │  ├─ input.jsx
│  │  │  ├─ label.jsx
│  │  │  ├─ progress.jsx
│  │  │  ├─ radio-group.jsx
│  │  │  ├─ select.jsx
│  │  │  ├─ tabs.jsx
│  │  │  ├─ textarea.jsx
│  │  │  ├─ toast.jsx
│  │  │  └─ toaster.jsx
│  │  ├─ components.txt
│  │  ├─ FeatureCard.jsx
│  │  ├─ Loading.jsx
│  │  └─ StatCard.jsx
│  ├─ db/
│  ├─ hooks/
│  │  ├─ viewport/
│  │  └─ use-toast.js
│  ├─ layout/
│  ├─ lib/
│  │  ├─ queryClient.js
│  │  ├─ supabaseClient.js
│  │  └─ utils.js
│  ├─ pages/
│  │  ├─ authentication/
│  │  │  ├─ ConfirmEmail.jsx
│  │  │  ├─ Login.jsx
│  │  │  └─ SignUp.jsx
│  │  ├─ event/
│  │  │  └─ EventPage.jsx
│  │  ├─ homepage/
│  │  │  └─ About.jsx
│  │  ├─ AccessPage.jsx
│  │  ├─ AdminDashboard.jsx
│  │  ├─ AlreadyRegistered.jsx
│  │  ├─ Certificates.jsx
│  │  ├─ Contact.jsx
│  │  ├─ Gallery.jsx
│  │  ├─ Leaderboard.jsx
│  │  ├─ Login.jsx
│  │  ├─ pages.txt
│  │  ├─ ParticipantDashboard.jsx
│  │  ├─ PaymentPage.jsx
│  │  ├─ Register.jsx
│  │  ├─ Round1.jsx
│  │  ├─ Round2.jsx
│  │  └─ Schedule.jsx
│  ├─ routes/
│  │  ├─ AdminRoute.jsx
│  │  ├─ ProtectedRoutes.jsx
│  │  ├─ RegistereGuard.jsx
│  │  └─ Routes.jsx
│  ├─ services/
│  │  ├─ authservices/
│  │  ├─ viewportservices/
│  │  └─ services.txt
│  ├─ utils/
│  ├─ App.css
│  ├─ App.jsx
│  ├─ index.css
│  └─ main.jsx
├─ .env
├─ .gitignore
├─ components.json
├─ eslint.config.js
├─ index.html
├─ jsconfig.json
├─ package.json
├─ pnpm-lock.yaml
├─ README.md
├─ vercel.json
└─ vite.config.js
```

🏗 Build & Deploy

Build production bundle:

npm run build


The production build will be created in dist/.

Suitable Deployment Platforms
Layer	Recommended
Frontend	Vercel / Netlify / Cloudflare Pages
Database	Supabase / Neon / Railway / Render
Server-side Prisma functions	Vercel Serverless / Node server / Supabase Edge Functions



❗ Common Issues & Fixes
📌 Prisma ESM Error

If you see:

Cannot use import statement outside a module


Make sure:

Node ≥ 18

"type": "module" exists in package.json

You ran npx prisma generate

📌 Supabase Auth Fails

Check:

VITE_SUPABASE_URL

VITE_SUPABASE_ANON_KEY

📌 EmailJS Not Sending

Ensure:

Correct service ID, template ID, public key

EmailJS template includes required fields

🤝 Contributing

Fork the repository

Create a feature branch

Commit your updates

Submit a pull request

Please maintain clean commits and consistent code style.
