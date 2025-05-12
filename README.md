# Event Management Platform

**Note:** To access the admin panel, navigate to `/admin` in your browser after starting the app.

---

## Installation Guide

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd event-management-muganiev-devspace
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

- Copy `.env.example` to `.env.local` and fill in any required values (such as database URLs, API keys, etc).

### 4. Start the WebSocket Server

```bash
cd websocket
npm install
npm run dev
```

- This will start the real-time WebSocket server (default port: 3001).

### 5. Start the Next.js App

Open a new terminal in the project root and run:

```bash
npm run dev
```

- The app will be available at [http://localhost:3000](http://localhost:3000).

### 6. Accessing the App

- **Client view:** [http://localhost:3000/](http://localhost:3000/)
- **Admin panel:** [http://localhost:3000/admin](http://localhost:3000/admin)

### 7. (Optional) Database Setup

- If using Supabase or another database, ensure your environment variables are set and the database is running.

### 8. Troubleshooting

- If you see errors about WebSocket connection, make sure the WebSocket server is running and accessible.
- For real-time updates, both the Next.js app and the WebSocket server must be running.
