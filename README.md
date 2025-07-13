# 🧠 CodeNest — Interactive Code Editor & AI-Powered  Error Explainer

![CodeNest Banner](https://raw.githubusercontent.com/AyushhhJaiswal/CodeNest/refs/heads/main/public/CodeNestLandingPage.png)

# 🚀 Live Demo : 
[![Live Site](https://img.shields.io/badge/🌐%20LIVE%20SITE-CodeNest-blueviolet?style=for-the-badge)](https://code-nest-chi.vercel.app/)

[![Built With Next.js](https://img.shields.io/badge/Next.js-Framework-black?style=for-the-badge&logo=nextdotjs)](https://nextjs.org)
[![Editor: Monaco](https://img.shields.io/badge/Editor-Monaco-yellow?style=for-the-badge)](https://microsoft.github.io/monaco-editor/)
[![Run Code: Piston API](https://img.shields.io/badge/Run%20Code-Piston-lightgrey?style=for-the-badge)](https://github.com/engineer-man/piston)
[![Auth: Clerk](https://img.shields.io/badge/Auth-Clerk-green?style=for-the-badge)](https://clerk.dev)
[![AI Helper](https://img.shields.io/badge/Error%20Explainer-AI%20Powered-purple?style=for-the-badge)](https://openai.com)
[![Backend: Convex](https://img.shields.io/badge/Backend-Convex-blue?style=for-the-badge)](https://convex.dev)

> _“Nest your code, test it live, debug smarter — with AI.”_

**CodeNest** is a modern, full-stack, AI-assisted code editor built for developers, students, and enthusiasts. With real-time code execution, personalized themes, and AI error explanations, it's your personal sandbox to code, learn, and improve — all from the browser.

---

## 🌟 Features

### 🤖 AI Error Helper
- **Explain errors** in plain English
- **Understand bugs** with AI-generated suggestions
- Great for beginners trying to learn from mistakes

### 🧑‍💻 Monaco Editor Experience
- Full-featured code editing with Monaco
- Customize **themes**, **font size**, and **language**
- Per-language code saving with localStorage

### ⚙️ Execute Code with Piston
- Run over a dozen languages inside your Browser only
- Handles stdout, stderr, and error stack traces
- Fast and secure thanks to the Piston API

### 🔐 Clerk Authentication
- Secure sign-in and sign-up
- Seamless session management
- Future support for saved snippets per user

### 🧠 Convex Backend
- Real-time state and reactive data model
- Tracks sessions, preferences, and usage
- Built for speed and scalability

### 💅 Smooth UI & UX
- Built with **Tailwind CSS** & **shadcn/ui**
- Rich animations using **Framer Motion**
- Fully responsive across all devices

---

## 🛠️ Tech Stack

| Layer        | Tech                     |
|--------------|--------------------------|
| **Frontend** | Next.js, TypeScript, React |
| **Editor**   | Monaco Editor            |
| **Backend**  | Convex                   |
| **Execution**| Piston API               |
| **AI**       | OpenAI (for error help)  |
| **Auth**     | Clerk                    |
| **State**    | Zustand                  |
| **UI**       | Tailwind CSS, shadcn/ui, Framer Motion |
| **Deployment** | Vercel                |

---

## 🚀 Getting Started

### Clone & Install

```bash
git clone https://github.com/your-username/codenest.git
cd codenest
npm install
Run Dev Environment
npx convex dev
npm run dev
🔐 .env Configuration

# Convex
CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
CLERK_JWT_ISSUER_DOMAIN=

# Piston API
NEXT_PUBLIC_PISTON_URL=https://emkc.org/api/v2/piston/execute

# AI
OPENAI_API_KEY= # For DoubtGPT-style error helper
```
## 🔮 Coming Soon

🔖 Save & share code snippets <br>
🤝 Real-time multi-user editing <br>
📱 PWA + offline support <br>
🧾 Export run results as files <br>
🧠 AI-powered code suggestions <br>

### 🤝 Contributing

We welcome contributions of all kinds! File issues, suggest features, or open a pull request. Let's build CodeNest together.

## 📄 License

<a href="https://github.com/AyushhhJaiswal/CodeNest/blob/main/LICENSE">MIT LICENSE</a>

## 👤 Author

<a href="https://github.com/AyushhhJaiswal">Ayush jaiswal</a>
