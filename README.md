# Personal AI — Full Guide to Get Your Website Live

This guide is written for complete beginners. Follow it step by step — if any step is unclear, just ask me (Claude).

## What's in this project?
- `index.html` — the website's design and chat box (this is what visitors see)
- `api/chat.js` — the "backend" part that talks to the AI (this stays hidden)
- `README.md` — this file you're reading now

---

## Step 1: Get a free AI API key (Groq)

We're using **Groq** because its free tier is very generous and doesn't require a credit card.

1. Go to: https://console.groq.com
2. Sign up (you can use Google or email)
3. Click **"API Keys"** in the left-side menu
4. Click **"Create API Key"**, copy it, and save it somewhere safe (it won't be shown again)

---

## Step 2: Create a GitHub account and upload the files

1. Create an account at https://github.com (if you don't have one)
2. Create a "New repository" — name it something like `personal-ai`
3. Upload these three files/folders to that repository:
   - `index.html`
   - `api/chat.js` (make sure you create a folder named `api`, and put `chat.js` inside it)
   - `README.md`
   - You can do this directly on the GitHub website using "Add file > Upload files" — no terminal needed

---

## Step 3: Deploy on Vercel

1. Go to: https://vercel.com and sign up using your GitHub account
2. In the dashboard, click **"Add New... > Project"**
3. Select your `personal-ai` repository and click **"Import"**
4. Before deploying, open the **"Environment Variables"** section:
   - Name: `GROQ_API_KEY`
   - Value: (paste the API key from Step 1)
5. Click **"Deploy"** and wait 1-2 minutes

Done! Vercel will give you a live link like `https://personal-ai.vercel.app` — that's your live website, accessible to anyone.

---

## Step 4: Test it

Open the website, type a question in the chat box, for example:
- "Tell me about Prophet Adam A.S."
- "Explain Newton's three laws simply"
- "Who is the current Prime Minister of Pakistan?"

If you get an error saying "GROQ_API_KEY is not set", go back to Vercel dashboard > Settings > Environment Variables and check it.

---

## What you can do next (optional)

- Change the website's design (colors, fonts) in the `<style>` section of `index.html`
- Add new "quick topic" buttons in the `.topics` section of `index.html`
- If Groq's free model ever changes, check https://console.groq.com/docs/models for the current model name and update the `model:` line in `api/chat.js`

## Important note
This AI tool tries hard to be accurate, but **it can make mistakes** — especially on Islamic matters and current politics. Please verify important information yourself from a reliable source.
