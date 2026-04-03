@echo off
echo === Initializing antigravity-frontend Git Repo ===
git init
git add .
git commit -m "feat: initial commit - Anti-Gravity frontend (React + Vite + Tailwind)"
echo.
echo ---------------------------------------------------
echo NEXT STEPS:
echo 1. Create a GitHub repo called "antigravity-frontend"
echo 2. Run:
echo    git remote add origin https://github.com/YOUR_USERNAME/antigravity-frontend.git
echo    git push -u origin main
echo 3. Go to vercel.com and import the repo
echo 4. Set VITE_API_URL to your Render backend URL
echo ---------------------------------------------------
pause
