## Movies Web Project

A React app to browse and search movies using the TMDB API, with authentication and user data powered by Firebase. Built with Vite for fast development and modern tooling.

### Tech Stack
- React 19, React DOM 19
- Vite 6 with `@vitejs/plugin-react`
- React Router DOM 7
- Firebase 12 (Auth, Firestore) + `react-firebase-hooks`
- ESLint 9 (React Hooks, React Refresh plugins)
- Styling with plain CSS

### Features
- Browse popular movies (TMDB API)
- Search movies by keyword
- User authentication (Google and email/password via Firebase Auth)
- User data storage (Firestore) and favorites page

### Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file in the project root and add the environment variables below.
3. Start the dev server:
   ```bash
   npm run dev
   ```

### Environment Variables (.env)
These are read via Vite `import.meta.env`.

TMDB API:
```
VITE_API_KEY=your_tmdb_api_key
```

Firebase config:
```
VITE_API_KEY_FIRBASE=your_firebase_api_key
VITE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_PROJECT_ID=your_project_id
VITE_STORAGE_BUCKET=your_project.appspot.com
VITE_MESSAGING_SENDER_ID=your_sender_id
VITE_APP_ID=your_app_id
VITE_MEASUREMENT_ID=your_measurement_id
```

Note: The variable name `VITE_API_KEY_FIRBASE` matches the current code in `src/firebase/firebase.js`. If this is a typo, align both code and env to `VITE_API_KEY_FIREBASE`.

### Available Scripts
- `npm run dev` – start Vite dev server
- `npm run build` – production build
- `npm run preview` – preview production build
- `npm run lint` – run ESLint

### Folder Structure
```
.
├── public/                 # Static assets
├── src/
│   ├── auth/               # Auth pages/components
│   ├── components/         # Reusable UI components
│   ├── contexts/           # React context providers
│   ├── css/                # Stylesheets
│   ├── firebase/           # Firebase initialization
│   ├── middleware/         # Route guards / middleware
│   ├── pages/              # App pages (home, favorites, profile)
│   ├── services/           # API clients (TMDB, user services)
│   ├── App.jsx             # App root
│   └── main.jsx            # Entry point
├── index.html
├── vite.config.js
└── package.json
```

### APIs and Services
- TMDB: requests performed in `src/services/api.js`
- Firebase: initialized in `src/firebase/firebase.js`

### Deployment
Any static host (Netlify, Vercel, GitHub Pages, Firebase Hosting) can serve the `dist/` folder after `npm run build`.

### License
This project is for personal/educational use. Add a license if distributing.
