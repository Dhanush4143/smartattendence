# Anti-Gravity Research Frontend

This is the React frontend for the University Anti-Gravity Research Project.

## Technologies
- React 18
- Vite
- Tailwind CSS
- React Router
- Axios

## Setup & Run Locally
1. Run `npm install` to install dependencies.
2. The `.env` file should contain `VITE_API_URL=http://localhost:8080/api` (already created).
3. Run `npm run dev` to start the local development server.

## Deployment on Vercel
1. Push this repository to GitHub.
2. Go to [Vercel](https://vercel.com), connect your GitHub account, and click "Add New Project".
3. Select this repository.
4. Add the following Environment Variable in Vercel settings:
   - `VITE_API_URL`: `<your-render-backend-url>/api`
5. Click Deploy.
