# GroceryStore Product Management

A full-stack product management system for a retail and wholesale grocery store.

## Tech Stack
- **Frontend**: React (Vite), TypeScript, Tailwind CSS, GSAP (Animations), Lucide React (Icons).
- **Backend**: Node.js, Express, Mongoose, TypeScript.

## Folder Structure
- `/frontend` - Contains the React application with beautiful UI and GSAP animations.
- `/backend` - Contains the Express server with MongoDB setup.

## How to Run

### 1. Backend
Open a terminal and navigate to the backend directory:
```bash
cd backend
npm install
npm run start
# Note: You need to set up your MongoDB URI in a .env file (e.g. MONGO_URI=mongodb://localhost:27017/grocery_db)
```
*(You can compile it using `npx tsc` and run the output, or add a dev script like `ts-node-dev` if you plan to develop further)*

### 2. Frontend
Open another terminal and navigate to the frontend directory:
```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:5173` to see the animated UI.

## Adding Database (MongoDB)
The backend is already pre-configured to use Mongoose. You can simply add your MongoDB connection string to a `.env` file in the `backend/` directory:
```
MONGO_URI=your_mongodb_connection_string_here
PORT=5000
```

