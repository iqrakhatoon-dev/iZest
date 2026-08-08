# iZest 🍔

> A TikTok/Instagram-style food discovery platform where users scroll through short food videos, like, save, and visit restaurant store profiles — all in a reel-style feed.

**🌐 Live Demo:** [izest.vercel.app](https://izest.vercel.app) &nbsp;|&nbsp; **🚀 Backend:** [izest-backend.onrender.com](https://izest-backend.onrender.com)

---

## Screenshots

| Feed | Partner Profile | Saved |
|------|----------------|-------|
| ![Feed](https://github.com/user-attachments/assets/8b7827e3-d002-4738-b4b8-16a555c48efa) | ![Profile](https://github.com/user-attachments/assets/224d1ba1-bef4-4f07-865f-a0267cee2767) | ![Saved](https://github.com/user-attachments/assets/0178a2bd-bc67-4ae8-8234-7560b5a110fc) |

---

## Features

### 👤 For Users
- 📱 TikTok-style vertical reel feed with scroll snapping
- ❤️ Like / unlike food items (persists after refresh)
- 🔖 Save / unsave food items
- 🏪 Visit food partner store profiles
- 🌙 Dark / light mode toggle (persists via localStorage)
- 📲 Fully responsive — mobile bottom nav, desktop sidebar

### 🍽️ For Food Partners
- 🏪 Register restaurant and create a partner account
- 🎬 Upload dish videos with name and description
- 📊 Partner profile page with menu grid

---

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend** | React 18 + Vite, Tailwind CSS v4, GSAP, Axios, React Router DOM, Lucide React |
| **Backend** | Node.js + Express, MongoDB + Mongoose, JWT (httpOnly cookies), Multer, ImageKit, bcrypt |

---

## Project Structure

```
iZest/
├── Frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── general/         # Home.jsx
│   │   │   ├── user/            # UserLogin.jsx, UserRegister.jsx
│   │   │   ├── food-partner/    # Login, Register, Profile, CreateFood
│   │   │   └── SavedVideos.jsx
│   │   ├── components/          # AnimatedWrapper, ThemeToggle
│   │   ├── hooks/               # useButtonFx.js
│   │   └── routes/              # AppRoutes.jsx
│   └── index.css
│
└── Backend/
    └── src/
        ├── controller/          # auth, foodItem, foodPartner
        ├── models/              # user, foodPartner, foodItem, likes, save
        ├── routes/              # auth, foodItem, food-partner
        ├── middleware/          # auth.middleware.js
        ├── services/            # storage.service.js
        ├── app.js
        └── server.js
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- ImageKit account

### 1. Clone the repo

```bash
git clone https://github.com/iqrakhatoon-dev/iZest.git
cd iZest
```

### 2. Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file:

```env
PORT=3000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
FRONTEND_URL=http://localhost:5173
```

```bash
node server.js
```

### 3. Frontend Setup

```bash
cd Frontend
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:3000
```

```bash
npm run dev
```

---

## API Reference

### Auth Routes

| Method | Route | Description | Access |
|--------|-------|-------------|--------|
| POST | `/api/auth/user/register` | User registration | Public |
| POST | `/api/auth/user/login` | User login | Public |
| GET | `/api/auth/user/logout` | User logout | Private |
| POST | `/api/auth/food-partner/register` | Partner registration | Public |
| POST | `/api/auth/food-partner/login` | Partner login | Public |
| GET | `/api/auth/food-partner/logout` | Partner logout | Private |

### Food Item Routes

| Method | Route | Description | Access |
|--------|-------|-------------|--------|
| GET | `/api/food-items` | Get all food items (feed) | User/Partner |
| POST | `/api/food-items` | Create food item with video | Partner only |
| POST | `/api/food-items/like` | Like / unlike a food item | User/Partner |
| GET | `/api/food-items/liked` | Get all liked items | User |
| POST | `/api/food-items/save` | Save / unsave a food item | User/Partner |
| GET | `/api/food-items/saved` | Get all saved items | User/Partner |

### Food Partner Routes

| Method | Route | Description | Access |
|--------|-------|-------------|--------|
| GET | `/api/food-partner/profile/:id` | Get partner profile | User |
| GET | `/api/food-partner/profile/video/:id` | Get partner's food items | User |

---

## Deployment

### Frontend → Vercel

```bash
cd Frontend
npm run build
```

Set environment variable on Vercel dashboard:
```
VITE_API_URL = https://your-backend-url.onrender.com
```

### Backend → Render

| Setting | Value |
|---------|-------|
| Root Directory | `Backend` |
| Build Command | `npm install` |
| Start Command | `node server.js` |

Add all `.env` variables in the Render dashboard.

---

## Author

**Iqra Khatoon** — Full Stack Developer (MERN)

[![GitHub](https://img.shields.io/badge/GitHub-iqrakhatoon--dev-181717?style=flat&logo=github)](https://github.com/iqrakhatoon-dev)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-iqrakhatoon--dev-0A66C2?style=flat&logo=linkedin)](https://linkedin.com/in/iqrakhatoon-dev)
[![Instagram](https://img.shields.io/badge/Instagram-technotowniqra-E4405F?style=flat&logo=instagram)](https://instagram.com/technotowniqra)

---

## License

This project is licensed under the [MIT License](LICENSE) — free to use for learning purposes.