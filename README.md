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

## 📦 Project Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/SubhaNITS150/Event-Management-System.git
cd Event-Management-System
npm install
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

📁 Project Structure
/
├─ prisma/
│  ├─ schema.prisma        # Prisma models
│  ├─ seed.js              # DB seed script
│  └─ testConn.js          # Test DB connection
├─ public/                 # Static assets
├─ src/
│  ├─ pages/               # Pages (Login, Dashboard, Register…)
│  ├─ components/          # UI Components
│  ├─ api/                 # API helper functions
│  ├─ lib/                 # Supabase client, utilities
│  ├─ generated/prisma/    # Generated Prisma client
│  ├─ App.jsx
│  ├─ main.jsx
│  └─ ...others
├─ package.json
├─ vite.config.js
└─ README.md




