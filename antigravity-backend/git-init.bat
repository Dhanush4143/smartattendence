@echo off
echo === Initializing antigravity-backend Git Repo ===
git init
git add .
git commit -m "feat: initial commit - Anti-Gravity backend (Spring Boot + JWT + H2/MySQL)"
echo.
echo ---------------------------------------------------
echo NEXT STEPS:
echo 1. Create a GitHub repo called "antigravity-backend"
echo 2. Run:
echo    git remote add origin https://github.com/YOUR_USERNAME/antigravity-backend.git
echo    git push -u origin main
echo 3. Go to render.com, create a new Web Service, import the repo
echo 4. Set the following environment variables on Render:
echo    APP_ENV=prod
echo    SPRING_DATASOURCE_URL=jdbc:mysql://...
echo    SPRING_DATASOURCE_USERNAME=...
echo    SPRING_DATASOURCE_PASSWORD=...
echo    JWT_SECRET=...
echo ---------------------------------------------------
pause
