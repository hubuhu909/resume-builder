# ResumeUp 🎓
### AI-Powered Resume Builder for High School Students

A full-stack Next.js TypeScript application that helps high school students build professional, AI-enhanced resumes in minutes.

---

## ✨ Features

- **5-Screen Flow** — Welcome → Style → Job Type → Fill Info → AI Build → Download
- **4 Resume Styles** — Modern, Classic, Creative, Minimal
- **AI Resume Generation** — Claude AI writes compelling, professional resume copy
- **AI Cover Letter** — Optional AI-generated cover letter
- **Live AI Chatbox** — Ask questions and get resume tips anytime
- **Edit & Customize** — Tweak the AI-generated resume before downloading
- **Download Options** — HTML download + Print-to-PDF

---

## 🚀 Deploy to Vercel (Step-by-Step)

### Step 1: Get Your Anthropic API Key

1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Sign in or create an account
3. Go to **API Keys** → **Create Key**
4. Copy the key (starts with `sk-ant-...`)

---

### Step 2: Push to GitHub

1. **Create a new GitHub repository:**
   - Go to [github.com/new](https://github.com/new)
   - Name it `resume-builder` (or anything you like)
   - Set to **Public** or **Private**
   - Do NOT initialize with README (we already have one)
   - Click **Create repository**

2. **Push this project:**
   Open your terminal in this project folder and run:

   ```bash
   git init
   git add .
   git commit -m "Initial commit: ResumeUp AI Resume Builder"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/resume-builder.git
   git push -u origin main
   ```
   
   > Replace `YOUR_USERNAME` with your GitHub username.

---

### Step 3: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in (use your GitHub account)
2. Click **"Add New Project"**
3. Click **"Import"** next to your `resume-builder` repository
4. Vercel will auto-detect it as a Next.js project ✅
5. **Before clicking Deploy**, click **"Environment Variables"** and add:
   - **Key:** `ANTHROPIC_API_KEY`
   - **Value:** `sk-ant-your-actual-api-key-here`
6. Click **"Deploy"** 🚀

Your site will be live at `https://resume-builder-yourname.vercel.app` in ~2 minutes!

---

### Step 4: Set Up Automatic Deploys (Optional but Recommended)

Vercel automatically redeploys whenever you push to GitHub. To update your site:

```bash
git add .
git commit -m "Your update message"
git push
```

That's it — Vercel handles the rest!

---

## 💻 Local Development

```bash
# 1. Install dependencies
npm install

# 2. Create environment file
cp .env.local.example .env.local

# 3. Add your Anthropic API key to .env.local
# Edit the file: ANTHROPIC_API_KEY=sk-ant-your-key-here

# 4. Start development server
npm run dev

# Open http://localhost:3000
```

---

## 🗂️ Project Structure

```
src/
├── app/
│   ├── api/ai/route.ts     # API endpoint for AI features
│   ├── globals.css         # Global styles & design system
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Main page / screen orchestrator
├── components/
│   ├── Screen1Welcome.tsx  # Landing page
│   ├── Screen2Style.tsx    # Resume style selector
│   ├── Screen3JobType.tsx  # Job category dropdown
│   ├── Screen4Info.tsx     # Information entry form
│   ├── Screen5AIBuild.tsx  # AI generation & preview
│   ├── Screen6Download.tsx # Download screen
│   ├── ChatBox.tsx         # Floating AI chat assistant
│   └── ProgressBar.tsx     # Top progress indicator
├── types/
│   └── resume.ts           # TypeScript types & defaults
```

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + inline styles
- **AI:** Anthropic Claude API (claude-sonnet-4)
- **Deployment:** Vercel
- **Fonts:** Playfair Display + DM Sans (Google Fonts)

---

## 📝 Customization

### Adding More Job Categories
Edit `src/types/resume.ts` — add to the `JobCategory` type and `jobCategoryLabels` object.

### Changing AI Model
Edit `src/app/api/ai/route.ts` — change the `model` field.

### Updating Styles
Edit `src/app/globals.css` — CSS variables at the top control the entire color system.

---

## 🔑 Environment Variables

| Variable | Description |
|---|---|
| `ANTHROPIC_API_KEY` | Your Anthropic API key (required) |

---

Built with ❤️ for high school students everywhere.
