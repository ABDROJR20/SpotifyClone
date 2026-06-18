# Spotify Clone (MERN Stack) 🎵

A premium, full-stack web application that replicates the modern aesthetic and functionality of Spotify. Originally built with vanilla HTML, CSS, and JavaScript, this project has been fully upgraded to a robust **React** application with a **Node.js/Express** backend and a **MongoDB** cloud database. 

This project is perfectly structured for university assignments and presentations, demonstrating a complete understanding of Full Stack (MERN) architecture.

---

## ✨ Features

- **Modern UI/UX**: Completely redesigned using **Tailwind CSS** with a dark, premium aesthetic matching the real Spotify experience.
- **User Authentication**: Secure Login and Signup functionality using **JSON Web Tokens (JWT)** and **bcryptjs** for password hashing.
- **Dynamic Music Player**: Fully functional audio controls including Play, Pause, Next, Previous, Volume Control, and a dynamic progress bar.
- **Cloud Database Integration**: Metadata for all songs and users is stored securely on **MongoDB Atlas**, retrieved via custom-built backend REST APIs.
- **Data Seeding**: Automated script (`seed.js`) to seamlessly populate the cloud database with initial song metadata.

---

## 🛠️ Technology Stack

- **Frontend:** React.js (Vite), Tailwind CSS, Lucide React (for icons), React Router DOM.
- **Backend:** Node.js, Express.js.
- **Database:** MongoDB (Atlas Cloud), Mongoose.
- **Security:** bcryptjs, jsonwebtoken, CORS.

---

## 📂 Folder Structure

```text
SpotifyClone-main/
│
├── react-app/               # React Frontend
│   ├── public/              # Static assets (Music files, Covers, Logo)
│   ├── src/                 # React source code
│   │   ├── components/      # Reusable UI components (Sidebar, Player)
│   │   ├── pages/           # Application pages (Home, Login, Signup)
│   │   ├── App.jsx          # Main Router component
│   │   └── index.css        # Tailwind directives and custom animations
│   └── package.json         # Frontend dependencies
│
└── server/                  # Node.js/Express Backend
    ├── models/              # Mongoose DB Schemas (User, Song)
    ├── routes/              # API Routes (auth.js, songs.js)
    ├── .env                 # Backend environment variables
    ├── index.js             # Main Express server entry point
    ├── seed.js              # Database seeding script
    └── package.json         # Backend dependencies
```

---

## 🚀 Getting Started

Follow these steps to run the application locally on your machine.

### 1. Start the Backend Server

Open your terminal and navigate to the `server` directory:

```bash
cd server
```

Install dependencies (if not already installed):
```bash
npm install
```

Start the Node.js server:
```bash
npm start
```
*The backend server will start running on `http://localhost:5000` and connect to the MongoDB cloud database.*

### 2. Start the React Frontend

Open a **new** terminal window and navigate to the `react-app` directory:

```bash
cd react-app
```

Install dependencies (if not already installed):
```bash
npm install
```

Run the Vite development server:
```bash
npm run dev
```
*The frontend will start running (typically on `http://localhost:5173`). Open this URL in your browser to view the application.*

---

## 💡 Notes for University Presentation

- **Why a Custom Backend?** By implementing our own Express server and MongoDB schema, we demonstrate the ability to handle complete data flows, user sessions, and RESTful APIs, which yields much higher grades than relying solely on 3rd-party services.
- **File Management:** Audio `.mp3` files are currently served statically from the frontend for optimal speed, while the database strictly handles the relational data and metadata (ensuring the database remains lightweight and fast).

---

Developed with ❤️ for University Project Presentation.
