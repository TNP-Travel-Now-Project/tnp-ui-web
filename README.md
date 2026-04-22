# 🚀 Next.js Fullstack Frontend Setup (pnpm)

A modern frontend boilerplate built with **Next.js App Router**, optimized for production with state management, data fetching, UI system, testing, and tooling.

---

## 📦 Tech Stack

### ⚡ Core Framework

* Next.js (App Router)
* TypeScript
* Tailwind CSS
* ESLint

### 🌐 Data Fetching & State Management

* Axios
* TanStack Query
* Zustand

### 🧾 Forms & Validation

* React Hook Form
* Zod

### 🔐 Authentication

* NextAuth.js

### 🎨 UI & Styling

* Lucide
* clsx (conditional class utility)
* tailwind-merge (merge Tailwind classes safely)
* shadcn/ui

### 🧪 Testing & Quality

* Vitest
* Playwright
* Mock Service Worker
* Biome

### 🧩 Dev Tools

* React Query Devtools
* React Hook Form Devtools
* OpenAPI Generator

---

## 📁 Project Structure

```bash
src/
 ├── app/         # Next.js App Router
 ├── components/  # Reusable UI components
 ├── features/    # Feature-based modules
 ├── lib/         # Utilities & helpers
 ├── hooks/       # Custom React hooks
 ├── services/    # API services (axios, react-query)
 ├── store/       # Zustand stores
```

---

## 🚀 Getting Started

### 1. Create project

```bash
pnpm create next-app my-app --ts --tailwind --eslint --app --use-pnpm
cd my-app
```

---

### 2. Install dependencies

```bash
pnpm add axios @tanstack/react-query zustand react-hook-form zod next-auth lucide-react clsx tailwind-merge @tanstack/react-query-devtools @hey-api/openapi-ts
```

---

### 3. Dev tools

```bash
pnpm add -D vitest @testing-library/react playwright msw @biomejs/biome @hookform/devtools
```

---

### 4. shadcn/ui setup

```bash
pnpm dlx shadcn-ui@latest init
pnpm dlx shadcn-ui@latest add button input dialog form
```

---

### 5. Run development server

```bash
pnpm dev
```

Open:
http://localhost:3000

---

## 🧪 Testing

```bash
pnpm test
```

---

## 🎨 Lint & Format

```bash
pnpm lint
pnpm format
```

---

## ⚙️ Recommended Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "biome check .",
    "format": "biome format --write .",
    "test": "vitest"
  }
}
```

---

## 🧠 Architecture Notes

* **React Query** → server state (API, caching)
* **Zustand** → global UI state (lightweight)
* **React Hook Form + Zod** → form + validation pipeline
* **shadcn/ui** → UI system (Tailwind-based)
* **Biome** → replaces ESLint + Prettier in one tool
* **NextAuth** → authentication layer

---

## ⚠️ Common Issues

### Slow / stuck dev server

```bash
pnpm dev --no-turbopack
```

### Reset environment

```bash
rm -rf node_modules .next
pnpm install
```

---

## 📦 Build & Deploy

```bash
pnpm build
pnpm start
```

Deploy easiest via:

* Vercel

---

## 🧱 Summary

This stack is designed for:

* ⚡ High performance
* 🧩 Scalable architecture
* 🧪 Strong testing support
* 🎨 Modern UI system
* 🔐 Production-ready auth + API layer

---

## 📌 License

MIT
