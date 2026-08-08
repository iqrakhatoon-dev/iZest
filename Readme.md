# iZest 🍔

A TikTok/Instagram-style food discovery platform where users scroll through short food videos, like, save, and visit restaurant stores — all in a reel-style feed.

**Live Demo:** [izest.vercel.app](https://izest.vercel.app)  
**Backend:** [izest-backend.onrender.com](https://izest-backend.onrender.com)

---

## Features

**For Users**
- 📱 TikTok-style vertical reel feed with scroll snapping
- ❤️ Like / unlike food items (persists after refresh)
- 🔖 Save / unsave food items
- 🏪 Visit food partner store profiles
- 🌙 Dark / light mode toggle (persists via localStorage)
- 📱 Fully responsive — mobile bottom nav, desktop sidebar

**For Food Partners**
- 🍽️ Register restaurant and create partner account
- 🎬 Upload dish videos with name and description
- 📊 Partner profile page with menu grid

---

## Tech Stack

**Frontend**
- React 18 + Vite
- Tailwind CSS v4
- GSAP (animations)
- Axios
- React Router DOM
- Lucide React (icons)

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication (httpOnly cookies)
- Multer (file upload)
- ImageKit (video CDN)
- bcrypt (password hashing)
- CORS + Cookie Parser

---

## Project Structure

```
iZest/
├── Frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── general/
│   │   │   │   └── Home.jsx
│   │   │   ├── user/
│   │   │   │   ├── UserLogin.jsx
│   │   │   │   └── UserRegister.jsx
│   │   │   ├── food-partner/
│   │   │   │   ├── FoodPartnerLogin.jsx
│   │   │   │   ├── FoorPartnerRegister.jsx
│   │   │   │   ├── FoodPartnerProfile.jsx
│   │   │   │   └── CreateFood.jsx
│   │   │   └── SavedVideos.jsx
│   │   ├── components/
│   │   │   ├── AnimatedWrapper.jsx
│   │   │   └── ThemeToggle.jsx
│   │   ├── hooks/
│   │   │   └── useButtonFx.js
│   │   └── routes/
│   │       └── AppRoutes.jsx
│   └── index.css
│
└── Backend/
    └── src/
        ├── controller/
        │   ├── auth.controller.js
        │   ├── foodItem.controller.js
        │   └── foodPartner.controller.js
        ├── models/
        │   ├── user.model.js
        │   ├── foodPartner.model.js
        │   ├── foodItem.model.js
        │   ├── likes.model.js
        │   └── save.model.js
        ├── routes/
        │   ├── auth.routes.js
        │   ├── foodItem.routes.js
        │   └── food-partner.routes.js
        ├── middleware/
        │   └── auth.middleware.js
        ├── services/
        │   └── storage.service.js
        ├── app.js
        └── server.js
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- ImageKit account

### Backend Setup

```bash
cd Backend
npm install
```

Create `.env` file:
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

### Frontend Setup

```bash
cd Frontend
npm install
```

Create `.env` file:
```env
VITE_API_URL=http://localhost:3000
```

```bash
npm run dev
```

---

## API Routes

### Auth
| Method | Route | Description | Access |
|--------|-------|-------------|--------|
| POST | `/api/auth/user/register` | User registration | Public |
| POST | `/api/auth/user/login` | User login | Public |
| GET | `/api/auth/user/logout` | User logout | Private |
| POST | `/api/auth/food-partner/register` | Partner registration | Public |
| POST | `/api/auth/food-partner/login` | Partner login | Public |
| GET | `/api/auth/food-partner/logout` | Partner logout | Private |

### Food Items
| Method | Route | Description | Access |
|--------|-------|-------------|--------|
| GET | `/api/food-items` | Get all food items (feed) | User/Partner |
| POST | `/api/food-items` | Create food item (video upload) | Partner only |
| POST | `/api/food-items/like` | Like / unlike a food item | User/Partner |
| GET | `/api/food-items/liked` | Get all liked items | User |
| POST | `/api/food-items/save` | Save / unsave a food item | User/Partner |
| GET | `/api/food-items/saved` | Get all saved items | User/Partner |

### Food Partner
| Method | Route | Description | Access |
|--------|-------|-------------|--------|
| GET | `/api/food-partner/profile/:id` | Get partner profile | User |
| GET | `/api/food-partner/profile/video/:id` | Get partner's food items | User |

---

## Deployment

**Frontend → Vercel**
```bash
cd Frontend
npm run build
```
Add environment variable `VITE_API_URL` on Vercel dashboard.

**Backend → Render**
- Root Directory: `Backend`
- Build Command: `npm install`
- Start Command: `node server.js`
- Add all `.env` variables on Render dashboard

---

## Screenshots

<!-- Add screenshots here after deployment -->
| Feed | Partner Profile | Saved |
|------|----------------|-------|
| ![Feed]() | ![Profile]() | ![Saved]() |

---

## Author

**Iqra Khatoon**  
Full Stack Developer (MERN)  
[GitHub](https://github.com/iqrakhatoon-dev) • [LinkedIn](https://linkedin.com/in/iqrakhatoon-dev) • [Instagram](https://instagram.com/technotowniqra)

---

## License

MIT License — feel free to use this project for learning purposes.